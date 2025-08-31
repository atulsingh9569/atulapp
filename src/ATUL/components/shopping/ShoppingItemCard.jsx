import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, Edit2, Package, Star, AlertCircle } from "lucide-react";
import Button from "../../../components/ui/button";
import Badge from "../../../components/ui/badge";
import Input from "../../../components/ui/input";

const categoryIcons = {
  produce: "🥕",
  dairy: "🥛",
  meat: "🥩",
  bakery: "🍞",
  pantry: "🍯",
  snacks: "🍿",
  beverages: "🧃",
  frozen: "🧊",
  household: "🧽",
  personal_care: "🧴",
  other: "📦",
};

const priorityColors = {
  low: "bg-slate-100 text-slate-700 border-slate-200",
  medium: "bg-blue-100 text-blue-800 border-blue-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  urgent: "bg-red-100 text-red-800 border-red-200",
};

export default function ShoppingItemCard({
  item,
  onUpdate,
  onDelete,
  completed = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(item.name);
  const [editedQuantity, setEditedQuantity] = useState(item.quantity);

  const handleToggleComplete = () => {
    onUpdate({ is_completed: !item.is_completed });
  };

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      onUpdate({
        name: editedName.trim(),
        quantity: editedQuantity,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(item.name);
    setEditedQuantity(item.quantity);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md ${
        completed
          ? "border-slate-200 bg-slate-50"
          : "border-green-100 hover:border-green-200"
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Completion Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleComplete}
            className={`mt-1 w-6 h-6 p-0 rounded-full border-2 transition-all duration-200 ${
              item.is_completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-slate-300 hover:border-green-400"
            }`}
          >
            {item.is_completed && <Check className="w-3 h-3" />}
          </Button>

          {/* Item Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="flex-1 h-8"
                    placeholder="Item name"
                  />
                  <Input
                    type="number"
                    value={editedQuantity}
                    onChange={(e) =>
                      setEditedQuantity(parseInt(e.target.value) || 1)
                    }
                    className="w-20 h-8"
                    min="1"
                  />
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    className="h-6 px-2 text-xs"
                  >
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                    className="h-6 px-2 text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{categoryIcons[item.category]}</span>
                  <h3
                    className={`font-medium ${
                      completed
                        ? "line-through text-slate-500"
                        : "text-slate-800"
                    }`}
                  >
                    {item.name}
                  </h3>
                  {item.suggested_by_ai && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-200 text-slate-600"
                  >
                    {item.quantity} {item.unit}
                  </Badge>

                  <Badge
                    variant="outline"
                    className={`text-xs ${priorityColors[item.priority]}`}
                  >
                    {item.priority}
                  </Badge>

                  {item.brand && (
                    <Badge
                      variant="outline"
                      className="text-xs border-purple-200 text-purple-700"
                    >
                      {item.brand}
                    </Badge>
                  )}

                  {item.price_range && item.price_range !== "mid_range" && (
                    <Badge
                      variant="outline"
                      className="text-xs border-emerald-200 text-emerald-700"
                    >
                      {item.price_range.replace("_", " ")}
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(item.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
