# chat-gemini

Chat de terminal em TypeScript que conversa com a **API do Google Gemini**. Você digita
uma pergunta, ele manda pra API e mostra a resposta. Como guarda o histórico da conversa,
dá pra fazer perguntas em sequência que o modelo lembra do que já foi dito.

Fiz esse projeto pra aprender a consumir a API de uma LLM na prática: montar a requisição,
mandar o histórico no formato certo e tratar a resposta (e os erros) com tipagem.

## Como usar

Instala as dependências:

```bash
npm install
```

Pega uma chave gratuita no [Google AI Studio](https://aistudio.google.com/apikey),
copia o `.env.example` para `.env` e coloca a chave lá:

```
GEMINI_API_KEY=sua_chave_aqui
```

Roda:

```bash
npm run dev
```

Aí é só conversar. Digite `sair` pra encerrar.

```
Chat com o Gemini (digite "sair" para encerrar)

Você: me explica o que é uma API REST em uma frase
Gemini: É um jeito de dois sistemas conversarem pela internet usando HTTP...

Você: sair
Até mais!
```

## Como funciona por dentro

- `src/gemini.ts` — monta a requisição e chama o endpoint `generateContent` do Gemini
- `src/index.ts` — o loop do chat no terminal (lê a pergunta, guarda no histórico, mostra a resposta)
- `src/types.ts` — os tipos do formato de conversa e da resposta da API

A chave fica no `.env` (que está no `.gitignore`), então não vai pro repositório.
Por padrão usa o modelo `gemini-1.5-flash`, mas dá pra trocar pela variável `GEMINI_MODEL`.
