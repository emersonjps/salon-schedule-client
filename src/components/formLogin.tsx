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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { login } from '@/api/auth';

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
        localStorage.setItem('access_token', response.access_token);
        router.push('/home');
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 w-full'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email' {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder='senha' {...field} />
              </FormControl>
              <FormDescription>Adicione sua senha de usuário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Login</Button>
      </form>
    </Form>
  );
}
