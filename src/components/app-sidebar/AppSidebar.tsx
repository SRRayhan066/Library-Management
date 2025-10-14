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

import {
  IconLayoutDashboardFilled,
  IconBookFilled,
  IconUsersGroup,
  IconCoinTakaFilled,
  IconSettings,
  IconHelpCircleFilled,
} from "@tabler/icons-react";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: IconLayoutDashboardFilled,
  },
  {
    title: "Books",
    url: "#",
    icon: IconBookFilled,
  },
  {
    title: "Members",
    url: "#",
    icon: IconUsersGroup,
  },
  {
    title: "Fines & Payments",
    url: "#",
    icon: IconCoinTakaFilled,
  },
];

const secondaryItems = [
  {
    title: "Settings",
    url: "#",
    icon: IconSettings,
  },
  {
    title: "Help & Support",
    url: "#",
    icon: IconHelpCircleFilled,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="">
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
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="">
        <SidebarMenu className="">
          <SidebarMenuItem className="">
            <SidebarMenuButton>User Details</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
