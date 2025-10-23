"use client";

import { getStudentApi, signUpApi } from "@/constant/ApiRoutes";
import { SignUpFormField } from "@/constant/form-field/SignUpFormField";
import { isErrorResponse } from "@/utils/CommonUtils";
import { ApiClient } from "@/wrapper/ApiClient";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthState } from "@/constant/enum/AuthState";

export function useSignUpForm() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const { register, control, handleSubmit, getValues, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      [SignUpFormField.EMAIL]: "",
      [SignUpFormField.NAME]: "",
      [SignUpFormField.STUDENT_ID]: "",
      [SignUpFormField.DEPARTMENT]: "",
      [SignUpFormField.PASSWORD]: "",
      [SignUpFormField.CONFIRM_PASSWORD]: "",
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
      email: data[SignUpFormField.EMAIL],
      password: data[SignUpFormField.PASSWORD],
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
    const email = getValues(SignUpFormField.EMAIL);
    const response = await ApiClient(getStudentApi, email);
    if (isErrorResponse(response)) {
      console.log({ response });
      return;
    }
    const { name, studentId, department } = response?.data?.student || {};
    setValue(SignUpFormField.NAME, name);
    setValue(SignUpFormField.STUDENT_ID, studentId);
    setValue(SignUpFormField.DEPARTMENT, department);
  };

  return {
    register,
    control,
    handleSubmit: handleSubmit(onSubmit),
    fetchUser,
  };
}
