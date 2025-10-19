import DataTable from "@/components/DataTable/DataTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import {
  TableHeaders,
  demoData,
} from "@/constant/default-values/ApplicationTable";
import Dropdown from "@/components/dropdown/Dropdown";
import { ApplicationStatusOptions } from "@/constant/default-values/ApplicationStatusType";

export default function ApplicationSection() {
  return (
    <section className="h-full">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Applications</h3>
          <div className="flex justify-end items-center gap-2 w-1/2 ">
            <InputGroup className="w-1/2 ">
              <InputGroupInput placeholder="Search by id or name..." />
              <InputGroupAddon>
                <IconSearch />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <Separator />
      </div>
      <div className="p-4">
        <DataTable
          headers={TableHeaders}
          data={demoData}
          actionLabel="Status"
          renderAction={(value) => (
            <div className="w-[120px] flex justify-end">
              <Dropdown
                defaultValue={value?.status}
                placeholder="Status"
                options={ApplicationStatusOptions}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}
