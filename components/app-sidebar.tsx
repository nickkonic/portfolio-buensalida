"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  FileTextIcon,
  ImageIcon,
  AwardIcon,
  Settings2Icon,
  CommandIcon,
} from "lucide-react"
import { useSession } from "@/hooks/use-auth"

const navMain = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Home Page",
    url: "/manage-home",
    icon: <HomeIcon />,
  },
  {
    title: "About Page",
    url: "/manage-about",
    icon: <UserIcon />,
  },
  {
    title: "Work Page",
    url: "/manage-work",
    icon: <BriefcaseIcon />,
  },
  {
    title: "Blog Page",
    url: "/manage-blog",
    icon: <FileTextIcon />,
  },
  {
    title: "Gallery Page",
    url: "/manage-gallery",
    icon: <ImageIcon />,
  },
  {
    title: "Certificate Page",
    url: "/manage-cetificate",
    icon: <AwardIcon />,
  },
]

const navSecondary = [
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings2Icon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  const user = {
    name: session?.email?.split("@")[0] ?? "Admin",
    email: session?.email ?? "",
    avatar: "",
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/dashboard">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Portfolio Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
