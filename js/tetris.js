class Tetris {
    constructor() {
        this.canvas = document.getElementById('tetris');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.levelElement = document.getElementById('level');
        this.linesElement = document.getElementById('lines');

        // 効果音の初期化
        this.moveSound = new Audio();
        this.moveSound.src = 'data:audio/wav;base64,UklGRqRnAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YYBnAAAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAIwAkACUAJgAnACgAKQAqACsALAAtAC4ALwAwADEAMgAzADQANQA2ADcAOAA5ADoAOwA8AD0APgA/AEAAQQBCAEMARABFAEYARwBIAEkASgBLAEwATQBOAE8AUABRAFIAUwBUAFUAVgBXAFgAWQBaAFsAXABdAF4AXwBgAGEAYgBjAGQAZQBmAGcAaABpAGoAawBsAG0AbgBvAHAAcQByAHMAdAB1AHYAdwB4AHkAegB7AHwAfQB+AH8AgACBAIIAgwCEAIUAhgCHAIgAiQCKAIsAjACNAI4AjwCQAJEAkgCTAJQAlQCWAJcAmACZAJoAmwCcAJ0AngCfAKAAoQCiAKMApAClAKYApwCoAKkAqgCrAKwArQCuAK8AsACxALIAswC0ALUAtgC3ALgAuQC6ALsAvAC9AL4AvwDAAMEAwgDDAMQAxQDGAMcAyADJAMoAywDMAM0AzgDPANAA0QDSANMA1ADVANYA1wDYANkA2gDbANwA3QDeAN8A4ADhAOIA4wDkAOUA5gDnAOgA6QDqAOsA7ADtAO4A7wDwAPEA8gDzAPQA9QD2APcA+AD5APoA+wD8AP0A/gD/AP4A/QD8APsA+gD5APgA9wD2APUA9ADzAPIA8QDwAO8A7gDtAOwA6wDqAOkA6ADoAOcA5gDlAOQA4wDiAOEA4ADfAN4A3QDcANsA2gDZANgA1wDWANUA1ADTANIA0QDQAM8AzgDNAMwAywDKAMkAyADHAMYAxQDEAMMAwgDBAMAAvwC+AL0AvAC7ALoAuQC4ALcAtgC1ALQAswCyALEAsACvAK4ArQCsAKsAqgCpAKgApwCmAKUApACjAKIAoQCgAJ8AngCdAJwAmwCaAJkAmACXAJYAlQCUAJMAkgCRAJAAjwCOAI0AjACLAIoAiQCIAIcAhgCFAIQAgwCCAIEAgAB/AH4AfQB8AHsAegB5AHgAdwB2AHUAdABzAHIAcQBwAG8AbgBtAGwAawBqAGkAaABnAGYAZQBkAGMAYgBhAGAAXwBeAF0AXABbAFoAWQBYAFcAVgBVAFQAUwBSAFEAUABPAE4ATQBMAEsASgBJAEgARwBGAEUARABDAEIAQQBAAD8APgA9ADwAOwA6ADkAOAA3ADYANQAzADIAMQAwAC8ALgAtACwAKwAqACkAKAAnACYAJQAkACMAIgAhACAAHwAeAB0AHAAbABoAGQAYABcAFgAVABQAEwASABEAEAAPAA4ADQAMAAoACQAIAAcABgAFAAQAAwACAAEAAAAA//7//f/8//v/+v/5//j/9//2//X/9P/z//L/8f/w/+//7v/t/+z/6//q/+n/6P/n/+b/5f/k/+P/4v/h/+D/3//e/93/3P/b/9r/2f/Y/9f/1v/V/9T/0//S/9H/0P/P/87/zf/M/8v/yv/J/8j/x//G/8X/xP/D/8L/wf/A/7//vv+9/7z/u/+6/7n/uP+3/7b/tf+0/7P/sv+x/7D/r/+u/63/rP+r/6r/qf+o/6f/pv+l/6T/o/+i/6H/oP+f/57/nf+c/5v/mv+Z/5j/l/+W/5X/lP+T/5L/kf+Q/4//jv+N/4z/i/+K/4n/iP+H/4b/hf+E/4P/gv+B/4D/f/9+/33/fP97/3r/ef94/3f/dv91/3T/c/9y/3H/cP9v/27/bf9s/2v/av9p/2j/Z/9m/2X/ZP9j/2L/Yf9g/1//Xv9d/1z/W/9a/1n/WP9X/1b/Vf9U/1P/Uv9R/1D/T/9O/03/TP9L/0r/Sf9I/0f/Rv9F/0T/Q/9C/0H/QP8//z7/Pf88/zv/Ov85/zj/N/82/zX/NP8z/zL/Mf8w/y//Lv8t/yz/K/8q/yn/KP8n/yb/Jf8k/yP/Iv8h/yD/H/8e/x3/HP8b/xr/Gf8Y/xf/Fv8V/xT/E/8S/xH/EP8P/w7/Df8M/wv/Cv8J/wj/B/8G/wX/BP8D/wL/Af8A/wD///7+/v3+/P77/vr++f74/vf+9v71/vT+8/7y/vH+8P7v/u7+7f7s/uv+6v7p/uj+5/7m/uX+5P7j/uL+4f7g/t/+3v7d/tz+2/7a/tn+2P7X/tb+1f7U/tP+0v7R/tD+z/7O/s3+zP7L/sr+yf7I/sf+xv7F/sT+w/7C/sH+wP6//r7+vf68/rv+uv65/rj+t/62/rX+tP6z/rL+sf6w/q/+rv6t/qz+q/6q/qn+qP6n/qb+pf6k/qP+ov6h/qD+n/6e/p3+nP6b/pr+mf6Y/pf+lv6V/pT+k/6S/pH+kP6P/o7+jf6M/ov+iv6J/oj+h/6G/oX+hP6D/oL+gf6A/n/+fv59/nz+e/56/nn+eP53/nb+df50/nP+cv5x/nD+b/5u/m3+bP5r/mr+af5o/mf+Zv5l/mT+Y/5i/mH+YP5f/l7+Xf5c/lv+Wv5Z/lj+V/5W/lX+VP5T/lL+Uf5Q/k/+Tv5N/kz+S/5K/kn+SP5H/kb+Rf5E/kP+Qv5B/kD+P/4+/j3+PP47/jr+Of44/jf+Nv41/jT+M/4y/jH+MP4v/i7+Lf4s/iv+Kv4p/ij+J/4m/iX+JP4j/iL+If4g/h/+Hv4d/hz+G/4a/hn+GP4X/hb+Ff4U/hP+Ev4R/hD+D/4O/g3+DP4L/gr+Cf4I/gf+Bv4F/gT+A/4C/gH+AP4A/f/8//v/+v/5//j/9//2//X/9P/z//L/8f/w/+//7v/t/+z/6//q/+n/6P/n/+b/5f/k/+P/4v/h/+D/3//e/93/3P/b/9r/2f/Y/9f/1v/V/9T/0//S/9H/0P/P/87/zf/M/8v/yv/J/8j/x//G/8X/xP/D/8L/wf/A/7//vv+9/7z/u/+6/7n/uP+3/7b/tf+0/7P/sv+x/7D/r/+u/63/rP+r/6r/qf+o/6f/pv+l/6T/o/+i/6H/oP+f/57/nf+c/5v/mv+Z/5j/l/+W/5X/lP+T/5L/kf+Q/4//jv+N/4z/i/+K/4n/iP+H/4b/hf+E/4P/gv+B/4D/f/9+/33/fP97/3r/ef94/3f/dv91/3T/c/9y/3H/cP9v/27/bf9s/2v/av9p/2j/Z/9m/2X/ZP9j/2L/Yf9g/1//Xv9d/1z/W/9a/1n/WP9X/1b/Vf9U/1P/Uv9R/1D/T/9O/03/TP9L/0r/Sf9I/0f/Rv9F/0T/Q/9C/0H/QP8//z7/Pf88/zv/Ov85/zj/N/82/zX/NP8z/zL/Mf8w/y//Lv8t/yz/K/8q/yn/KP8n/yb/Jf8k/yP/Iv8h/yD/H/8e/x3/HP8b/xr/Gf8Y/xf/Fv8V/xT/E/8S/xH/EP8P/w7/Df8M/wv/Cv8J/wj/B/8G/wX/BP8D/wL/Af8A/wD///7+/v3+/P77/vr++f74/vf+9v71/vT+8/7y/vH+8P7v/u7+7f7s/uv+6v7p/uj+5/7m/uX+5P7j/uL+4f7g/t/+3v7d/tz+2/7a/tn+2P7X/tb+1f7U/tP+0v7R/tD+z/7O/s3+zP7L/sr+yf7I/sf+xv7F/sT+w/7C/sH+wP6//r7+vf68/rv+uv65/rj+t/62/rX+tP6z/rL+sf6w/q/+rv6t/qz+q/6q/qn+qP6n/qb+pf6k/qP+ov6h/qD+n/6e/p3+nP6b/pr+mf6Y/pf+lv6V/pT+k/6S/pH+kP6P/o7+jf6M/ov+iv6J/oj+h/6G/oX+hP6D/oL+gf6A/n/+fv59/nz+e/56/nn+eP53/nb+df50/nP+cv5x/nD+b/5u/m3+bP5r/mr+af5o/mf+Zv5l/mT+Y/5i/mH+YP5f/l7+Xf5c/lv+Wv5Z/lj+V/5W/lX+VP5T/lL+Uf5Q/k/+Tv5N/kz+S/5K/kn+SP5H/kb+Rf5E/kP+Qv5B/kD+P/4+/j3+PP47/jr+Of44/jf+Nv41/jT+M/4y/jH+MP4v/i7+Lf4s/iv+Kv4p/ij+J/4m/iX+JP4j/iL+If4g/h/+Hv4d/hz+G/4a/hn+GP4X/hb+Ff4U/hP+Ev4R/hD+D/4O/g3+DP4L/gr+Cf4I/gf+Bv4F/gT+A/4C/gH+AP4=';
        this.moveSound.volume = 0.3; // 音量を30%に設定
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
        } else {
            // ブロックが下に移動した時に音を鳴らす
            this.moveSound.currentTime = 0; // 音を最初から再生
            this.moveSound.play();
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