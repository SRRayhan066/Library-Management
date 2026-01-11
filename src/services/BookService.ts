import { HttpStatusCode } from "@/constant/enum/HttpStatusCode";
import Book from "@/model/Book";
import { ApiError } from "@/wrapper/ApiError";
import { BookGenre } from "@/constant/enum/BookGenre";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_LIMIT,
} from "@/constant/ApplicationConstant";

export class BookService {
  static async getAllBooks({
    genre,
    page = DEFAULT_PAGE,
    limit = DEFAULT_PAGE_LIMIT,
  }: {
    genre?: BookGenre;
    page?: number;
    limit?: number;
  } = {}) {
    const filter: { genre?: BookGenre } = {};
    if (genre) {
      filter.genre = genre;
    }
    const skip = (page - 1) * limit;

    const [books, totalCount] = await Promise.all([
      Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Book.countDocuments(filter),
    ]);
    const totalPages = Math.ceil(totalCount / limit);

    return {
      books,
      totalCount,
      totalPages,
    };
  }
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
    const existingBook = await Book.findOne({ isbnNo });

    if (existingBook) {
      throw new ApiError(
        "Book with this ISBN already exists",
        HttpStatusCode.CONFLICT
      );
    }

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
