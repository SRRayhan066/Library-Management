"use client";

import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import Dropdown from "@/components/dropdown/Dropdown";
import { bookGenres, demoData } from "@/constant/default-values/BookGenres";
import CardItem from "@/components/card-Item/CardItem";
import AddBookSection from "../add-book-section/AddBookSection";
import { useForm } from "react-hook-form";
import { useAuthUser } from "@/providers/AuthProvider";
import { UserType } from "@/constant/enum/UserType";

export default function BookSection() {
  const { control } = useForm({
    mode: "onChange",
  });
  const { user } = useAuthUser();
  return (
    <section className="h-full">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Book List</h3>
          <div className="flex justify-end items-center gap-2 w-1/2 ">
            <InputGroup className="w-1/2 ">
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
            </InputGroup>

            <div className="w-1/4">
              <Dropdown
                name="genre"
                control={control}
                placeholder="Select Genre"
                options={bookGenres}
              />
            </div>
            {user?.userType === UserType.ADMIN && <AddBookSection />}
          </div>
        </div>
        <Separator />
      </div>

      <div className="p-[20px] grid grid-cols-4 gap-5">
        {Array.from({ length: 11 }).map((_, index) => (
          <CardItem key={index} {...demoData} />
        ))}
      </div>
    </section>
  );
}
