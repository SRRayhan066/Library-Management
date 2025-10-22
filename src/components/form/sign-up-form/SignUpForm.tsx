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
import { SignUpFormField } from "@/constant/form-field/SignUpFormField";
import { getValidationRules } from "@/validator/client-validate/SignUpValidate";

export default function SignUpForm() {
  const { register, control, handleSubmit } = useSignUpForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <h3 className="text-3xl font-bold">Create your account</h3>
      <p className="text-[14px]">
        Provide the following information for creating your account
      </p>
      <Input
        type="email"
        placeholder="Email"
        {...register(
          SignUpFormField.EMAIL,
          getValidationRules(SignUpFormField.EMAIL)
        )}
      />
      <Input
        placeholder="Name"
        {...register(
          SignUpFormField.NAME,
          getValidationRules(SignUpFormField.NAME)
        )}
        disabled
      />
      <Input
        placeholder="Student Id"
        {...register(
          SignUpFormField.STUDENT_ID,
          getValidationRules(SignUpFormField.STUDENT_ID)
        )}
        disabled
      />
      <Dropdown
        placeholder="Select Department"
        options={DepartmentOptions}
        name={SignUpFormField.DEPARTMENT}
        control={control}
        rules={getValidationRules(SignUpFormField.DEPARTMENT)}
        disabled
      />
      <PasswordInput
        placeholder="Password"
        {...register(
          SignUpFormField.PASSWORD,
          getValidationRules(SignUpFormField.PASSWORD)
        )}
      />
      <PasswordInput
        placeholder="Confirm Password"
        {...register(
          SignUpFormField.CONFIRM_PASSWORD,
          getValidationRules(SignUpFormField.CONFIRM_PASSWORD)
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
