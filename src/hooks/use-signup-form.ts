"use client";

import { getStudentApi, signUpApi } from "@/constant/ApiRoutes";
import { AuthField } from "@/constant/form-field/AuthField";
import { isErrorResponse } from "@/utils/CommonUtils";
import { ApiClient } from "@/wrapper/ApiClient";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthState } from "@/constant/enum/AuthState";
import { useState } from "react";

export function useSignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setValue,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      [AuthField.EMAIL]: "",
      [AuthField.NAME]: "",
      [AuthField.STUDENT_ID]: "",
      [AuthField.DEPARTMENT]: "",
      [AuthField.PASSWORD]: "",
      [AuthField.CONFIRM_PASSWORD]: "",
    },
  });

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(key, value);

    router.push(`?${params.toString()}`);
  };

  // should improve type
  const onSubmit = async (data: any) => {
    const payload = {
      email: data[AuthField.EMAIL],
      password: data[AuthField.PASSWORD],
    };
    const response = await ApiClient(signUpApi, payload);

    if (isErrorResponse(response)) {
      console.log({ response });
      return;
    }

    // show success toast

    updateQueryParams("authState", AuthState.LOG_IN);
  };

  const fetchUser = async () => {
    const email = getValues(AuthField.EMAIL);
    setIsFetching(true);
    const response = await ApiClient(getStudentApi, email);
    if (isErrorResponse(response)) {
      console.log({ response });
      return;
    }
    const { name, studentId, department } = response?.data?.student || {};
    setValue(AuthField.NAME, name);
    setValue(AuthField.STUDENT_ID, studentId);
    setValue(AuthField.DEPARTMENT, department);
    setIsFetching(false);
  };

  return {
    register,
    control,
    errors,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
    fetchUser,
    showPassword,
    triggerShowPassword: () => setShowPassword((prev) => !prev),
    showConfirmPassword,
    triggerShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    isFetching,
  };
}
