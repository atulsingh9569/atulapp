// src/ATUL/entities/ShoppingItem.js

// Simple localStorage-backed model for demo/dev usage.
// Provides: list, create, update, delete

const STORAGE_KEY = "shopping_items_v1";

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function uid() {
  // reasonably unique id for demo purposes
  return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

// Normalize an item so UI always has the fields it expects
function normalize(item) {
  const now = new Date().toISOString();
  return {
    id: item.id ?? uid(),
    name: item.name ?? "Item",
    quantity: Number(item.quantity ?? 1),
    unit: item.unit ?? "pcs",
    category: item.category ?? "other", // produce, dairy, meat, bakery, pantry, snacks, beverages, frozen, household, personal_care, other
    priority: item.priority ?? "medium", // low, medium, high, urgent
    brand: item.brand ?? "",
    price_range: item.price_range ?? "mid_range", // budget, premium, mid_range
    suggested_by_ai: Boolean(item.suggested_by_ai ?? false),
    is_completed: Boolean(item.is_completed ?? false),
    created_date: item.created_date ?? now,
    updated_date: now,
  };
}

export default class ShoppingItem {
  // orderBy: "-created_date" or "created_date"
  static async list(orderBy = "-created_date") {
    let items = loadAll();
    if (orderBy && orderBy.replace("-", "") === "created_date") {
      const desc = orderBy.startsWith("-");
      items.sort((a, b) => {
        const t1 = new Date(a.created_date).getTime();
        const t2 = new Date(b.created_date).getTime();
        return desc ? t2 - t1 : t1 - t2;
      });
    }
    return items;
  }

  static async create(itemData) {
    const items = loadAll();
    const item = normalize(itemData || {});
    items.push(item);
    saveAll(items);
    return item;
  }

  static async update(id, updates = {}) {
    const items = loadAll();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error("Item not found");
    const merged = normalize({ ...items[idx], ...updates, id: items[idx].id });
    items[idx] = merged;
    saveAll(items);
    return merged;
  }

  static async delete(id) {
    const items = loadAll();
    const next = items.filter((i) => i.id !== id);
    saveAll(next);
    return { ok: true };
  }
}

// Optional named export too (covers both import styles)
export { ShoppingItem };
