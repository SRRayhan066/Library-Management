"use client";

import InputFile from "@/components/input-file/InputFile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/DataTable/DataTable";
import {
  TableHeaders,
  demoData,
} from "@/constant/default-values/MemberDetails";
import { BookStatusMap } from "@/constant/default-values/BookStatusOptions";
import { Badge } from "@/components/ui/badge";
import { BookStatus } from "@/constant/enum/BookStatus";
import TablePagination from "@/components/table-pagination/TablePagination";
import { useState } from "react";

export default function ProfileSection() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <section className="h-full relative">
      <div className="sticky top-[48px] bg-[var(--background)] ">
        <div className="flex justify-between items-center p-3">
          <h3 className="font-semibold text-2xl">Demo User Name</h3>
          <Button>Save</Button>
        </div>
        <Separator />
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-center gap-5">
          <div className="h-[180px] w-[200px]">
            <InputFile description="upload profile image" />
          </div>
          <div className="w-full flex flex-col gap-3">
            <p>
              <span className="font-semibold mr-3">Student Id:</span>2948209
            </p>
            <p>
              <span className="font-semibold mr-3">Session:</span>2019-20
            </p>
            <p>
              <span className="font-semibold mr-3">Total Borrowed Books:</span>
              29
            </p>
            <p>
              <span className="font-semibold mr-3">Total Returned Books:</span>
              12
            </p>
          </div>
        </div>

        <DataTable
          headers={TableHeaders}
          data={demoData}
          actionLabel="Status"
          renderAction={(data) => {
            const badge = getVariant(data?.status);
            return (
              <Badge variant={badge.variant} className="w-[90px]">
                {badge.label}
              </Badge>
            );
          }}
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

const getVariant = (status: string) => {
  switch (status) {
    case BookStatus.BORROWED:
      return { label: BookStatusMap[status], variant: "secondary" as const };
    case BookStatus.TIME_EXCEEDED:
      return { label: BookStatusMap[status], variant: "destructive" as const };
    default:
      return {
        label: BookStatusMap[BookStatus.RETURNED],
        variant: "default" as const,
      };
  }
};
