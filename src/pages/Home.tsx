import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import Answer from '../components/Answer';

interface AnswerData {
  materia: string;
  resposta: string;
  links: string[];
  informacoes_uteis: string[];
}

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState<AnswerData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (materia: string, pergunta: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/api/v1/aula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ materia, pergunta }),
      });

      if (!response.ok) {
        throw new Error('Algo deu errado. Por favor, tente novamente.');
      }

      const data = await response.json();
      setAnswer(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar sua pergunta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
      <main 
        className="container max-w-3xl px-4 py-8"
        id="content"
        tabIndex={-1}
        role="main"
        aria-label="Conteúdo principal"
      >
        <h1 
          className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
          role="heading"
          aria-level={1}
        >
          Assistente de Aprendizagem
        </h1>

        <QuestionForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          aria-label="Formulário de perguntas"
        />

        {error && (
          <div 
            role="alert"
            aria-live="polite"
            className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
          >
            {error}
          </div>
        )}

        {answer && (
          <div 
            className="mt-8"
            role="region"
            aria-label="Resposta"
          >
            <Answer {...answer} />
          </div>
        )}

        {isLoading && (
          <div 
            role="status"
            aria-live="polite"
            className="mt-6 text-center"
          >
            Processando sua pergunta...
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;