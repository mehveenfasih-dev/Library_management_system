const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getBooks = async () => {
  const response = await fetch(
    `${BASE_URL}/search.json?q=programming&limit=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await response.json();

  return data.docs.map((book) => ({
    id: book.key.split("/").pop(),
    title: book.title,
    author: book.author_name?.[0] || "Unknown Author",
    category: book.subject?.[0] || "Unknown",
    year: book.first_publish_year || "Unknown",
    image: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/100x150?text=No+Cover",
  }));
};

export const getBookById = async (id) => {
  const response = await fetch(
    `${BASE_URL}/works/${id}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  const book = await response.json();

  return {
    id,
    title: book.title,
    description:
      typeof book.description === "string"
        ? book.description
        : book.description?.value || "No description available.",
    category: book.subjects?.[0] || "Unknown",
    image: book.covers?.[0]
      ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
      : "https://via.placeholder.com/200x300?text=No+Cover",
    author:
      book.authors?.[0]?.author?.key || "Unknown Author",
  };
};