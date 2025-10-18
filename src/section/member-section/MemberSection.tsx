import DataTable from "@/components/DataTable/DataTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { TableHeaders, demoData } from "@/constant/default-values/MemberTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppRouterUtils } from "@/utils/AppRouterUtils";

export default function MemberSection() {
  return (
    <section className="h-full">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Member List</h3>
          <div className="flex justify-end items-center gap-2 w-1/2 ">
            <InputGroup className="w-1/2 ">
              <InputGroupInput placeholder="Search..." />
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
          actionLabel="View Details"
          renderAction={(row) => (
            <Button asChild>
              <Link href={AppRouterUtils.MEMBER_DETAILS(row.registrationNo)}>
                View
              </Link>
            </Button>
          )}
        />
      </div>
    </section>
  );
}
