import InputField from "@/components/input-field/InputField";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function FineRulesSection() {
  return (
    <section className="h-full">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Fine Rules Settings</h3>
        </div>
        <Separator />
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <InputField
          label="Charges Per Day"
          placeholder="Enter per day charge for every single day late returned"
          required
        />

        <InputField
          label="Replacement Fee"
          placeholder="Fee for lost or damaged books"
          required
        />

        <InputField
          label="Grace Period (Days)"
          placeholder="Days before fines start (e.g., 2)"
          required
          className="col-span-1"
        />

        <div className="col-span-2 flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </section>
  );
}
