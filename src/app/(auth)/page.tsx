import { AuthState } from "@/constant/enum/AuthState";
import AuthSection from "@/section/auth-section/AuthSection";
import { QueryParamsProps } from "@/types/QueryParamsProps";

export default function Page({ searchParams }: QueryParamsProps) {
  const authStateParam = searchParams?.authState;
  const authState =
    typeof authStateParam === "string" ? authStateParam : AuthState.LOG_IN;

  return <AuthSection authState={authState} />;
}
