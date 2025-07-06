import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '700'], // ajuste conforme necessário
  variable: '--font-inter',
  display: 'swap',
});

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
        <Toaster position='top-center' />
        {children}
      </body>
    </html>
  );
}
