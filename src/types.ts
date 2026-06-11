export interface Parte {
  text: string;
}

// formato que a API do Gemini usa em cada mensagem da conversa
export interface Conteudo {
  role: 'user' | 'model';
  parts: Parte[];
}

// só a parte da resposta que a gente usa
export interface RespostaGemini {
  candidates?: {
    content?: {
      parts?: Parte[];
    };
  }[];
}
