export const unique = (tags) => {
  const uniqueTags = Array.from(new Set(tags));
  return uniqueTags;
};
