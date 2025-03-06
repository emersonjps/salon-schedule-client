"use client";

import FormLogin from "@/components/formLogin";
import FormRegister from "@/components/formRegister";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";

export default function Login() {
  const [register, setRegister] = useState(false);

  return (
    <main className="flex flex-row">
      <div className="bg-slate-700 w-2/3"></div>
      {!register ? (
        <div className="flex flex-col justify-center items-start h-screen w-1/3 pl-8 pr-8">
          <FormLogin />

          <div className="mt-10">
            <Label>Não possui uma conta?</Label>
            <Button variant="ghost" onClick={() => setRegister(true)}>
              Registre-se
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-start h-screen w-1/3 pl-8 pr-8">
          <FormRegister />

          <div className="mt-10">
            <Label>Deseja voltar?</Label>
            <Button variant="ghost" onClick={() => setRegister(false)}>
              Login
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
