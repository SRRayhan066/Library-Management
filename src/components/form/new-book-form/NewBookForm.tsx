import DropdownField from "@/components/dropdown-field/DropdownField";
import Dropdown from "@/components/dropdown/Dropdown";
import InputField from "@/components/input-field/InputField";
import InputFile from "@/components/input-file/InputFile";
import { Input } from "@/components/ui/input";
import { bookGenres } from "@/constant/default-values/BookGenres";
import { Button } from "@/components/ui/button";

export default function NewBookForm() {
  return (
    <form className="flex flex-col gap-5">
      <InputFile />

      <div className="flex items-center gap-2">
        <InputField label="Title" placeholder="Book Name" required />
        <InputField label="Author" placeholder="Author Name" required />
      </div>
      <div className="flex gap-2">
        <InputField
          label="ISBN"
          placeholder="ISBN No."
          className="bg-red-700"
        />
        <DropdownField
          label="Genre"
          placeholder="Select Genre"
          options={bookGenres}
        />
      </div>

      <div className="flex gap-2">
        <InputField label="Publisher" placeholder="Publisher name" />
        <InputField label="Published Year" placeholder="Year" />
        <InputField label="Quantity" placeholder="Quantity" />
      </div>

      <InputField
        label="Description"
        type="textarea"
        placeholder="Description"
      />

      <div className="flex justify-end">
        <Button>Submit</Button>
      </div>
    </form>
  );
}
