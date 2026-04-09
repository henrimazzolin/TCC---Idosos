document.addEventListener('DOMContentLoaded', function() {
        const games = [
            {
                id: 1,
                name: "Tema: Casa",
                size: 7,
                layout: [
                    ['C', 'A', 'S', 'A', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', 'S', 'O', 'L', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', 'T', 'E', 'L', 'A', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#']
                ],
                words: [
                    { number: 1, word: 'CASA', direction: 'h', row: 0, col: 0, hint: 'Local onde moramos' },
                    { number: 2, word: 'SOL', direction: 'h', row: 2, col: 2, hint: 'Estrela que ilumina o dia' },
                    { number: 3, word: 'TELA', direction: 'h', row: 4, col: 2, hint: 'Para ver imagens' }
                ]
            },
            {
                id: 2,
                name: "Tema: Natureza",
                size: 7,
                layout: [
                    ['S', 'O', 'L', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', 'F', 'L', 'O', 'R', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', 'R', 'O', 'S', 'A', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#']
                ],
                words: [
                    { number: 1, word: 'SOL', direction: 'h', row: 0, col: 0, hint: 'Estrela que ilumina o dia' },
                    { number: 2, word: 'FLOR', direction: 'h', row: 3, col: 1, hint: 'Planta bonita' },
                    { number: 3, word: 'ROSA', direction: 'h', row: 5, col: 1, hint: 'Flor com espinhos' }
                ]
            },
            {
                id: 3,
                name: "Tema: Corpo",
                size: 7,
                layout: [
                    ['O', 'L', 'H', 'O', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', 'B', 'O', 'C', 'A', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', 'M', 'A', 'O', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#'],
                    ['#', '#', '#', '#', '#', '#', '#']
                ],
                words: [
                    { number: 1, word: 'OLHO', direction: 'h', row: 0, col: 0, hint: 'Usamos para ver' },
                    { number: 2, word: 'BOCA', direction: 'h', row: 2, col: 1, hint: 'Para comer e falar' },
                    { number: 3, word: 'MAO', direction: 'h', row: 4, col: 1, hint: 'Tem cinco dedos' }
                ]
            }
        ];

        let currentGame = null;
        let currentWord = null;
        let currentHint = null;
        let lastGameId = -1;

        function selectRandomGame() {
            let availableGames = games.filter(g => g.id !== lastGameId);
            if (availableGames.length === 0) {
                availableGames = games;
            }
            const randomIndex = Math.floor(Math.random() * availableGames.length);
            currentGame = availableGames[randomIndex];
            lastGameId = currentGame.id;
            
            document.getElementById('gameLevel').textContent = currentGame.name;
        }

        function initGame() {
            selectRandomGame();
            
            const gridEl = document.getElementById('grid');
            gridEl.innerHTML = '';
            gridEl.style.gridTemplateColumns = `repeat(${currentGame.size}, 1fr)`;

            for (let row = 0; row < currentGame.size; row++) {
                for (let col = 0; col < currentGame.size; col++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = row;
                    cell.dataset.col = col;

                    if (currentGame.layout[row][col] === '#') {
                        cell.classList.add('blocked');
                    } else {
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.maxLength = 1;
                        input.dataset.row = row;
                        input.dataset.col = col;
                        input.addEventListener('input', handleInput);
                        input.addEventListener('keydown', handleKeydown);
                        input.addEventListener('focus', handleFocus);
                        input.addEventListener('blur', handleBlur);
                        cell.appendChild(input);

                        const wordNum = getWordNumberAt(row, col);
                        if (wordNum) {
                            const numEl = document.createElement('span');
                            numEl.className = 'cell-number';
                            numEl.textContent = wordNum;
                            cell.appendChild(numEl);
                        }
                    }
                    gridEl.appendChild(cell);
                }
            }

            renderHints();
        }

        function getWordNumberAt(row, col) {
            for (const word of currentGame.words) {
                if (word.direction === 'h') {
                    if (row === word.row && col === word.col) return word.number;
                } else {
                    if (row === word.row && col === word.col) return word.number;
                }
            }
            return null;
        }

        function getWordAt(row, col) {
            for (const word of currentGame.words) {
                if (word.direction === 'h') {
                    if (row === word.row && col >= word.col && col < word.col + word.word.length) {
                        return word;
                    }
                } else {
                    if (col === word.col && row >= word.row && row < word.row + word.word.length) {
                        return word;
                    }
                }
            }
            return null;
        }

        function renderHints() {
            const hintsH = document.getElementById('hints-h');
            const hintsV = document.getElementById('hints-v');
            hintsH.innerHTML = '';
            hintsV.innerHTML = '';

            currentGame.words.filter(w => w.direction === 'h').forEach(word => {
                const hintEl = createHintElement(word);
                hintsH.appendChild(hintEl);
            });

            currentGame.words.filter(w => w.direction === 'v').forEach(word => {
                const hintEl = createHintElement(word);
                hintsV.appendChild(hintEl);
            });
        }

        function createHintElement(word) {
            const div = document.createElement('div');
            div.className = 'hint-item';
            div.dataset.word = word.number;
            div.addEventListener('click', () => selectWord(word));
            div.innerHTML = `
                <span class="hint-number">${word.number}.</span>
                <span class="hint-text">${word.hint}</span>
            `;
            return div;
        }

        function selectWord(word) {
            currentWord = word;
            document.querySelectorAll('.hint-item').forEach(el => el.classList.remove('active'));
            document.querySelector(`.hint-item[data-word="${word.number}"]`).classList.add('active');

            const firstCell = document.querySelector(`input[data-row="${word.row}"][data-col="${word.col}"]`);
            if (firstCell) {
                firstCell.focus();
            }
        }

        function handleFocus(e) {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);
            const word = getWordAt(row, col);
            
            if (word) {
                currentWord = word;
                currentHint = word.number;
                
                document.querySelectorAll('.hint-item').forEach(el => el.classList.remove('active'));
                const hintEl = document.querySelector(`.hint-item[data-word="${word.number}"]`);
                if (hintEl) {
                    hintEl.classList.add('active');
                }

                highlightWordCells(word);
            }
        }

        function handleBlur() {
            document.querySelectorAll('.cell input').forEach(input => {
                input.classList.remove('active-row');
                input.classList.remove('active-col');
            });
        }

        function highlightWordCells(word) {
            document.querySelectorAll('.cell input').forEach(input => {
                input.classList.remove('active-row');
                input.classList.remove('active-col');
            });

            for (let i = 0; i < word.word.length; i++) {
                if (word.direction === 'h') {
                    const input = document.querySelector(`input[data-row="${word.row}"][data-col="${word.col + i}"]`);
                    if (input) input.classList.add('active-row');
                } else {
                    const input = document.querySelector(`input[data-row="${word.row + i}"][data-col="${word.col}"]`);
                    if (input) input.classList.add('active-col');
                }
            }
        }

        function handleInput(e) {
            const value = e.target.value.toUpperCase();
            e.target.value = value;

            if (value) {
                const row = parseInt(e.target.dataset.row);
                const col = parseInt(e.target.dataset.col);
                moveToNextCell(row, col);
                checkWord();
            }
        }

        function handleKeydown(e) {
            const row = parseInt(e.target.dataset.row);
            const col = parseInt(e.target.dataset.col);

            if (e.key === 'Backspace') {
                if (!e.target.value) {
                    moveToPrevCell(row, col);
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                moveCell(row, col + 1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                moveCell(row, col - 1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                moveCell(row + 1, col);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                moveCell(row - 1, col);
            }
        }

        function moveToNextCell(row, col) {
            const word = getWordAt(row, col);
            if (!word) return;

            if (word.direction === 'h') {
                if (col < word.col + word.word.length - 1) {
                    moveCell(row, col + 1);
                }
            } else {
                if (row < word.row + word.word.length - 1) {
                    moveCell(row + 1, col);
                }
            }
        }

        function moveToPrevCell(row, col) {
            const word = getWordAt(row, col);
            if (!word) return;

            if (word.direction === 'h') {
                if (col > word.col) {
                    moveCell(row, col - 1);
                }
            } else {
                if (row > word.row) {
                    moveCell(row - 1, col);
                }
            }
        }

        function moveCell(row, col) {
            if (row >= 0 && row < currentGame.size && col >= 0 && col < currentGame.size) {
                const input = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`);
                if (input && currentGame.layout[row][col] !== '#') {
                    input.focus();
                }
            }
        }

        function checkWord() {
            if (!currentWord) return;

            let isCorrect = true;
            const inputs = [];

            for (let i = 0; i < currentWord.word.length; i++) {
                let input;
                if (currentWord.direction === 'h') {
                    input = document.querySelector(`input[data-row="${currentWord.row}"][data-col="${currentWord.col + i}"]`);
                } else {
                    input = document.querySelector(`input[data-row="${currentWord.row + i}"][data-col="${currentWord.col}"]`);
                }
                if (input) {
                    inputs.push(input);
                    if (input.value.toUpperCase() !== currentWord.word[i]) {
                        isCorrect = false;
                    }
                }
            }

            if (isCorrect && inputs.every(input => input.value !== '')) {
                inputs.forEach(input => input.classList.add('correct'));
                const hintEl = document.querySelector(`.hint-item[data-word="${currentWord.number}"]`);
                if (hintEl) hintEl.classList.add('correct');
                checkAllWords();
            } else {
                inputs.forEach(input => input.classList.remove('correct'));
            }
        }

        function checkAllWords() {
            let allCorrect = true;

            for (const word of currentGame.words) {
                let correct = true;
                for (let i = 0; i < word.word.length; i++) {
                    let input;
                    if (word.direction === 'h') {
                        input = document.querySelector(`input[data-row="${word.row}"][data-col="${word.col + i}"]`);
                    } else {
                        input = document.querySelector(`input[data-row="${word.row + i}"][data-col="${word.col}"]`);
                    }
                    if (!input || input.value.toUpperCase() !== word.word[i]) {
                        correct = false;
                        break;
                    }
                }
                if (!correct) {
                    allCorrect = false;
                    break;
                }
            }

            if (allCorrect) {
                setTimeout(() => {
                    document.getElementById('overlay').classList.add('show');
                    document.getElementById('message').classList.add('show');
                }, 500);
            }
        }

        function resetGame() {
            closeMessage();
            document.querySelectorAll('.cell input').forEach(input => {
                input.value = '';
                input.classList.remove('correct');
                input.classList.remove('active-row');
                input.classList.remove('active-col');
            });
            document.querySelectorAll('.hint-item').forEach(el => {
                el.classList.remove('correct');
                el.classList.remove('active');
            });
            currentWord = null;
            currentHint = null;
        }

        function closeMessage() {
            document.getElementById('overlay').classList.remove('show');
            document.getElementById('message').classList.remove('show');
        }

        // Event listeners for buttons and overlay
        document.getElementById('btn-reset').addEventListener('click', resetGame);
        document.getElementById('btn-back').addEventListener('click', function() {
            window.location.href = 'grupo-moderado.html';
        });
        document.getElementById('overlay').addEventListener('click', closeMessage);
        document.getElementById('btn-play-again').addEventListener('click', resetGame);

        initGame();
});