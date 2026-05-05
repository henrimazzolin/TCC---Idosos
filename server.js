import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Não logar a API key por segurança
if (!process.env.OPENROUTER_API_KEY) {
    console.warn('AVISO: OPENROUTER_API_KEY não configurada no .env');
}

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Validar se a mensagem existe e não está vazia
        if (!message || message.trim() === '') {
            return res.status(400).json({ reply: 'Por favor, digite uma mensagem.' });
        }

        console.log('Mensagem recebida:', message.substring(0, 50) + '...');

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Responda de forma breve, simples e acolhedora, adequada para idosos."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json().catch(() => null);

        if (!response.ok || !data || !data.choices || !data.choices[0]) {
            console.error("Erro da API OpenRouter:", data || response.status);
            return res.status(500).json({ reply: "Erro ao processar sua mensagem. Tente novamente." });
        }

        const reply = data.choices[0].message.content;

        console.log('Resposta enviada com sucesso');

        res.json({ reply });

    } catch (error) {
        console.error('Erro no servidor:', error.message);
        res.status(500).json({ reply: 'Erro interno. Verifique sua conexão e tente novamente.' });
    }
});

// Rota de teste para verificar se o servidor está online
app.get('/test', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
