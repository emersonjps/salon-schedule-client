import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Redirecionando...
        </h1>
        <p className="text-lg text-muted-foreground">
          Aguarde um momento...
        </p>
      </div>
    </div>
  );
};

export default Home;
