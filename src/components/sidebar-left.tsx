"use client"

import * as React from "react"
import {
  Blocks,
  Calendar,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Trash2,
  BriefcaseBusinessIcon,
} from "lucide-react"

import { NavRecents } from "@/components/nav-recents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  teams: [
    {
      name: "Salão de Beleza 1",
      logo: BriefcaseBusinessIcon,
      plan: "Enterprise",
    },
    {
      name: "Salão de Beleza 2",
      logo: BriefcaseBusinessIcon,
      plan: "Startup",
    },
    {
      name: "Salão de Beleza 3",
      logo: BriefcaseBusinessIcon,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Buscar",
      url: "#",
      icon: Search,
    },
    {
      title: "Início",
      url: "#",
      icon: Home,
      isActive: true,
    },
    {
      title: "Caixa de Entrada",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Ajuda",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
  recents: [
    {
      name: "Gerenciamento de Projetos e Rastreamento de Tarefas",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Coleção de Receitas de Família e Planejamento de Refeições",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Rastreador de Fitness e Rotinas de Treino",
      url: "#",
      emoji: "💪",
    },
    {
      name: "Notas de Livros e Lista de Leitura",
      url: "#",
      emoji: "📚",
    }
  ],
}

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavRecents recents={data.recents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
