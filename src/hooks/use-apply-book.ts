"use client";

import { useForm } from "react-hook-form";
import { ApiClient } from "@/wrapper/ApiClient";
import { createApplicationApi } from "@/constant/ApiRoutes";
import { isErrorResponse } from "@/utils/CommonUtils";
import { useToast } from "@/providers/AlertProvider";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/providers/AuthProvider";
import { DateRange } from "react-day-picker";

export interface ApplyBookFormValues {
  dateRange: DateRange | undefined;
  quantity: number;
}

export function useApplyBook(
  bookId: string,
  availableQuantity: number,
  onSuccess?: () => void,
) {
  const router = useRouter();
  const { user } = useAuthUser();
  const { showSuccessToast, showErrorToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
    setValue,
  } = useForm<ApplyBookFormValues>({
    mode: "onChange",
    defaultValues: {
      dateRange: {
        from: new Date(),
        to: undefined,
      },
      quantity: 1,
    },
  });

  const onSubmit = async (data: ApplyBookFormValues) => {
    if (!user) {
      showErrorToast("Error", "You must be logged in to apply for a book");
      return;
    }

    if (!data.dateRange?.from || !data.dateRange?.to) {
      showErrorToast("Error", "Please select a complete date range");
      return;
    }

    const payload = {
      bookId,
      userId: user.userId,
      fromDate: data.dateRange.from,
      toDate: data.dateRange.to,
      quantity: data.quantity,
    };

    const response = await ApiClient(createApplicationApi, payload);

    if (isErrorResponse(response)) {
      showErrorToast(
        "Error",
        response?.error || "Failed to submit application",
      );
      return;
    }

    showSuccessToast("Success", "Application submitted successfully");
    reset();
    onSuccess?.();
    router.refresh();
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    isValid,
    control,
    watch,
    setValue,
  };
}
