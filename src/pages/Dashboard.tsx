import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Agendamentos
            </h3>
            <p className="text-muted-foreground">
              Gerencie seus agendamentos
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Serviços
            </h3>
            <p className="text-muted-foreground">
              Visualize seus serviços
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Perfil
            </h3>
            <p className="text-muted-foreground">
              Atualize suas informações
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
