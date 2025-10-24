"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNavItems } from "@/constant/default-values/SidebarOptions";
import { NavItemsProps } from "@/types/NavItemsProps";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { isActivePath } from "@/utils/CommonUtils";
import { AppRouterUtils } from "@/utils/AppRouterUtils";
import { useAuthUser } from "@/providers/AuthProvider";

export function AppSidebar() {
  const pathName = usePathname();
  const { user } = useAuthUser();
  const { primaryItems, secondaryItems } = getNavItems(user?.userType);
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="p-1.5">
              <a href="#">
                <span className="text-base font-semibold">
                  Library Management System
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-2">
        <NavItems items={primaryItems} pathName={pathName} />
        <NavItems
          items={secondaryItems}
          pathName={pathName}
          className="mt-auto"
        />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="py-2">
            <SidebarMenuButton
              className={`h-full cursor-pointer ${
                isActivePath(pathName, AppRouterUtils.PROFILE) && "bg-gray-800"
              }`}
            >
              <Link
                href={AppRouterUtils.PROFILE}
                className="h-full flex justify-start gap-1.5"
              >
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex-col">
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-[12px]">john@gmail.com</p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

const NavItems = ({ items, pathName = "", className = "" }: NavItemsProps) => (
  <SidebarGroup className={className}>
    <SidebarGroupContent className="flex flex-col gap-2">
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              className={`${isActivePath(pathName, item.url) && "bg-gray-800"}`}
              tooltip={item.title}
              asChild
            >
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  </SidebarGroup>
);
