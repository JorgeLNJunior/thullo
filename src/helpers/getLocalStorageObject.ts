/**
 * Return a parsed Object<T> from local storage.
 * @param key Local storage item key.
 */
export default function getLocalStorageObject<T>(key: string) {
  const item = localStorage.getItem(key) as string
  return JSON.parse(item) as unknown as T
}
