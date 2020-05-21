document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;

    //the tetrominoes
    const lTetromino = [
        [1, width + 1, (width * 2) + 1, 2],
        [width, width + 1, width + 2, (width * 2) + 2],
        [1, width + 1, (width * 2) + 1, width * 2],
        [width, width * 2, (width * 2) + 1, (width * 2) + 2]
    ]

    const zTetromino = [
        [0, width, width + 1, (width * 2) + 1],
        [width + 1, width + 2, width * 2, (width * 2) + 1],
        [0, width, width + 1, (width * 2) + 1],
        [width + 1, width + 2, width * 2, (width * 2) + 1]
    ]

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, (width * 2) + 1]
        [width, width + 1, width + 2, (width * 2) + 1],
        [1, width, width + 1, (width * 2) + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, (width * 2) + 1, (width * 3) + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, (width * 2) + 1, (width * 3) + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

    let currentPostiion = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[random][0];

    //draw the first rotation in the first tetromino
    function draw() {
        current.forEach(index => {
            squares[currentPostiion + index].classList.add('tetromino');
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPostiion + index].classList.remove('tetromino');
        })
    }

    timerId = setInterval(moveDown, 1000)

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPostiion += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[currentPostiion + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPostiion + index].classList.add('taken'))
            random = Math.floor(Math.random() * theTetrominoes.length);
            current = theTetrominoes[random][currentRotation];
            currentPostiion = 4;
            draw();
        }
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPostiion + index) % width === 0);

        if (!isAtLeftEdge) currentPostiion -= 1;

        if (current.some(index => squares[currentPostiion + index].classList.contains('taken'))) {
            currentPostiion += 1;
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPostiion + index) % width ===  width - 1);

        if (!isAtRightEdge) currentPostiion += 1;

        if (current.some(index => squares[currentPostiion + index].classList.contains('taken'))) {
            currentPostiion -= 1;
        }

        draw();
    }

    function rotate() {
        undraw();
        currentRotation ++;
        if(currentRotation === current.length) {
            currentRotation = 0;
        }
        current = theTetrominoes[random][currentPostiion];
        draw();
    }
})
