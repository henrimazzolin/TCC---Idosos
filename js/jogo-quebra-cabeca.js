document.addEventListener('DOMContentLoaded', function() {
        const imageUrl = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop';
        const gridSize = 3;
        const totalPieces = gridSize * gridSize;
        
        let pieces = [];
        let selectedPiece = null;
        let isProcessing = false;

        function shuffleArray(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function initGame() {
            closeMessage();
            selectedPiece = null;
            isProcessing = false;

            pieces = [];
            for (let i = 0; i < totalPieces; i++) {
                pieces.push(i);
            }

            do {
                pieces = shuffleArray(pieces);
            } while (isSolved());

            renderPuzzle();
        }

        function isSolved() {
            for (let i = 0; i < totalPieces; i++) {
                if (pieces[i] !== i) return false;
            }
            return true;
        }

        function renderPuzzle() {
            const container = document.getElementById('puzzleContainer');
            container.innerHTML = '';

            pieces.forEach((pieceIndex, positionIndex) => {
                const piece = document.createElement('div');
                piece.className = 'puzzle-piece';
                piece.dataset.position = positionIndex;
                piece.dataset.piece = pieceIndex;

                const row = Math.floor(pieceIndex / gridSize);
                const col = pieceIndex % gridSize;
                piece.style.backgroundImage = `url(${imageUrl})`;
                piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;

                piece.addEventListener('click', () => handlePieceClick(positionIndex));

                container.appendChild(piece);
            });
        }

        function handlePieceClick(positionIndex) {
            if (isProcessing) return;

            const clickedPiece = document.querySelector(`.puzzle-piece[data-position="${positionIndex}"]`);

            if (selectedPiece === null) {
                selectedPiece = positionIndex;
                clickedPiece.classList.add('selected');
            } else if (selectedPiece === positionIndex) {
                clickedPiece.classList.remove('selected');
                selectedPiece = null;
            } else {
                isProcessing = true;
                
                const firstPiece = document.querySelector(`.puzzle-piece[data-position="${selectedPiece}"]`);
                firstPiece.classList.remove('selected');

                swapPieces(selectedPiece, positionIndex);

                setTimeout(() => {
                    selectedPiece = null;
                    isProcessing = false;

                    if (isSolved()) {
                        showWinMessage();
                    }
                }, 300);
            }
        }

        function swapPieces(pos1, pos2) {
            const temp = pieces[pos1];
            pieces[pos1] = pieces[pos2];
            pieces[pos2] = temp;

            renderPuzzle();
        }

        function showWinMessage() {
            document.getElementById('overlay').classList.add('show');
            document.getElementById('message').classList.add('show');
        }

        function closeMessage() {
            document.getElementById('overlay').classList.remove('show');
            document.getElementById('message').classList.remove('show');
        }

        // Event listeners
        document.getElementById('btn-restart').addEventListener('click', initGame);
        document.getElementById('btn-back').addEventListener('click', function() { window.location.href = 'grupo-moderado.html'; });
        document.getElementById('btn-play-again').addEventListener('click', initGame);
        document.getElementById('overlay').addEventListener('click', closeMessage);

        initGame();
});