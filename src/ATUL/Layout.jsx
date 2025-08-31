import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../utils";
import { ShoppingCart, Settings } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <style>{`
        .voice-glow {
          animation: voicePulse 2s infinite;
        }

        @keyframes voicePulse {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
        }
      `}</style>

      {/* Navigation Header */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to={createPageUrl("ShoppingList")} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">VoiceCart</h1>
                <p className="text-xs text-slate-500 -mt-1">Smart Shopping Assistant</p>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to={createPageUrl("ShoppingList")}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  location.pathname === createPageUrl("ShoppingList")
                    ? "bg-green-100 text-green-700"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
              </Link>
              <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-600 transition-all duration-200">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
