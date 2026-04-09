// Mente Ativa - Acessibilidade e Text-to-Speech

// Configuração da voz em português
const VOZ_PORTUGUES = 'pt-BR';

// Variável para controlar se está lendo
let estaLendo = false;

// Inicializar síntese de voz
function falar(texto) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = VOZ_PORTUGUES;
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Tentar encontrar voz em português
        const vozes = window.speechSynthesis.getVoices();
        const vozPortuguesa = vozes.find(v => v.lang.includes('pt')) || vozes[0];
        if (vozPortuguesa) {
            utterance.voice = vozPortuguesa;
        }
        
        utterance.onstart = () => {
            estaLendo = true;
            atualizarBotoesTTS(true);
        };
        
        utterance.onend = () => {
            estaLendo = false;
            atualizarBotoesTTS(false);
        };
        
        utterance.onerror = () => {
            estaLendo = false;
            atualizarBotoesTTS(false);
        };
        
        window.speechSynthesis.speak(utterance);
    }
}

// Parar leitura
function pararLeitura() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        estaLendo = false;
        atualizarBotoesTTS(false);
    }
}

// Toggle leitura
function toggleLeitura(texto, botao) {
    if (estaLendo) {
        pararLeitura();
    } else {
        if (!botao && typeof event !== 'undefined' && event && event.target) {
            botao = event.target.closest('.tts-btn');
        }
        falar(texto);
    }
}

// Atualizar todos os botões TTS
function atualizarBotoesTTS(ativo) {
    document.querySelectorAll('.tts-btn').forEach(btn => {
        if (ativo) {
            btn.classList.add('lendo');
            btn.setAttribute('aria-label', 'Pausar leitura');
        } else {
            btn.classList.remove('lendo');
            btn.setAttribute('aria-label', 'Ouvir texto');
        }
    });
}

// Criar botão TTS
function criarBotaoTTS(texto) {
    const botao = document.createElement('button');
    botao.className = 'tts-btn';
    botao.type = 'button';
    botao.setAttribute('aria-label', 'Ouvir texto');
    botao.setAttribute('title', 'Clique para ouvir este texto');
    botao.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
    `;
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleLeitura(texto, botao);
    });
    return botao;
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.onvoiceschanged = () => {
            window.speechSynthesis.getVoices();
        };
    }
});
