'use client';

import * as React from 'react';
import { Plus } from 'lucide-react';

import { Calendars } from '@/components/calendars';
import { DatePicker } from '@/components/date-picker';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

// This is sample data.
const data = {
  user: {
    name: 'Carregando...',
    email: 'Carregando...',
    avatar: '',
  },
  calendars: [
    {
      name: 'Filtros',
      items: ['Agendado', 'Disponíveis', 'Feriados'],
    },
  ],
};

export function SidebarRight({
  ...props
}: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = React.useState(data.user);

  React.useEffect(() => {
    const token = localStorage.getItem('access_token');

    const decodeToken = (token: string) => {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const jsonPayload = JSON.parse(decodedPayload);
      return jsonPayload;
    };

    if (token) {
      const decoded = decodeToken(token);
      setUser({
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.imageUrl,
      });
    }
  }, []);

  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={user} />
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
  );
}
