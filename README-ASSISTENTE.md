# Como configurar e executar o Assistente Virtual

## 1. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

## 2. Configurar a chave da API

Abra o arquivo `.env` e substitua `sua_chave_aqui` pela sua chave da API da OpenAI:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Para obter uma chave da API:
1. Acesse https://platform.openai.com/
2. Crie uma conta ou faça login
3. Vá em API Keys
4. Crie uma nova chave

## 3. Iniciar o servidor

No terminal, execute:

```bash
npm start
```

O servidorará em: http://localhost:3000

## 4. Acessar o assistente

Abra o navegador e vá para:
- http://localhost:3000/assistente.html
- Ou clique em "Assistente" no menu do site

## Funcionalidades

✅ Interface de chat simples e acessível
✅ Botões grandes e texto legível
✅ Respostas em português brasileiro
✅ Leitura em voz alta das respostas (text-to-speech)
✅ Exemplo de perguntas para idosos
✅ Botão para limpar o chat
✅ Botão para repetir a última mensagem
✅ Scroll automático das mensagens
✅ Sistema de "digitando..." durante o carregamento

## Arquivos criados

- `server.js` - Servidor Node.js com Express
- `package.json` - Dependências do projeto
- `.env` - Variáveis de ambiente (coloque sua API key aqui)
- `assistente.html` - Interface do chat
- `css/assistente.css` - Estilos do assistente
- `js/assistente.js` - Lógica do frontend

## Dica

Para testar rapidamente, você pode usar o comando:

```bash
node server.js
```