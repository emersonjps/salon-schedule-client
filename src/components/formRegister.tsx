'use client';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { register } from '@/api/auth';

const formSchema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório.' }),
  email: z.string().email({ message: 'Formato de email inválido.' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .regex(/(?=.*[A-Z])/, {
      message: 'A senha deve incluir pelo menos uma letra maiúscula.',
    })
    .regex(/(?=.*\d)/, {
      message: 'A senha deve incluir pelo menos um número.',
    }),
});

export default function FormRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;

    try {
      const response = await register({ name, email, password, role: 'CLIENT' });

      if (!response) {
        throw new Error('Erro no registro');
      }

      router.push('/login');
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full flex flex-col gap-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='bg-gray-100 rounded-3xl h-[50px]' placeholder='Seu nome' {...field} />
              </FormControl>
              <FormDescription>Informe seu nome completo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input className='bg-gray-100 rounded-3xl h-[50px]' placeholder='email@example.com' {...field} />
              </FormControl>
              <FormDescription>Adicione seu email de usuário.</FormDescription>
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
                <Input className='bg-gray-100 rounded-3xl h-[50px]' type='password' placeholder='Sua senha' {...field} />
              </FormControl>
              <FormDescription>Adicione sua senha de usuário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='bg-orange-500 text-white rounded-3xl h-[50px] w-full' type='submit'>Registrar</Button>
      </form>
    </Form>
  );
}
