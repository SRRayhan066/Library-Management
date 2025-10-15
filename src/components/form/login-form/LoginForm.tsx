"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthState } from "@/constant/enum/AuthState";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppRouterUtils } from "@/utils/appRouterUtils";

export default function LoginForm() {
  const router = useRouter();

  const onLogin = () => {
    router.push(AppRouterUtils.DASHBOARD);
  };

  return (
    <>
      <h3 className="text-3xl font-bold">Welcome Back!</h3>
      <p className="text-[14px]">
        Enter your email and password to login to your account
      </p>
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Password" />
      <Button className="w-full cursor-pointer" onClick={onLogin}>
        Login
      </Button>
      <Separator />
      <p>
        Don't have an account?{" "}
        <Link href={`?authState=${AuthState.REGISTER}`} className="underline">
          Register
        </Link>
      </p>
    </>
  );
}
