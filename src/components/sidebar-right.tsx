import * as React from "react"
import { Plus } from "lucide-react"

import { Calendars } from "@/components/calendars"
import { DatePicker } from "@/components/date-picker"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Emerson",
    email: "emerson@gmail.com", 
    avatar: "http://localhost:9001/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL2J1Y2tldC1iZWxlem91L3Byb2ZpbGUuanBnP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9VkMzUksxOVlaU0tSSkdVVk9aSFclMkYyMDI1MDMwNiUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNTAzMDZUMjAwMDAxWiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lKV1F6TlNTekU1V1ZwVFMxSktSMVZXVDFwSVZ5SXNJbVY0Y0NJNk1UYzBNVE16TXprME5pd2ljR0Z5Wlc1MElqb2lZV1J0YVc0aWZRLjJkNlJKWWNmRkdaN0ItX0dsV3gzY183MnJwd3h4aWp6dEloUDhUQlcyZDJFZzJVTi1FWUZmWm94SExWYlFPTHdQb2EzRDJXb05QUGhXdHpHbGUtVjl3JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9MDI2ZjJlNTMxYmYwZDJkMjNjMWMyMDVkNmVhZTBiNjViMmJhMDMyMTg0OWNiODkxNjMzNGQ1N2Q5NWU2ZWQzYg",
  },
  calendars: [
    {
      name: "Filtros",
      items: ["Agendado", "Disponíveis", "Feriados"],
    }
  ],
}

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars calendars={data.calendars} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>Novo Agendamento</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
