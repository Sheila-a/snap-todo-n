export function capitalizeFirstWord(text?: string): string {
  if (!text) return '';
  const [first, ...rest] = text.trim().split(' ');
  return [first.charAt(0).toUpperCase() + first.slice(1), ...rest].join(' ');
}
