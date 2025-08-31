import React, { useState, useEffect } from "react";
import  ShoppingItem  from "../entities/ShoppingItem";

import { motion, AnimatePresence } from "framer-motion";

import VoiceInterface from "../components/shopping/VoiceInterface";
import SmartSuggestions from "../components/shopping/SmartSuggestions";
import ShoppingItemCard from "../components/shopping/ShoppingItemCard";
import CategoryFilter from "../components/shopping/CategoryFilter";
import SearchInterface from "../components/shopping/SearchInterface";
import StatsOverview from "../components/shopping/StatsOverview";

export default function ShoppingListPage() {
  // Remove item by name (case-insensitive)
  const removeItemByName = async (name) => {
    const item = items.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (item) {
      await deleteItem(item.id);
    }
  };
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);

  useEffect(() => {
    loadShoppingItems();
  }, []);

  const loadShoppingItems = async () => {
    setLoading(true);
    try {
      const fetchedItems = await ShoppingItem.list("-created_date");
      setItems(fetchedItems);
    } catch (error) {
      console.error("Error loading shopping items:", error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (itemData) => {
    try {
      await ShoppingItem.create(itemData);
      loadShoppingItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (itemId, updates) => {
    try {
      await ShoppingItem.update(itemId, updates);
      loadShoppingItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (itemId) => {
    try {
      await ShoppingItem.delete(itemId);
      loadShoppingItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = items.filter(item => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const searchMatch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const completedItems = items.filter(item => item.is_completed);
  const pendingItems = filteredItems.filter(item => !item.is_completed);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Voice Interface */}
      <VoiceInterface 
        onAddItem={addItem}
        onRemoveItem={removeItemByName}
        onVoiceModeChange={setIsVoiceMode}
        isActive={isVoiceMode}
      />

      {/* Stats Overview */}
      <StatsOverview 
        totalItems={items.length}
        completedItems={completedItems.length}
        categories={[...new Set(items.map(item => item.category))].length}
      />

      {/* Search and Filters */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <SearchInterface 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryFilter 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          items={items}
        />
      </div>

      {/* Smart Suggestions */}
      <SmartSuggestions 
        existingItems={items}
        onAddSuggestion={addItem}
      />

      {/* Shopping List */}
      <div className="space-y-6">
        {/* Pending Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Shopping List
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm text-slate-600">
                  {pendingItems.length} items
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : pendingItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛒</span>
                </div>
                <h3 className="text-lg font-medium text-slate-700 mb-2">
                  Your shopping list is empty
                </h3>
                <p className="text-slate-500">
                  Use voice commands or add items manually to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {pendingItems.map((item) => (
                    <ShoppingItemCard
                      key={item.id}
                      item={item}
                      onUpdate={(updates) => updateItem(item.id, updates)}
                      onDelete={() => deleteItem(item.id)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* Completed Items */}
        {completedItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-700">
                Completed ({completedItems.length})
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {completedItems.map((item) => (
                  <ShoppingItemCard
                    key={item.id}
                    item={item}
                    onUpdate={(updates) => updateItem(item.id, updates)}
                    onDelete={() => deleteItem(item.id)}
                    completed
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
