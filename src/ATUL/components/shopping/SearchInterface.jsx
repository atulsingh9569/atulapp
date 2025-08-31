import React from "react";
import { Search } from "lucide-react";
import  Input  from "../../../components/ui/input";

export default function SearchInterface({ searchQuery, onSearchChange }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200">
      <h3 className="font-medium text-slate-800 mb-3">Search Items</h3>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or brand..."
          className="pl-10 border-slate-300 focus:border-green-400"
        />
      </div>
    </div>
  );
}
