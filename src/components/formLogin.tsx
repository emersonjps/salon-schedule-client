'use client';

import { Link, useNavigate } from 'react-router-dom';
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
import Cookies from 'js-cookie';

const formSchema = z.object({
  email: z.string().email({
    message: 'Formato de email inválido.',
  }),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' }),
});

export default function FormLogin() {
  const navigate = useNavigate();

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
        return;
      }

      if (response.access_token) {
        toast.success('Login efetuado com sucesso');
        localStorage.setItem('access_token', response.access_token);
        Cookies.set('authToken', response.access_token, { expires: 7 });
        navigate('/dashboard');
      } else {
        toast.error('Credenciais inválidas');
      }
    } catch (err: any) {
      if (err?.response?.data?.message) {
        toast.error(`Erro: ${err.response.data.message}`);
        return;
      }
      toast.error('Erro ao fazer login. Tente novamente.');
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
                <Input placeholder='Digite seu email' {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Digite sua senha' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Entrar</Button>
        <p className='text-sm text-muted-foreground'>
          Não tem uma conta? <Link to='/register'>Registre-se</Link>
        </p>
      </form>
    </Form>
  );
}
