import { NextRequest, NextResponse } from "next/server";
import { AppRouterUtils } from "./utils/AppRouterUtils";

const publicPaths = [AppRouterUtils.ROOT];
const protectedPath = [
  AppRouterUtils.DASHBOARD,
  AppRouterUtils.BOOKS,
  AppRouterUtils.FINES,
  AppRouterUtils.HELP_AND_SUPPORT,
  AppRouterUtils.MEMBERS,
  AppRouterUtils.PROFILE,
  AppRouterUtils.SETTINGS,
];

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const token = request.cookies.get("auth_token")?.value || "";

  if (publicPaths.includes(currentPath) && token) {
    return NextResponse.redirect(
      new URL(AppRouterUtils.DASHBOARD, request.url)
    );
  }

  if (protectedPath.includes(currentPath) && !token) {
    return NextResponse.redirect(new URL(AppRouterUtils.ROOT, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    AppRouterUtils.ROOT,
    AppRouterUtils.DASHBOARD,
    AppRouterUtils.BOOKS,
    AppRouterUtils.FINES,
    AppRouterUtils.HELP_AND_SUPPORT,
    AppRouterUtils.MEMBERS,
    AppRouterUtils.PROFILE,
    AppRouterUtils.SETTINGS,
  ],
};
