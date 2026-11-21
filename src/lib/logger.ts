export function logger(...args: any[]) {
  if (import.meta.env.DEV) console.log(...args);
}
