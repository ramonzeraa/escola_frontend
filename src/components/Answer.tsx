import React from 'react';

interface AnswerProps {
  materia: string;
  resposta: string;
  links: string[];
  informacoes_uteis: string[];
}

const Answer: React.FC<AnswerProps> = ({ materia, resposta, links, informacoes_uteis }) => {
  // Função para formatar links mais amigáveis
  const formatLink = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1);
    } catch {
      return url;
    }
  };

  return (
    <article 
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-8"
      role="article"
      aria-labelledby="answer-title"
    >
      <header>
        <h2 
          id="answer-title"
          className="text-3xl font-bold text-gray-800 dark:text-white mb-4"
        >
          Resposta sobre {materia}
        </h2>
        <div className="h-1 w-20 bg-blue-500 rounded"></div>
      </header>

      <div 
        className="prose dark:prose-invert max-w-none"
        role="region"
        aria-label="Explicação principal"
      >
        <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
          {resposta}
        </div>
      </div>

      <section 
        className="space-y-6 bg-blue-50 dark:bg-gray-700 p-6 rounded-lg"
        role="region"
        aria-labelledby="resources-title"
      >
        <h3 
          id="resources-title"
          className="text-2xl font-semibold text-gray-800 dark:text-white"
        >
          Recursos adicionais
        </h3>
        
        <div className="space-y-6">
          <div role="region" aria-labelledby="links-title">
            <h4 
              id="links-title"
              className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Links úteis para aprofundar seus estudos
            </h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-600 rounded-lg text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-500 focus:ring-4 focus:ring-blue-500 focus:outline-none transition-colors"
                    aria-label={`Abrir ${formatLink(link)} em nova aba`}
                  >
                    <span className="mr-2">{formatLink(link)}</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div role="region" aria-labelledby="tips-title">
            <h4 
              id="tips-title"
              className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Dicas para melhor aprendizado
            </h4>
            <ul className="space-y-3 list-disc pl-5">
              {informacoes_uteis.map((info, index) => (
                <li 
                  key={index} 
                  className="text-gray-600 dark:text-gray-400 text-lg"
                >
                  {info}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none transition-colors"
            aria-label="Imprimir esta resposta"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir
          </button>
          
          <button
            onClick={() => window.navigator.share?.({
              title: `Resposta sobre ${materia}`,
              text: resposta,
              url: window.location.href
            })}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:outline-none transition-colors"
            aria-label="Compartilhar esta resposta"
          >
            <svg 
              className="w-4 h-4 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Compartilhar
          </button>
        </div>
      </footer>
    </article>
  );
};

export default Answer;