
'use client';
import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarRight } from '@/components/sidebar-right';
import TimeGridSettings from '@/components/timegrid-settings';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useState } from 'react';

export default function SettingsPage() {
    const [control, setControl] = useState<keyof typeof SettingOptions>('DEFAULT');

    const SettingOptions = {
        TIME_GRID:  <TimeGridSettings />,
        DEFAULT: <div>OUTRAS OPÇÕES</div>,
    };

    return (
        <SidebarProvider>
        <SidebarLeft />
        <SidebarInset>
          <header className='sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-background'>
            <div className='flex flex-1 items-center gap-2 px-3'>
              <SidebarTrigger />
              <Separator orientation='vertical' className='mr-2 h-4' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className='line-clamp-1 text-2xl font-bold'>
                      Ajustes de sistema 
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className='flex flex-1 flex-col gap-4 p-4'>
            <div className='mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50 flex between items-center justify-between p-4'>

                OUTRA OPÇÕES DE AJUSTE AQUI 

                <Button onClick={() => setControl('TIME_GRID')}>TimeGridSettings</Button>
            </div>
            <div className='mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50'>
              {SettingOptions[control]}
            </div>
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    );
}