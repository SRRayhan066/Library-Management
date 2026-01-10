import mongoose, { Schema, Document } from "mongoose";
import { BookGenre } from "@/constant/enum/BookGenre";

interface IBook extends Document {
  coverImage?: string;
  title: string;
  author: string;
  isbnNo: string;
  genre: BookGenre;
  publisher?: string;
  publishedYear?: number;
  quantity: number;
  description?: string;
}

const BookSchema = new Schema<IBook>(
  {
    coverImage: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    isbnNo: {
      type: String,
      required: [true, "ISBN number is required"],
      unique: true,
      trim: true,
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      enum: {
        values: Object.values(BookGenre),
        message: "Invalid genre",
      },
    },
    publisher: {
      type: String,
      default: null,
    },
    publishedYear: {
      type: Number,
      default: null,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity cannot be less than 1"],
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book =
  mongoose.models.books || mongoose.model<IBook>("books", BookSchema);

export default Book;
