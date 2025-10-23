"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthState } from "@/constant/enum/AuthState";
import Link from "next/link";
import { useLoginForm } from "@/hooks/use-login-form";
import { AuthField } from "@/constant/form-field/AuthField";
import { getValidationRules } from "@/validator/client-validate/AuthFieldValidate";
import PasswordInput from "@/components/password-input/PasswordInput";

export default function LoginForm() {
  const { register, handleSubmit } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <h3 className="text-3xl font-bold">Welcome Back!</h3>
      <p className="text-[14px]">
        Enter your email and password to login to your account
      </p>
      <Input
        type="email"
        placeholder="Email"
        {...register(AuthField.EMAIL, getValidationRules(AuthField.EMAIL))}
      />
      <PasswordInput
        placeholder="Password"
        {...register(
          AuthField.PASSWORD,
          getValidationRules(AuthField.PASSWORD)
        )}
      />
      <Button className="w-full cursor-pointer">Login</Button>
      <Separator />
      <p>
        Don't have an account?{" "}
        <Link href={`?authState=${AuthState.REGISTER}`} className="underline">
          Register
        </Link>
      </p>
    </form>
  );
}
