'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';
import { login } from '@/api/auth';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  email: z.string().email({
    message: 'Formato de email inválido.',
  }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
});

export default function FormLogin() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    try {
      const response = await login({ email, password });

      if (!response) {
        toast.error('Credenciais inválidas');
        throw new Error('Credenciais inválidas');
      }

      toast.success('Login efetuado com sucesso');

      if (response.access_token) {
        document.cookie = `access_token=${response.access_token}`;
        router.push('/home');
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <Label className='text-gray-900 text-center text-2xl mb-12'>Entrar em Belezou</Label>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full flex flex-col gap-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='bg-gray-100 rounded-3xl h-[50px]' type='email' placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='bg-gray-100 rounded-3xl h-[50px]' type='password' placeholder='Senha' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-between text-sm text-gray-900'>
            <div className='flex items-center gap-2'>
              <Checkbox id='remember' className='rounded-full' />
              <Label htmlFor='remember'>Lembrar-me</Label>
            </div>

            <Link href='/forgot-password' className='underline'>Esqueceu sua senha?</Link>
          </div>

          <Button className='bg-orange-500 text-white rounded-3xl h-[50px] w-full' type='submit'>Login</Button>

          <div className='flex items-center gap-4'>
            <Separator className='flex-1' />
            <span className='text-muted-foreground text-sm'>Ou faça login com</span>
            <Separator className='flex-1' />
          </div>
        </form>
      </Form>
    </div>
  );
}
