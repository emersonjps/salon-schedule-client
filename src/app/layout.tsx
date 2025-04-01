import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Belezou',
  description: 'Agende seus serviços de beleza de forma rápida e sem complicação. Com o Belezou, você encontra os melhores profissionais, escolhe o horário ideal e garante seu atendimento com poucos cliques. Simples, fácil e do jeito que você gosta!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        {children}
        <Toaster position='top-center' />
      </body>
    </html>
  );
}
