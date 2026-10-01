import { FALLBACK_COVER } from "../../constants/images"

export const mapBook = (rawBook) => {
  const details = rawBook.volumeInfo ?? rawBook
  const copies = Number(rawBook.copies ?? rawBook.stock ?? 0)
  const authors = details.authors ?? rawBook.authors ?? rawBook.author

  return {
    id: String(rawBook.id ?? rawBook._id),
    title: details.title ?? rawBook.title ?? "Untitled",
    author: Array.isArray(authors) ? authors.join(", ") : authors ?? "Unknown author",
    category: rawBook.category ?? details.categories?.[0] ?? "General",
    year: String(rawBook.year ?? details.publishedDate?.slice(0, 4) ?? ""),
    isbn: rawBook.isbn ?? details.industryIdentifiers?.[0]?.identifier ?? "",
    publisher: rawBook.publisher ?? details.publisher ?? "",
    pages: rawBook.pages ?? details.pageCount ?? null,
    description: rawBook.description ?? details.description ?? "",
    image: rawBook.image ?? details.imageLinks?.thumbnail ?? FALLBACK_COVER,
    fallbackImage: rawBook.fallbackImage ?? FALLBACK_COVER,
    copies,
    available: rawBook.available ?? copies > 0,
  }
}