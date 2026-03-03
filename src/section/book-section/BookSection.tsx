"use client";

import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import Dropdown from "@/components/dropdown/Dropdown";
import { bookGenres } from "@/constant/default-values/BookGenres";
import CardItem from "@/components/card-Item/CardItem";
import AddBookSection from "../add-book-section/AddBookSection";
import { useForm, Control, FieldValues } from "react-hook-form";
import { useAuthUser } from "@/providers/AuthProvider";
import Link from "next/link";
import { UserType } from "@/constant/enum/UserType";
import { useMemo, useState } from "react";
import { getGenreLabel } from "@/utils/BookUtils";

interface Book {
  _id: string;
  coverImage?: string;
  title: string;
  author: string;
  isbnNo: string;
  genre: string;
  publisher?: string;
  publishedYear?: number;
  quantity: number;
  totalAvailable: number;
  description?: string;
}

interface BookSectionProps {
  books: Book[];
}

export default function BookSection({ books }: BookSectionProps) {
  const { control, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      genre: "all",
    },
  });
  const { user } = useAuthUser();
  const [searchQuery, setSearchQuery] = useState("");
  const selectedGenre = watch("genre");

  const genreOptions = useMemo(() => {
    return [{ label: "All Genres", value: "all" }, ...bookGenres];
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesGenre =
        !selectedGenre ||
        selectedGenre === "all" ||
        book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [books, searchQuery, selectedGenre]);

  return (
    <section className="h-full">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Book List</h3>
          <div className="flex justify-end items-center gap-2 w-1/2 ">
            <InputGroup className="w-1/2 ">
              <InputGroupInput
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
            </InputGroup>

            <div className="w-1/4">
              <Dropdown
                name="genre"
                control={control as unknown as Control<FieldValues>}
                placeholder="Select Genre"
                options={genreOptions}
              />
            </div>
            {user?.userType === UserType.ADMIN && <AddBookSection />}
          </div>
        </div>
        <Separator />
      </div>

      <div className="p-[20px] grid grid-cols-4 gap-5">
        {filteredBooks.map((book) => (
          <Link
            key={book._id}
            href={`/books/${book._id}`}
            className="block transition-transform hover:scale-[1.02] h-full"
          >
            <CardItem
              coverImage={book.coverImage}
              title={book.title}
              author={book.author}
              genre={getGenreLabel(book.genre)}
              total={book.quantity}
              available={book.totalAvailable ?? book.quantity}
              description={book.description}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
