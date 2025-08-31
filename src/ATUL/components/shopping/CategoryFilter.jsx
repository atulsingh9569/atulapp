import React from "react";
import  Badge  from "../../../components/ui/badge";

const categoryDisplayNames = {
  all: "All Items",
  produce: "🥕 Produce",
  dairy: "🥛 Dairy", 
  meat: "🥩 Meat",
  bakery: "🍞 Bakery",
  pantry: "🍯 Pantry",
  snacks: "🍿 Snacks",
  beverages: "🧃 Drinks",
  frozen: "🧊 Frozen",
  household: "🧽 Household",
  personal_care: "🧴 Personal",
  other: "📦 Other"
};

export default function CategoryFilter({ activeCategory, onCategoryChange, items }) {
  const categoryCounts = items.reduce((counts, item) => {
    counts[item.category] = (counts[item.category] || 0) + 1;
    return counts;
  }, {});

  const availableCategories = ["all", ...Object.keys(categoryCounts).sort()];

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200">
      <h3 className="font-medium text-slate-800 mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {availableCategories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={`cursor-pointer transition-all duration-200 ${
              activeCategory === category
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "hover:bg-green-50 hover:border-green-300"
            }`}
            onClick={() => onCategoryChange(category)}
          >
            <span className="text-xs">
              {categoryDisplayNames[category] || category}
              {category !== "all" && categoryCounts[category] && (
                <span className="ml-1 font-normal">
                  ({categoryCounts[category]})
                </span>
              )}
              {category === "all" && (
                <span className="ml-1 font-normal">
                  ({items.length})
                </span>
              )}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
