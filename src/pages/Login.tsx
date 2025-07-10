import React from 'react';
import FormLogin from '@/components/formLogin';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground text-center">
            Entrar
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Faça login na sua conta
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <FormLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
