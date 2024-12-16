import React, { useState } from 'react';

interface QuestionFormProps {
  onSubmit: (materia: string, pergunta: string) => void;
  isLoading: boolean;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onSubmit, isLoading }) => {
  const [materia, setMateria] = useState('');
  const [pergunta, setPergunta] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(materia, pergunta);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6"
      role="form"
      aria-label="Formulário de perguntas educacionais"
    >
      <div className="space-y-4">
        <label 
          htmlFor="materia"
          className="block text-xl font-medium text-gray-700 dark:text-gray-200"
        >
          Escolha a matéria que você quer aprender
        </label>
        <select
          id="materia"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          className="w-full p-4 text-lg border rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
          aria-required="true"
          aria-describedby="materia-help"
        >
          <option value="">Selecione uma matéria</option>
          <option value="Matemática">Matemática</option>
          <option value="Português">Português</option>
          <option value="Ciências">Ciências</option>
          <option value="História">História</option>
          <option value="Geografia">Geografia</option>
          <option value="Inglês">Inglês</option>
          <option value="Artes">Artes</option>
        </select>
        <p id="materia-help" className="text-sm text-gray-600 dark:text-gray-400">
          Escolha a matéria que você tem dúvidas para receber ajuda personalizada
        </p>
      </div>

      <div className="space-y-4">
        <label 
          htmlFor="pergunta"
          className="block text-xl font-medium text-gray-700 dark:text-gray-200"
        >
          Qual é a sua dúvida?
        </label>
        <textarea
          id="pergunta"
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          className="w-full p-4 text-lg border rounded-lg focus:ring-4 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          rows={5}
          required
          aria-required="true"
          aria-describedby="pergunta-help"
          placeholder="Digite sua pergunta aqui... Seja específico para receber uma resposta mais precisa"
        />
        <p id="pergunta-help" className="text-sm text-gray-600 dark:text-gray-400">
          Escreva sua dúvida de forma clara. Quanto mais detalhes você fornecer, melhor será a resposta
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 px-6 text-xl font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:outline-none disabled:opacity-50 transition-colors"
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Gerando resposta...
          </span>
        ) : (
          'Enviar pergunta'
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Pressione Enter para enviar ou use o botão acima
        </p>
      </div>
    </form>
  );
};

export default QuestionForm;