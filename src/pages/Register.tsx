import React from 'react';
import FormRegister from '@/components/formRegister';

const Register: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-foreground text-center">
            Criar Conta
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Registre-se para começar a usar o Belezou
          </p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <FormRegister />
        </div>
      </div>
    </div>
  );
};

export default Register;
