"use client";

import { AuthField } from "@/constant/form-field/AuthField";
import { useRouter } from "next/navigation";
import { isErrorResponse } from "@/utils/CommonUtils";
import { ApiClient } from "@/wrapper/ApiClient";
import { useForm } from "react-hook-form";
import { signInApi } from "@/constant/ApiRoutes";
import { AppRouterUtils } from "@/utils/AppRouterUtils";

export function useLoginForm() {
  const router = useRouter();
  const { register, control, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      [AuthField.EMAIL]: "",
      [AuthField.PASSWORD]: "",
    },
  });

  //should improve data
  const onSubmit = async (data: any) => {
    const response = await ApiClient(signInApi, data);
    if (isErrorResponse(response)) {
      console.log({ response });
      return;
    }

    router.push(AppRouterUtils.DASHBOARD);
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
  };
}
