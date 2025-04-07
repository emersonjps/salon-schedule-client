'use client';

import FormRegister from '@/components/formRegister';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  return (
    <main className='flex flex-row'>
      <div className='bg-slate-700 w-2/3'></div>
        <div className='flex flex-col justify-center items-start h-screen w-1/3 pl-8 pr-8'>
          <FormRegister />

          <div className='mt-10 flex items-center justify-center w-full text-center gap-2'>
            <Label>Já possui uma conta?</Label>

            <Button variant='ghost' className='text-orange-600 text-md p-0 px-1' onClick={() => router.push('/login')}>
              Login
            </Button>
          </div>
      </div>
    </main>
  );
}