import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Dropdown from "@/components/dropdown/Dropdown";
import { DepartmentOptions } from "@/constant/default-values/DepartmentOptions";
import PasswordInput from "@/components/password-input/PasswordInput";
import Link from "next/link";
import { AuthState } from "@/constant/enum/AuthState";

export default function SignUpForm() {
  return (
    <>
      <h3 className="text-3xl font-bold">Create your account</h3>
      <p className="text-[14px]">
        Provide the following information for creating your account
      </p>
      <Input placeholder="Name" />
      <Input placeholder="Registration No." />
      <Input type="email" placeholder="Email" />
      <Dropdown label="Select Department" options={DepartmentOptions} />
      <PasswordInput />
      <Button className="w-full">Register</Button>
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
    </>
  );
}
