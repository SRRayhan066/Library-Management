"use client";

import { getStudentApi } from "@/constant/ApiRoutes";
import { ApiClient } from "@/wrapper/ApiClient";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function useSignUpForm() {
  const { register, control, handleSubmit } = useForm({
    mode: "onChange",
  });

  // should improve type
  const onSubmit = (data: any) => {
    console.log({ data });
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
}
