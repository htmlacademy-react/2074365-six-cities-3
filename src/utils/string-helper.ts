export const capitalizeWord = (word: string) => {
  if (word?.length === 0) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export function pluralize(count: number, word: string): string {
  return count === 1 ? `${count} ${word}` : `${count} ${word}s`;
}
