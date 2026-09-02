// Utility to store and load custom fonts in browser IndexedDB/LocalStorage
const DB_NAME = 'BanglaWebToolsFontDB';
const STORE_NAME = 'custom_fonts';

export async function saveFontToStorage(name: string, buffer: ArrayBuffer, fileName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'name' });
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put({ name, data: buffer, fileName, timestamp: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function saveCustomFont(name: string, fileName: string, buffer: ArrayBuffer): Promise<void> {
  return saveFontToStorage(name, buffer, fileName);
}

export async function loadStoredCustomFont(name: string = 'SutonnyMJ'): Promise<{ fileName: string; name?: string } | null> {
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'name' });
        }
      };
      request.onsuccess = async () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          resolve(null);
          return;
        }
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get(name);
        getReq.onsuccess = async () => {
          if (getReq.result && getReq.result.data) {
            try {
              const fontFace = new FontFace(name, getReq.result.data);
              await fontFace.load();
              document.fonts.add(fontFace);
              resolve({ fileName: getReq.result.fileName, name: getReq.result.fileName });
            } catch {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        };
        getReq.onerror = () => resolve(null);
      };
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}
