class Tetris {
    constructor() {
        this.canvas = document.getElementById('tetris');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');
        
        // ゲームの設定
        this.blockSize = 20;
        this.cols = this.canvas.width / this.blockSize;
        this.rows = this.canvas.height / this.blockSize;
        this.board = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        
        // スコア関連
        this.score = 0;
        this.level = 1;
        this.lines = 0;
        
        // テトリミノの形状定義
        this.shapes = {
            'I': [[1, 1, 1, 1]],
            'L': [[1, 0], [1, 0], [1, 1]],
            'J': [[0, 1], [0, 1], [1, 1]],
            'O': [[1, 1], [1, 1]],
            'Z': [[1, 1, 0], [0, 1, 1]],
            'S': [[0, 1, 1], [1, 1, 0]],
            'T': [[1, 1, 1], [0, 1, 0]]
        };
        
        // 色の定義
        this.colors = {
            'I': '#00f0f0',
            'L': '#f0a000',
            'J': '#0000f0',
            'O': '#f0f000',
            'Z': '#f00000',
            'S': '#00f000',
            'T': '#a000f0'
        };
        
        this.currentPiece = null;
        this.gameOver = false;
        this.dropInterval = 1000;
        this.lastDrop = 0;
        
        // キーボードイベントの設定
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
        
        // ゲーム開始
        this.spawnPiece();
        this.gameLoop();
    }
    
    spawnPiece() {
        const shapes = Object.keys(this.shapes);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        
        this.currentPiece = {
            shape: this.shapes[randomShape],
            color: this.colors[randomShape],
            x: Math.floor(this.cols / 2) - Math.floor(this.shapes[randomShape][0].length / 2),
            y: 0
        };
        
        if (this.checkCollision()) {
            this.gameOver = true;
        }
    }
    
    checkCollision() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardX = this.currentPiece.x + x;
                    const boardY = this.currentPiece.y + y;
                    
                    if (boardX < 0 || boardX >= this.cols || 
                        boardY >= this.rows ||
                        (boardY >= 0 && this.board[boardY][boardX])) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    rotate() {
        const rotated = this.currentPiece.shape[0].map((_, i) =>
            this.currentPiece.shape.map(row => row[i]).reverse()
        );
        
        const previousShape = this.currentPiece.shape;
        this.currentPiece.shape = rotated;
        
        if (this.checkCollision()) {
            this.currentPiece.shape = previousShape;
        }
    }
    
    moveLeft() {
        this.currentPiece.x--;
        if (this.checkCollision()) {
            this.currentPiece.x++;
        }
    }
    
    moveRight() {
        this.currentPiece.x++;
        if (this.checkCollision()) {
            this.currentPiece.x--;
        }
    }
    
    moveDown() {
        this.currentPiece.y++;
        if (this.checkCollision()) {
            this.currentPiece.y--;
            this.lockPiece();
            this.clearLines();
            this.spawnPiece();
        }
    }
    
    hardDrop() {
        while (!this.checkCollision()) {
            this.currentPiece.y++;
        }
        this.currentPiece.y--;
        this.lockPiece();
        this.clearLines();
        this.spawnPiece();
    }
    
    lockPiece() {
        for (let y = 0; y < this.currentPiece.shape.length; y++) {
            for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                if (this.currentPiece.shape[y][x]) {
                    const boardY = this.currentPiece.y + y;
                    const boardX = this.currentPiece.x + x;
                    if (boardY >= 0) {
                        this.board[boardY][boardX] = this.currentPiece.color;
                    }
                }
            }
        }
    }
    
    clearLines() {
        let linesCleared = 0;
        
        for (let y = this.rows - 1; y >= 0; y--) {
            if (this.board[y].every(cell => cell !== 0)) {
                this.board.splice(y, 1);
                this.board.unshift(Array(this.cols).fill(0));
                linesCleared++;
                y++;
            }
        }
        
        if (linesCleared > 0) {
            this.lines += linesCleared;
            this.score += this.calculateScore(linesCleared);
            this.level = Math.floor(this.lines / 10) + 1;
            this.dropInterval = Math.max(100, 1000 - (this.level - 1) * 100);
            
            this.updateScore();
        }
    }
    
    calculateScore(linesCleared) {
        const basePoints = [40, 100, 300, 1200];
        return basePoints[linesCleared - 1] * this.level;
    }
    
    updateScore() {
        this.scoreElement.textContent = this.score;
        this.levelElement.textContent = this.level;
        this.linesElement.textContent = this.lines;
    }
    
    handleKeyPress(event) {
        if (this.gameOver) return;
        
        switch (event.keyCode) {
            case 37: // 左矢印
                this.moveLeft();
                break;
            case 39: // 右矢印
                this.moveRight();
                break;
            case 40: // 下矢印
                this.moveDown();
                break;
            case 38: // 上矢印
                this.rotate();
                break;
            case 32: // スペース
                this.hardDrop();
                break;
        }
    }
    
    draw() {
        // キャンバスをクリア
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 固定されたブロックを描画
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    this.drawBlock(x, y, this.board[y][x]);
                }
            }
        }
        
        // 現在のピースを描画
        if (this.currentPiece) {
            for (let y = 0; y < this.currentPiece.shape.length; y++) {
                for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
                    if (this.currentPiece.shape[y][x]) {
                        this.drawBlock(
                            this.currentPiece.x + x,
                            this.currentPiece.y + y,
                            this.currentPiece.color
                        );
                    }
                }
            }
        }
        
        // ゲームオーバー表示
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
    
    drawBlock(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize
        );
        
        this.ctx.strokeStyle = '#000';
        this.ctx.strokeRect(
            x * this.blockSize,
            y * this.blockSize,
            this.blockSize,
            this.blockSize
        );
    }
    
    gameLoop(timestamp = 0) {
        if (timestamp - this.lastDrop > this.dropInterval) {
            this.moveDown();
            this.lastDrop = timestamp;
        }
        
        this.draw();
        requestAnimationFrame(this.gameLoop.bind(this));
    }
}

// ゲーム開始
window.onload = () => {
    new Tetris();
};