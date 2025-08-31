import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2, MessageSquare } from "lucide-react";
import Button from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
// Add onRemoveItem prop
export default function VoiceInterface({ onAddItem, onRemoveItem, onVoiceModeChange, isActive }) {
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [recognitionSupported, setRecognitionSupported] = useState(false);

  const categorizeItem = (itemName) => {
    const categories = {
      produce: ["apple", "banana", "orange", "lettuce", "tomato", "carrot", "onion", "potato", "spinach", "broccoli"],
      dairy: ["milk", "cheese", "yogurt", "butter", "cream", "eggs"],
      meat: ["chicken", "beef", "pork", "fish", "turkey", "salmon"],
      bakery: ["bread", "bagel", "croissant", "muffin", "cake"],
      pantry: ["rice", "pasta", "flour", "sugar", "oil", "vinegar", "salt", "pepper"],
      snacks: ["chips", "cookies", "crackers", "nuts", "candy"],
      beverages: ["water", "juice", "soda", "coffee", "tea", "wine", "beer"],
      frozen: ["ice cream", "frozen pizza", "frozen vegetables"],
      household: ["toilet paper", "paper towels", "detergent", "soap", "shampoo"],
      personal_care: ["toothpaste", "toothbrush", "deodorant", "lotion"]
    };

    for (const [category, items] of Object.entries(categories)) {
      if (items.some(item => itemName.toLowerCase().includes(item))) {
        return category;
      }
    }
    return "other";
  };

  const parseVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    const isRemove = lowerCommand.startsWith("remove ") || lowerCommand.startsWith("delete ") || lowerCommand.startsWith("discard ");

    // Extract quantity (only for add)
    const quantityMatch = lowerCommand.match(/(\d+)\s*(bottles?|boxes?|pounds?|lbs?|ounces?|oz|gallons?|liters?|items?)?/);
    const quantity = quantityMatch ? parseInt(quantityMatch[1]) : 1;
    const unit = quantityMatch ? (quantityMatch[2] || "items") : "items";

    // Extract item name
    let itemName = lowerCommand
      .replace(/^(add|buy|get|i need|i want to buy|put|remove|delete|discard)\s*/i, "")
      .replace(/\s*(to my list|to the list|on my list).*$/i, "")
      .replace(/^\d+\s*(bottles?|boxes?|pounds?|lbs?|ounces?|oz|gallons?|liters?|items?)?\s*/i, "")
      .trim();

    // Handle common phrases
    if (itemName.includes("organic")) {
      itemName = itemName.replace("organic", "").trim();
    }

    return {
      name: itemName,
      quantity,
      unit: unit === "items" ? "items" : unit,
      category: categorizeItem(itemName),
      priority: lowerCommand.includes("urgent") || lowerCommand.includes("asap") ? "urgent" : "medium",
      isRemove
    };
  };

  React.useEffect(() => {
    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setRecognitionSupported(!!SpeechRecognition);
  }, []);

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);
    setIsProcessing(false);
    setVoiceText("");
    onVoiceModeChange(true);

    recognition.onresult = (event) => {
      setIsListening(false);
      setIsProcessing(true);
      const transcript = event.results[0][0].transcript;
      setVoiceText(transcript);
      const parsedItem = parseVoiceCommand(transcript);
      if (parsedItem.isRemove && onRemoveItem) {
        onRemoveItem(parsedItem.name);
      } else {
        onAddItem(parsedItem);
      }
      setIsProcessing(false);
      setTimeout(() => {
        setVoiceText("");
        onVoiceModeChange(false);
      }, 3000);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setIsProcessing(false);
      setVoiceText("");
      onVoiceModeChange(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setIsProcessing(false);
    };

    recognition.start();
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim()) {
      setVoiceText(textInput);
      const parsedItem = parseVoiceCommand(textInput);
      if (parsedItem.isRemove && onRemoveItem) {
        onRemoveItem(parsedItem.name);
      } else {
        onAddItem(parsedItem);
      }
      setTextInput("");
      setShowTextInput(false);

      setTimeout(() => {
        setVoiceText("");
      }, 3000);
    }
  };

  return (
    <div className="mb-8">
      <Card className="bg-gradient-to-br from-white to-green-50 border-green-200 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center">
            <motion.div
              className="relative inline-block mb-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={startVoiceRecognition}
                disabled={isListening || isProcessing || !recognitionSupported}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-xl shadow-xl transition-all duration-300 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 voice-glow"
                    : recognitionSupported
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-gray-400 cursor-not-allowed"
                }`}
                style={{ padding: 0 }}
              >
                <span className="flex items-center justify-center w-full h-full">
                  {isProcessing ? (
                    <Loader2 className="w-8 h-8" style={{ margin: "auto" }} />
                  ) : isListening ? (
                    <MicOff className="w-8 h-8" style={{ margin: "auto" }} />
                  ) : (
                    <Mic className="w-8 h-8" style={{ margin: "auto" }} />
                  )}
                </span>
              </Button>

              {isListening && (
                <div className="absolute -inset-4 border-4 border-red-300 rounded-full animate-ping" />
              )}
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-800">
                {!recognitionSupported
                  ? "Voice recognition not supported in this browser"
                  : isListening
                    ? "Listening..."
                    : isProcessing
                      ? "Processing..."
                      : "Tap to add items with your voice"}
              </h2>

              <p className="text-slate-600 max-w-md mx-auto">
                {!recognitionSupported
                  ? "Try Chrome or Edge for voice input."
                  : isListening
                    ? "Speak clearly and say what you need"
                    : isProcessing
                      ? "Understanding your request..."
                      : "Say things like 'Add milk' or 'I need 3 apples'"}
              </p>

              <Button
                variant="outline"
                onClick={() => setShowTextInput(!showTextInput)}
                className="mt-4 border-green-300 hover:bg-green-50"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Or type instead
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {voiceText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-green-100 rounded-xl border border-green-200"
              >
                <p className="text-green-800 font-medium text-center">
                  "{voiceText}"
                </p>
              </motion.div>
            )}

            {showTextInput && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6"
              >
                <form onSubmit={handleTextSubmit} className="flex gap-2">
                  <Input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Type your request (e.g., 'Add 2 bottles of milk')"
                    className="flex-1 border-green-300 focus:border-green-500"
                  />
                  <Button type="submit" className="bg-green-500 hover:bg-green-600">
                    Add
                  </Button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}
