"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Home,
  Layout,
  Settings2,
  ShoppingBag
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/useAuthStore";

// This is sample data.
const data = {
  user: {
    name: "João Tambue",
    email: "joaotambue13@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Analise de vendas",
      url: "/dashboard/salesAnalistcs",
      icon: Layout,
    },
    {
      title: "Produtos",
      url: "/dashboard/produtos",
      icon: ShoppingBag,
    },
    {
      title: "Motoboy",
      url: "/dashboard/motoboys",
      icon: ShoppingBag,
    },
    {
      title: "Definições",
      url: "#",
      icon: Settings2,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, getUser, accessToken } = useAuthStore();

  React.useEffect(() => {
    if (accessToken && !user) {
      getUser();
    }
  }, [accessToken, user, getUser]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user.name ?? "Usuário",
              email: user.email ?? "Sem email",
              avatar: "https://github.com/joao-tambue.png",
            }}
          />
        ) : (
          <p className="text-sm text-muted-foreground p-4">Carregando usuário...</p>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
