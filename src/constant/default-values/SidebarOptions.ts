import {
  IconLayoutDashboardFilled,
  IconBookFilled,
  IconUsersGroup,
  IconCoinTakaFilled,
  IconSettings,
  IconHelpCircleFilled,
  IconFilesFilled,
} from "@tabler/icons-react";

export const primaryItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: IconLayoutDashboardFilled,
  },
  {
    title: "Books",
    url: "/books",
    icon: IconBookFilled,
  },
  {
    title: "Members",
    url: "/members",
    icon: IconUsersGroup,
  },
  {
    title: "Applications",
    url: "/applications",
    icon: IconFilesFilled,
  },
  {
    title: "Fine Rules",
    url: "/fine-rules",
    icon: IconCoinTakaFilled,
  },
];

export const secondaryItems = [
  {
    title: "Settings",
    url: "/settings",
    icon: IconSettings,
  },
  {
    title: "Help & Support",
    url: "/help-and-support",
    icon: IconHelpCircleFilled,
  },
];
