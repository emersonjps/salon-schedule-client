'use client';

import FormLogin from '@/components/formLogin';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <main className='flex flex-row'>
      <div className='bg-slate-700 w-2/3'></div>
        <div className='flex flex-col justify-center items-start h-screen w-1/3 pl-8 pr-8'>
          <FormLogin />

          <div className='mt-10 flex items-center justify-center w-full text-center gap-2'>
            <Label>Não possui uma conta?</Label>
            <Button variant='ghost' className='text-orange-600 text-md p-0 px-1' onClick={() => router.push('/register')}>
              Registre-se
            </Button>
          </div>
      </div>
    </main>
  );
}
