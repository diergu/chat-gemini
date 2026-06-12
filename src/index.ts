import 'dotenv/config';
import * as readline from 'node:readline';
import { gerarResposta } from './gemini';
import { Conteudo } from './types';

// guarda a conversa toda pra API ter contexto das perguntas anteriores
const historico: Conteudo[] = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function perguntar(): void {
  rl.question('\nVocê: ', async (entrada) => {
    const pergunta = entrada.trim();

    if (pergunta === '') {
      perguntar();
      return;
    }

    if (pergunta.toLowerCase() === 'sair') {
      console.log('Até mais!');
      rl.close();
      return;
    }

    historico.push({ role: 'user', parts: [{ text: pergunta }] });

    try {
      const resposta = await gerarResposta(historico);
      historico.push({ role: 'model', parts: [{ text: resposta }] });
      console.log(`\nGemini: ${resposta}`);
    } catch (erro) {
      console.error(`\n${(erro as Error).message}`);
      historico.pop(); // remove a pergunta que falhou pra não bagunçar o histórico
    }

    perguntar();
  });
}

console.log('Chat com o Gemini (digite "sair" para encerrar)');
perguntar();
