import { Conteudo, RespostaGemini } from './types';

const MODELO = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash';
const URL_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

// manda o histórico da conversa pra API do Gemini e devolve o texto da resposta
export async function gerarResposta(historico: Conteudo[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Defina a GEMINI_API_KEY no arquivo .env (veja o .env.example)');
  }

  const url = `${URL_BASE}/${MODELO}:generateContent?key=${apiKey}`;

  const resposta = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: historico })
  });

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`Erro na API do Gemini (${resposta.status}): ${detalhe}`);
  }

  const dados = (await resposta.json()) as RespostaGemini;
  const texto = dados.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!texto) {
    throw new Error('A API não retornou nenhum texto.');
  }

  return texto.trim();
}
