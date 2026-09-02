// Local draft and conversion history storage manager

export interface HistoryItem {
  id: string;
  tool: 'phonetic' | 'bijoy' | 'age' | 'template' | 'number-words';
  title: string;
  content: string;
  preview: string;
  timestamp: number;
}

const STORAGE_KEY = 'lipik_tool_history_v1';
const MAX_HISTORY_ITEMS = 30;

export function getHistoryItems(tool?: string): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const items: HistoryItem[] = JSON.parse(raw);
    if (tool) {
      return items.filter(item => item.tool === tool);
    }
    return items;
  } catch {
    return [];
  }
}

export function saveHistoryItem(item: Omit<HistoryItem, 'id' | 'timestamp'>): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getHistoryItems();
    // Don't save duplicate consecutive content
    if (existing.length > 0 && existing[0].content === item.content) {
      return;
    }
    const newItem: HistoryItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };

    const updated = [newItem, ...existing.filter(i => i.content !== item.content)].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // quota exceeded or storage disabled
  }
}

export function deleteHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getHistoryItems();
    const updated = existing.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function clearHistory(tool?: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (!tool) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      const existing = getHistoryItems();
      const updated = existing.filter(item => item.tool !== tool);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  } catch {
    // ignore
  }
}
