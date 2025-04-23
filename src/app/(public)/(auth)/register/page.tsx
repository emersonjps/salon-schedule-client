'use client';

import FormRegister from '@/components/formRegister';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  return (
    <div className='flex flex-col justify-center items-start h-screen w-1/3 pl-8 pr-8'>
      <FormRegister />
        <div className='mt-10'>
          <Label>Deseja voltar?</Label>
          <Button variant='ghost' onClick={() => router.push('/login')}>
            Login
          </Button>
        </div>
    </div>
  );
}