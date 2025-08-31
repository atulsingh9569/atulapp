import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Plus, Clock, TrendingUp } from "lucide-react";
import  Button  from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

export default function SmartSuggestions({ existingItems, onAddSuggestion }) {
  const [addedSuggestions, setAddedSuggestions] = useState(new Set());

  const generateSuggestions = () => {
    const currentMonth = new Date().getMonth();
    const seasons = {
      spring: [2, 3, 4], // Mar, Apr, May
      summer: [5, 6, 7], // Jun, Jul, Aug
      fall: [8, 9, 10],   // Sep, Oct, Nov
      winter: [11, 0, 1]  // Dec, Jan, Feb
    };

    const currentSeason = Object.keys(seasons).find(season => 
      seasons[season].includes(currentMonth)
    );

    const seasonalItems = {
      spring: [
        { name: "asparagus", category: "produce", reason: "In season" },
        { name: "strawberries", category: "produce", reason: "Peak season" },
        { name: "spring onions", category: "produce", reason: "Fresh spring produce" }
      ],
      summer: [
        { name: "tomatoes", category: "produce", reason: "Summer fresh" },
        { name: "watermelon", category: "produce", reason: "Perfect for hot weather" },
        { name: "corn", category: "produce", reason: "Summer harvest" }
      ],
      fall: [
        { name: "pumpkin", category: "produce", reason: "Fall harvest" },
        { name: "apples", category: "produce", reason: "Apple season" },
        { name: "sweet potatoes", category: "produce", reason: "Autumn favorites" }
      ],
      winter: [
        { name: "oranges", category: "produce", reason: "Vitamin C boost" },
        { name: "hot chocolate", category: "beverages", reason: "Warm winter drink" },
        { name: "soup", category: "pantry", reason: "Perfect for cold weather" }
      ]
    };

    const frequentItems = [
      { name: "milk", category: "dairy", reason: "You buy this weekly" },
      { name: "bread", category: "bakery", reason: "Running low usually" },
      { name: "eggs", category: "dairy", reason: "Kitchen staple" },
      { name: "bananas", category: "produce", reason: "Healthy snack" }
    ];

    const existingItemNames = existingItems.map(item => item.name.toLowerCase());
    
    const suggestions = [
      ...seasonalItems[currentSeason] || [],
      ...frequentItems
    ].filter(suggestion => 
      !existingItemNames.includes(suggestion.name.toLowerCase()) &&
      !addedSuggestions.has(suggestion.name)
    );

    return suggestions.slice(0, 6);
  };

  const handleAddSuggestion = async (suggestion) => {
    const itemData = {
      name: suggestion.name,
      category: suggestion.category,
      suggested_by_ai: true,
      priority: "low"
    };
    
    await onAddSuggestion(itemData);
    setAddedSuggestions(prev => new Set([...prev, suggestion.name]));
  };

  const suggestions = generateSuggestions();

  if (suggestions.length === 0) return null;

  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-slate-800">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            Smart Suggestions
          </CardTitle>
          <p className="text-slate-600 text-sm">
            Based on your shopping history and seasonal trends
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-slate-800 capitalize">
                      {suggestion.name}
                    </h3>
                    <Badge variant="outline" className="text-xs mt-1 border-blue-200 text-blue-700">
                      {suggestion.category}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleAddSuggestion(suggestion)}
                    className="bg-blue-500 hover:bg-blue-600 h-8 w-8 p-0 rounded-full flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  {suggestion.reason.includes("season") ? (
                    <Clock className="w-3 h-3 text-green-500" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-blue-500" />
                  )}
                  <span className="text-xs text-slate-500">
                    {suggestion.reason}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
