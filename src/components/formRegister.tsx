"use client";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Formato de email inválido." }),
  password: z
    .string()
    .min(8, { message: "A senha deve ter pelo menos 8 caracteres." })
    .regex(/(?=.*[A-Z])/, {
      message: "A senha deve incluir pelo menos uma letra maiúscula.",
    })
    .regex(/(?=.*\d)/, {
      message: "A senha deve incluir pelo menos um número.",
    }),
  permission: z.enum(["ADMIN", "PROFISSIONAL"], {
    errorMap: () => ({ message: "Selecione uma permissão válida." }),
  }),
});

export default function FormRegister() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      permission: "ADMIN",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password, permission } = values;

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role: permission }),
      });

      if (!response.ok) {
        throw new Error("Erro no registro");
      }

      const data = await response.json();
      // Caso receba um token ou outra confirmação, redirecione conforme necessário
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        router.push("/");
      }
    } catch (err: any) {
      console.error(err);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome" {...field} />
              </FormControl>
              <FormDescription>Informe seu nome completo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormDescription>Adicione seu email de usuário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Sua senha" {...field} />
              </FormControl>
              <FormDescription>Adicione sua senha de usuário.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <FormControl>
                <select {...field} className="border p-2 rounded">
                  <option value="ADMIN">Admin</option>
                  <option value="PROFISSIONAL">Profissional</option>
                </select>
              </FormControl>
              <FormDescription>
                Selecione a permissão do usuário.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Registrar</Button>
      </form>
    </Form>
  );
}
