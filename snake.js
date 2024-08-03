//board
var blockSize = 25;
var rows = 23;
var cols = 60;
var board;
var context;

//snake1 head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];

//snake2 head
var snakeX1 = blockSize * 54;
var snakeY1 = blockSize * 5;
var velocityX1 = 0;
var velocityY1 = 0;
var snakeBody1 = [];

//food
var foodX;
var foodY;

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "orange";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    // Update snake1
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Update snake2
    if (snakeX1 == foodX && snakeY1 == foodY) {
        snakeBody1.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody1.length - 1; i > 0; i--) {
        snakeBody1[i] = snakeBody1[i - 1];
    }
    if (snakeBody1.length) {
        snakeBody1[0] = [snakeX1, snakeY1];
    }

    context.fillStyle = "red";
    snakeX1 += velocityX1 * blockSize;
    snakeY1 += velocityY1 * blockSize;
    context.fillRect(snakeX1, snakeY1, blockSize, blockSize);
    for (let i = 0; i < snakeBody1.length; i++) {
        context.fillRect(snakeBody1[i][0], snakeBody1[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        gameOver = true;
        window.alert("Player 2 win \nYou want to Play again");
        location.reload();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            window.alert("Player 2 win \nYou want to Play again");
            location.reload();
        }
    }

    if (snakeX1 < 0 || snakeX1 >= cols * blockSize || snakeY1 < 0 || snakeY1 >= rows * blockSize) {
        gameOver = true;
        window.alert("Player 1 win \nYou want to Play again");

        location.reload();
    }

    for (let i = 0; i < snakeBody1.length; i++) {
        if (snakeX1 == snakeBody1[i][0] && snakeY1 == snakeBody1[i][1]) {
            gameOver = true;
            window.alert("Player 1 win \nYou want to Play again");

            location.reload();
        }
    }

    for (let i = 0; i < snakeBody1.length; i++) {
        if (snakeX == snakeBody1[i][0] && snakeY == snakeBody1[i][1]) {
            gameOver = true;
            alert("Player 2 win \nYou want to Play again");
            location.reload();
        }
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX1 == snakeBody[i][0] && snakeY1 == snakeBody[i][1]) {
            gameOver = true;
            alert("Player 1 win \nYou want to Play again");
            location.reload();
        }
    }

    if (snakeX == snakeX1 && snakeY == snakeY1) {
        gameOver = true;
        if (snakeBody.length > snakeBody1.length) {
            window.alert("Player 1 wins \nDo you want to play again?");
        } else if (snakeBody.length < snakeBody1.length) {
            window.alert("Player 2 wins \nDo you want to play again?");
        } else {
            window.alert("It's a draw! \nDo you want to play again?");
        }
        location.reload();
    }
}

function changeDirection(e) {
    // Snake 1 controls
    if (e.code == "KeyW" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "KeyS" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "KeyA" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "KeyD" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

    // Snake 2 controls
    if (e.code == "ArrowUp" && velocityY1 != 1) {
        velocityX1 = 0;
        velocityY1 = -1;
    }
    else if (e.code == "ArrowDown" && velocityY1 != -1) {
        velocityX1 = 0;
        velocityY1 = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX1 != 1) {
        velocityX1 = -1;
        velocityY1 = 0;
    }
    else if (e.code == "ArrowRight" && velocityX1 != -1) {
        velocityX1 = 1;
        velocityY1 = 0;
    }
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}
