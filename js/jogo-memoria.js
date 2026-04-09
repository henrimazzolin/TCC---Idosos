document.addEventListener('DOMContentLoaded', function() {
        const icons = [
            '<svg viewBox="0 0 24 24"><path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-2H3v2zm0-4h8v-2H3v2z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
            '<svg viewBox="0 0 24 24"><path d="M11.5 22C11.64 22 11.77 22 11.9 22.01L12 22c.01-.05.02-.09.04-.14.07-.16.14-.32.24-.47.05-.08.11-.17.18-.25.15-.18.32-.34.51-.49.06-.05.13-.1.2-.14.2-.11.41-.19.64-.25.1-.02.2-.05.3-.06.24-.03.48-.03.71-.01.1.01.2.02.3.05.02 0 .03.01.05.01l-.01-.01c.23.05.45.12.66.23.08.04.16.1.23.15.15.11.29.24.41.38.05.06.1.13.14.2.09.15.16.31.22.47 0 .02.01.03.01.05l-.01-.01c.05.15.08.31.1.47.01.07.01.13.01.2 0 .03-.01.06-.01.1l-.01-.01c0 .03 0 .06-.01.09z"/></svg>'
        ];

        let cards = [];
        let flippedCards = [];
        let matchedPairs = 0;
        let attempts = 0;
        let isLocked = false;

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function initGame() {
            const board = document.getElementById('gameBoard');
            board.innerHTML = '';
            
            cards = shuffleArray([...icons, ...icons]);
            
            flippedCards = [];
            matchedPairs = 0;
            attempts = 0;
            isLocked = false;
            
            document.getElementById('pairs').textContent = '0';
            document.getElementById('attempts').textContent = '0';
            
            cards.forEach((icon, index) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.dataset.index = index;
                card.dataset.icon = icon;
                card.innerHTML = `<div class="card-icon">${icon}</div>`;
                card.addEventListener('click', () => flipCard(card));
                board.appendChild(card);
            });
        }

        function flipCard(card) {
            if (isLocked) return;
            if (card.classList.contains('flipped')) return;
            if (card.classList.contains('matched')) return;
            if (flippedCards.length >= 2) return;
            
            card.classList.add('flipped');
            flippedCards.push(card);
            
            if (flippedCards.length === 2) {
                attempts++;
                document.getElementById('attempts').textContent = attempts;
                checkMatch();
            }
        }

        function checkMatch() {
            isLocked = true;
            
            const [card1, card2] = flippedCards;
            const icon1 = card1.dataset.icon;
            const icon2 = card2.dataset.icon;
            
            if (icon1 === icon2) {
                setTimeout(() => {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    document.getElementById('pairs').textContent = matchedPairs;
                    
                    flippedCards = [];
                    isLocked = false;
                    
                    if (matchedPairs === 8) {
                        setTimeout(() => {
                            showWinMessage();
                        }, 500);
                    }
                }, 400);
            } else {
                setTimeout(() => {
                    card1.classList.remove('flipped');
                    card2.classList.remove('flipped');
                    flippedCards = [];
                    isLocked = false;
                }, 1000);
            }
        }

        function showWinMessage() {
            const overlay = document.getElementById('overlay');
            const feedback = document.getElementById('feedback');
            const feedbackIcon = document.getElementById('feedbackIcon');
            const feedbackTitle = document.getElementById('feedbackTitle');
            const feedbackText = document.getElementById('feedbackText');
            const feedbackBtn = document.getElementById('feedbackBtn');
            
            feedbackIcon.className = 'feedback-icon success';
            feedbackIcon.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
            
            feedbackTitle.textContent = 'Parabéns!';
            feedbackText.textContent = `Você encontrou todos os pares em ${attempts} tentativas!`;
            feedbackBtn.textContent = 'Jogar Novamente';
            feedbackBtn.onclick = () => {
                hideFeedback();
                initGame();
            };
            
            overlay.classList.add('show');
            feedback.classList.add('show');
        }

        function hideFeedback() {
            document.getElementById('overlay').classList.remove('show');
            document.getElementById('feedback').classList.remove('show');
        }

        // Event listeners
        document.getElementById('btn-restart').addEventListener('click', initGame);
        document.getElementById('btn-back').addEventListener('click', function() { window.location.href = 'grupo-moderado.html'; });
        document.getElementById('feedbackBtn').addEventListener('click', hideFeedback);
        document.getElementById('overlay').addEventListener('click', hideFeedback);

        initGame();
});