// Simple helper to turn a page name into a URL slug
// Example: "Shopping List" -> "/shopping-list"
export const createPageUrl = (name) =>
  "/" + String(name || "").toLowerCase().replace(/\s+/g, "-")
