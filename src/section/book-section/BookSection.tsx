import { Separator } from "@/components/ui/separator";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { IconSearch, IconCirclePlus } from "@tabler/icons-react";
import Dropdown from "@/components/dropdown/Dropdown";
import { bookGenres } from "@/constant/default-values/BookGenres";
import CardItem from "@/components/card-Item/CardItem";
import AddBookSection from "../add-book-section/AddBookSection";

export default function BookSection() {
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
              <Dropdown placeholder="Select Genre" options={bookGenres} />
            </div>
            <AddBookSection />
          </div>
        </div>
        <Separator />
      </div>

      <div className="p-[20px] inline-flex flex-wrap gap-[20px]">
        {Array.from({ length: 11 }).map((_, index) => (
          <CardItem key={index} />
        ))}
      </div>
    </section>
  );
}
