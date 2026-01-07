import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import Book from "@/model/Book";
import { ApiError } from "@/wrapper/ApiError";
import { BookGenre } from "@/constant/enum/BookGenre";

export class BookService {
  static async addBook({
    coverImage,
    title,
    author,
    isbnNo,
    genre,
    publisher,
    publishedYear,
    quantity,
    description,
  }: {
    coverImage?: string;
    title: string;
    author: string;
    isbnNo: string;
    genre: BookGenre;
    publisher?: string;
    publishedYear?: number;
    quantity: number;
    description?: string;
  }) {
    // Check if book with same ISBN already exists
    const existingBook = await Book.findOne({ isbnNo });

    if (existingBook) {
      throw new ApiError(
        "Book with this ISBN already exists",
        HttpStatusCode.CONFLICT
      );
    }

    // Create new book
    const newBook = await Book.create({
      coverImage,
      title,
      author,
      isbnNo,
      genre,
      publisher,
      publishedYear,
      quantity,
      description,
    });

    return newBook;
  }
}
