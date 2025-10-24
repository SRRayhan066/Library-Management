"use client";

import { AuthField } from "@/constant/form-field/AuthField";
import { useRouter } from "next/navigation";
import { isErrorResponse } from "@/utils/CommonUtils";
import { ApiClient } from "@/wrapper/ApiClient";
import { useForm } from "react-hook-form";
import { signInApi } from "@/constant/ApiRoutes";
import { AppRouterUtils } from "@/utils/AppRouterUtils";
import { useState } from "react";

export function useLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
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
    errors,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
    showPassword,
    triggerShowPassword: () => setShowPassword((prev) => !prev),
  };
}
