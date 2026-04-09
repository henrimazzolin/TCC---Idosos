document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const speakLastBtn = document.getElementById('speakLastBtn');

    let speechSynthesis = window.speechSynthesis;
    let lastAssistantMessage = '';
    let isSpeaking = false;

    // Função para falar o texto em voz alta
    function falar(texto) {
        // Interrompe qualquer fala anterior
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = function() {
            isSpeaking = true;
        };

        utterance.onend = function() {
            isSpeaking = false;
        };

        utterance.onerror = function() {
            isSpeaking = false;
        };

        speechSynthesis.speak(utterance);
    }

    // Função para interromper a fala
    function pararFala() {
        if (speechSynthesis.speaking) {
            speechSynthesis.cancel();
            isSpeaking = false;
        }
    }

    // Adicionar mensagem ao chat
    function addMessage(content, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;

        const avatar = isUser ? '👤' : '🤖';
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${content}</p>
            </div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Salva a última mensagem do assistente para poder ler depois
        if (!isUser) {
            lastAssistantMessage = content;
        }
    }

    // Mostrar indicador de digitação
    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing';
        typingDiv.id = 'typingIndicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remover indicador de digitação
    function hideTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Enviar pergunta para a API
    async function sendQuestion() {
        const pergunta = userInput.value.trim();
        
        if (!pergunta) {
            return;
        }

        // Adicionar pergunta do usuário
        addMessage(pergunta, true);
        userInput.value = '';
        
        // Desabilitar botão enquanto carrega
        sendBtn.disabled = true;
        userInput.disabled = true;

        // Mostrar indicador de digitação
        showTyping();

        try {
            const response = await fetch('http://localhost:3000/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pergunta })
            });

            if (!response.ok) {
                throw new Error('Erro na comunicação');
            }

            const data = await response.json();
            
            // Remover indicador de digitação
            hideTyping();

            // Adicionar resposta do assistente
            addMessage(data.resposta, false);

            // Falar a resposta em voz alta
            falar(data.resposta);

        } catch (error) {
            // Remover indicador de digitação
            hideTyping();

            // Mostrar mensagem de erro
            addMessage('Desculpe, não consegui responder agora. Verifique se o servidor está ligado e tente novamente.', false);
            console.error('Erro:', error);
        }

        // Reabilitar botão e input
        sendBtn.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }

    // Limpar o chat
    function clearChat() {
        // Interromper qualquer fala
        pararFala();
        
        // Limpar mensagens
        chatMessages.innerHTML = '';
        
        // Adicionar mensagem inicial
        addMessage('Olá! Eu sou o assistente virtual do Mente Ativa. Posso ajudar você com dúvidas sobre o site, jogos, exercícios e muito mais. Digite sua pergunta abaixo!', false);
        
        // Limpar última mensagem salva
        lastAssistantMessage = '';
    }

    // Ler a última mensagem do assistente
    function speakLastMessage() {
        if (lastAssistantMessage) {
            falar(lastAssistantMessage);
        } else {
            // Se não houver mensagem, fala a última do chat
            const messages = chatMessages.querySelectorAll('.message.assistant');
            if (messages.length > 0) {
                const lastMsg = messages[messages.length - 1];
                const text = lastMsg.querySelector('p').textContent;
                lastAssistantMessage = text;
                falar(text);
            }
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendQuestion);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendQuestion();
        }
    });

    clearBtn.addEventListener('click', clearChat);
    speakLastBtn.addEventListener('click', speakLastMessage);

    // Adicionar eventos aos exemplos de perguntas
    document.querySelectorAll('.help-box li').forEach(function(li) {
        li.addEventListener('click', function() {
            const question = this.textContent;
            userInput.value = question;
            sendQuestion();
        });
    });

    // Focar no input ao carregar a página
    userInput.focus();
});