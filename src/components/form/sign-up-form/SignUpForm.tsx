"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Dropdown from "@/components/dropdown/Dropdown";
import { DepartmentOptions } from "@/constant/default-values/DepartmentOptions";
import PasswordInput from "@/components/password-input/PasswordInput";
import Link from "next/link";
import { AuthState } from "@/constant/enum/AuthState";
import { useSignUpForm } from "@/hooks/use-signup-form";
import { AuthField } from "@/constant/form-field/AuthField";
import { getValidationRules } from "@/validator/client-validate/AuthFieldValidate";

export default function SignUpForm() {
  const { register, control, handleSubmit, fetchUser } = useSignUpForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <h3 className="text-3xl font-bold">Create your account</h3>
      <p className="text-[14px]">
        Provide the following information for creating your account
      </p>
      <Input
        type="email"
        placeholder="Email"
        {...register(AuthField.EMAIL, getValidationRules(AuthField.EMAIL))}
        onBlur={fetchUser}
      />
      <Input
        placeholder="Name"
        {...register(AuthField.NAME, getValidationRules(AuthField.NAME))}
        disabled
      />
      <Input
        placeholder="Student Id"
        {...register(
          AuthField.STUDENT_ID,
          getValidationRules(AuthField.STUDENT_ID)
        )}
        disabled
      />
      <Dropdown
        placeholder="Select Department"
        options={DepartmentOptions}
        name={AuthField.DEPARTMENT}
        control={control}
        rules={getValidationRules(AuthField.DEPARTMENT)}
        disabled
      />
      <PasswordInput
        placeholder="Password"
        {...register(
          AuthField.PASSWORD,
          getValidationRules(AuthField.PASSWORD)
        )}
      />
      <PasswordInput
        placeholder="Confirm Password"
        {...register(
          AuthField.CONFIRM_PASSWORD,
          getValidationRules(AuthField.CONFIRM_PASSWORD)
        )}
      />
      <Button type="submit" className="w-full cursor-pointer">
        Register
      </Button>
      <Separator />
      <p>
        Already have an account?{" "}
        <Link
          href={`?authState=${AuthState.LOG_IN}`}
          className="underline cursor-pointer"
        >
          Login
        </Link>
      </p>
    </form>
  );
}
