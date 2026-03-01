"use client";

import DataTable from "@/components/DataTable/DataTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { TableHeaders } from "@/constant/default-values/ApplicationTable";
import Dropdown from "@/components/dropdown/Dropdown";
import { ApplicationStatusOptions } from "@/constant/default-values/ApplicationStatusType";
import { useForm } from "react-hook-form";
import { useAuthUser } from "@/providers/AuthProvider";
import { UserType } from "@/constant/enum/UserType";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface ApplicationSectionProps {
  applications: any[];
}

export default function ApplicationSection({
  applications,
}: ApplicationSectionProps) {
  const { user } = useAuthUser();
  const isAdmin = user?.userType === UserType.ADMIN;

  const { control } = useForm({
    mode: "onChange",
  });

  const tableData = applications.map((app) => ({
    ...app,
    registrationNo:
      app.userId?.referenceId?.studentId || app.userId?.userId || "N/A",
    bookId: app.bookId?._id || "N/A",
    bookName: app.bookId?.title || "N/A",
    applicant: app.userId?.referenceId?.name || app.userId?.name || "N/A",
    applicationDate: format(new Date(app.appliedDate), "PPP"),
  }));

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
          data={tableData}
          actionLabel="Status"
          renderAction={(row) => (
            <div className="w-[120px] flex justify-end">
              {isAdmin ? (
                <Dropdown
                  name={`status-${row._id}`}
                  control={control}
                  defaultValue={row.status}
                  placeholder="Status"
                  options={ApplicationStatusOptions}
                />
              ) : (
                <Badge
                  variant={
                    row.status === "APPROVED"
                      ? "default"
                      : row.status === "REJECTED"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {row.status}
                </Badge>
              )}
            </div>
          )}
        />
      </div>
    </section>
  );
}
