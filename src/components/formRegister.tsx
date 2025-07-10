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
  role: z.enum(['ADMIN', 'PROFISSIONAL'], {
    errorMap: () => ({ message: 'Selecione uma permissão válida.' }),
  }),
});

export default function FormRegister() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'ADMIN',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password, role } = values;

    try {
      const response = await register({ name, email, password, role });

      if (!response.ok) {
        throw new Error('Erro no registro');
      }

      const data = await response.json();

      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token);
        navigate('/dashboard');
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Seu nome completo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email@example.com' {...field} />
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
                <Input type='password' placeholder='Sua senha' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <FormControl>
                <select {...field} className='ml-5 p-2'>
                  <option value='ADMIN'>Admin</option>
                  <option value='PROFISSIONAL'>Profissional</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>Criar conta</Button>
        <p className='text-sm text-muted-foreground'>
          Já tem uma conta? <Link to='/login'>Faça login</Link>
        </p>
      </form>
    </Form>
  );
}
