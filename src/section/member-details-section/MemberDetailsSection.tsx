"use client";

import { Separator } from "@/components/ui/separator";
import {
  TableHeaders,
  demoData,
} from "@/constant/default-values/MemberDetails";
import DataTable from "@/components/DataTable/DataTable";
import Dropdown from "@/components/dropdown/Dropdown";
import { BookStatusOptions } from "@/constant/default-values/BookStatusOptions";
import SuspendModal from "@/modals/suspend-modal/SuspendModal";
import TablePagination from "@/components/table-pagination/TablePagination";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function MemberDetailsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { control } = useForm({
    mode: "onChange",
  });
  return (
    <section className="h-full relative">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Demo User Name</h3>
          <SuspendModal />
        </div>
        <Separator />
      </div>
      <div className="p-5 flex flex-col gap-4">
        <BasicInfo />
        <DataTable
          headers={TableHeaders}
          data={demoData}
          actionLabel="Status"
          renderAction={(value) => (
            <div className="w-[120px] flex justify-end">
              <Dropdown
                name="genre"
                control={control}
                defaultValue={value?.status}
                placeholder="Status"
                options={BookStatusOptions}
              />
            </div>
          )}
        />
      </div>
      <TablePagination
        totalItems={100}
        currentPage={currentPage}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        className="absolute bottom-5"
      />
    </section>
  );
}

const BasicInfo = () => (
  <div className="flex justify-between">
    <div className="flex flex-col gap-2">
      <p>
        <span className="font-semibold">Registration No:</span> 903480298
      </p>
      <p>
        <span className="font-semibold">Department:</span> Computer Science and
        Engineering
      </p>
      <p>
        <span className="font-semibold">Session:</span> 2020-21
      </p>
    </div>
    <div className="flex flex-col items-end gap-2">
      <p>
        <span className="font-semibold">Due Charges:</span> 200 BDT
      </p>
      <p>
        <span className="font-semibold">Total Borrowed Books:</span> 6
      </p>
      <p>
        <span className="font-semibold">Total Returned Books:</span> 5
      </p>
    </div>
  </div>
);
