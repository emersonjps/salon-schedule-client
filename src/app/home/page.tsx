import Categories from '@/components/categories';
import { SidebarLeft } from '@/components/sidebar-left';
import { SidebarRight } from '@/components/sidebar-right';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

const categories = [
  {
    img: 'https://images.unsplash.com/photo-1555992336-03a23c5b1b03?auto=format&fit=crop&w=500&q=60', // Restaurantes
    name: 'Restaurantes',
  },
  {
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=60', // Lanchonetes
    name: 'Lanchonetes',
  },
  {
    img: 'https://images.unsplash.com/photo-1586201375761-83865001e78e?auto=format&fit=crop&w=500&q=60', // Supermercados
    name: 'Supermercados',
  },
  {
    img: 'https://images.unsplash.com/photo-1580281657521-6bfc0f6d743d?auto=format&fit=crop&w=500&q=60', // Farmacias
    name: 'Farmacias',
  },
  {
    img: 'https://images.unsplash.com/photo-1593941707874-ef25b8e8843d?auto=format&fit=crop&w=500&q=60', // Postos de Gasolina
    name: 'Postos de Gasolina',
  },
];

export default function Home() {
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
                  <BreadcrumbPage className='line-clamp-1'>
                    Estabelecimento ((NAME)) - Funcionarios ((NAME))
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4'>
          <div className='mx-auto h-24 w-full max-w-3xl rounded-xl bg-muted/50 flex between items-center justify-between p-4'>
            {categories.map((category, index) => (
              <Categories img={category.img} name={category.name} key={index} />
            ))}
          </div>
          <div className='mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-muted/50'>
            Unidades proximas e detalhes
          </div>
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
}
