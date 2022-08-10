export const unique = (tags) => [...new Set(tags)].filter((entry) => entry.trim() !== '');
