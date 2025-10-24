"use client";

import { getStudentApi, signUpApi } from "@/constant/ApiRoutes";
import { AuthField } from "@/constant/form-field/AuthField";
import { isErrorResponse } from "@/utils/CommonUtils";
import { ApiClient } from "@/wrapper/ApiClient";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthState } from "@/constant/enum/AuthState";
import { useState } from "react";
import { useDebounce } from "./use-debounce";

export function useSignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
    setValue,
    reset,
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useDebounce(email, async (value) => {
    if (!value || value.trim() === "") {
      setIsFetching(false);
      return;
    }
    setIsFetching(true);
    const response = await ApiClient(getStudentApi, value);
    const { name, studentId, department } = response?.data?.student || {};
    reset({
      ...getValues(),
      [AuthField.NAME]: name,
      [AuthField.STUDENT_ID]: studentId,
      [AuthField.DEPARTMENT]: department,
    });
    setIsFetching(false);
  });

  return {
    register,
    control,
    errors,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
    showPassword,
    triggerShowPassword: () => setShowPassword((prev) => !prev),
    showConfirmPassword,
    triggerShowConfirmPassword: () => setShowConfirmPassword((prev) => !prev),
    isFetching,
    handleEmailChange,
  };
}
