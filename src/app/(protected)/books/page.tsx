import { connectDB } from "@/config/db";
import BookSection from "@/section/book-section/BookSection";
import { BookService } from "@/services/BookService";
import { jsonObject } from "@/utils/CommonUtils";
import { notFound } from "next/navigation";

const loadBooks = async () => {
  try {
    await connectDB();
    const { books, totalCount, totalPages } = await BookService.getAllBooks();
    return {
      data: {
        books: jsonObject(books),
        totalCount,
        totalPages,
      },
      error: null,
    };
  } catch (error: Error | unknown) {
    return {
      data: null,
      error,
    };
  }
};

export default async function Page() {
  const { data, error } = await loadBooks();
  if (error || !data) {
    return notFound();
  }

  return <BookSection books={data.books} />;
}
