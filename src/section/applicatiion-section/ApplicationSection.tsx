"use client";

import DataTable from "@/components/DataTable/DataTable";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconSearch, IconTrash, IconPencil } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { TableHeaders } from "@/constant/default-values/ApplicationTable";
import Dropdown from "@/components/dropdown/Dropdown";
import { ApplicationStatusOptions } from "@/constant/default-values/ApplicationStatusType";
import { useForm } from "react-hook-form";
import { useAuthUser } from "@/providers/AuthProvider";
import { UserType } from "@/constant/enum/UserType";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import DeleteApplicationModal from "@/modals/delete-application-modal/DeleteApplicationModal";
import EditApplicationModal from "@/modals/edit-application-modal/EditApplicationModal";
import { useDeleteApplication } from "@/hooks/use-delete-application";
import { Button } from "@/components/ui/button";

interface ApplicationSectionProps {
  applications: any[];
}

export default function ApplicationSection({
  applications,
}: ApplicationSectionProps) {
  const { user } = useAuthUser();
  const isAdmin = user?.userType === UserType.ADMIN;

  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { deleteApplication, isDeleting } = useDeleteApplication(() => {
    setIsDeleteModalOpen(false);
    setSelectedAppId(null);
  });

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
    rawStatus: app.status,
    status: (
      <div className="flex justify-center">
        {isAdmin ? (
          <Dropdown
            name={`status-${app._id}`}
            control={control}
            defaultValue={app.status}
            placeholder="Status"
            options={ApplicationStatusOptions}
          />
        ) : (
          <Badge
            variant={
              app.status === "APPROVED"
                ? "default"
                : app.status === "REJECTED"
                  ? "destructive"
                  : "secondary"
            }
          >
            {app.status}
          </Badge>
        )}
      </div>
    ),
  }));

  const studentHeaders = TableHeaders.map((header) =>
    header.value === "applicant"
      ? { label: "Quantity", value: "quantity" }
      : header,
  );

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
          headers={isAdmin ? TableHeaders : studentHeaders}
          data={tableData}
          actionLabel={!isAdmin ? "Action" : undefined}
          renderAction={(row) =>
            !isAdmin && (
              <div className="flex items-center gap-2 justify-end">
                {row.rawStatus === "PENDING" && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-500 hover:text-blue-600 hover:bg-blue-500/10 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        setSelectedApp(row);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <IconPencil size={18} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-8 w-8 cursor-pointer"
                      onClick={() => {
                        setSelectedAppId(row._id);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <IconTrash size={18} />
                    </Button>
                  </>
                )}
              </div>
            )
          }
        />
      </div>

      <DeleteApplicationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => selectedAppId && deleteApplication(selectedAppId)}
        isDeleting={isDeleting}
      />

      <EditApplicationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        application={selectedApp}
      />
    </section>
  );
}
