document.addEventListener('DOMContentLoaded', function() {
        const wordPairs = [
            { left: 'Sol', right: 'Calor' },
            { left: 'Noite', right: 'Lua' },
            { left: 'Água', right: 'Sede' },
            { left: 'Pão', right: 'Fome' },
            { left: 'Cama', right: 'Sono' },
            { left: 'Chuva', right: 'Guarda-chuva' },
            { left: 'Dor', right: 'Médico' },
            { left: 'Escola', right: 'Professora' },
            { left: 'Natal', right: 'Presente' },
            { left: 'Fogo', right: 'Queimado' },
            { left: 'Cão', right: 'Latido' },
            { left: 'Gato', right: 'Miado' }
        ];

        let currentPairs = [];
        let selectedLeftCard = null;
        let selectedLeftWord = null;
        let matchedPairs = 0;
        let correctCount = 0;
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
            matchedPairs = 0;
            correctCount = 0;
            isLocked = false;
            selectedLeftCard = null;
            selectedLeftWord = null;
            
            document.getElementById('correct').textContent = '0';
            document.getElementById('pairs').textContent = '0/4';
            
            const leftContainer = document.getElementById('leftWords');
            const rightContainer = document.getElementById('rightWords');
            
            leftContainer.innerHTML = '';
            rightContainer.innerHTML = '';
            
            currentPairs = shuffleArray(wordPairs).slice(0, 4);
            
            const shuffledRight = shuffleArray([...currentPairs]);
            
            currentPairs.forEach((pair, index) => {
                const card = document.createElement('div');
                card.className = 'word-card';
                card.textContent = pair.left;
                card.dataset.word = pair.left;
                card.dataset.pairIndex = index;
                card.addEventListener('click', () => selectLeftCard(card));
                leftContainer.appendChild(card);
            });
            
            shuffledRight.forEach((pair, index) => {
                const card = document.createElement('div');
                card.className = 'word-card';
                card.textContent = pair.right;
                card.dataset.word = pair.right;
                card.dataset.pairIndex = currentPairs.findIndex(p => p.right === pair.right);
                card.addEventListener('click', () => selectRightCard(card));
                rightContainer.appendChild(card);
            });
        }

        function selectLeftCard(card) {
            if (isLocked) return;
            if (card.classList.contains('matched')) return;
            
            document.querySelectorAll('#leftWords .word-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedLeftCard = card;
            selectedLeftWord = card.dataset.word;
        }

        function selectRightCard(card) {
            if (isLocked) return;
            if (card.classList.contains('matched')) return;
            if (!selectedLeftCard) return;
            
            isLocked = true;
            
            const leftPairIndex = parseInt(selectedLeftCard.dataset.pairIndex);
            const rightPairIndex = parseInt(card.dataset.pairIndex);
            
            if (leftPairIndex === rightPairIndex) {
                correctCount++;
                matchedPairs++;
                document.getElementById('correct').textContent = correctCount;
                document.getElementById('pairs').textContent = matchedPairs + '/4';
                
                selectedLeftCard.classList.remove('selected');
                selectedLeftCard.classList.add('matched');
                card.classList.add('matched');
                
                selectedLeftCard = null;
                selectedLeftWord = null;
                isLocked = false;
                
                if (matchedPairs === 4) {
                    setTimeout(() => {
                        showWinMessage();
                    }, 500);
                }
            } else {
                card.classList.add('wrong');
                
                setTimeout(() => {
                    card.classList.remove('wrong');
                    if (selectedLeftCard) {
                        selectedLeftCard.classList.remove('selected');
                        selectedLeftCard = null;
                        selectedLeftWord = null;
                    }
                    isLocked = false;
                }, 800);
            }
        }

        function showWinMessage() {
            document.getElementById('overlay').classList.add('show');
            document.getElementById('feedback').classList.add('show');
        }

        function restartGame() {
            document.getElementById('overlay').classList.remove('show');
            document.getElementById('feedback').classList.remove('show');
            initGame();
        }

        // Event listeners
        document.getElementById('restartBtn').addEventListener('click', restartGame);
        document.getElementById('feedbackBtn').addEventListener('click', restartGame);
        document.getElementById('overlay').addEventListener('click', restartGame);

        initGame();
});