
// Using WebPack
var jenova = require("jenova");

var initialBoard = [
	[0, 0, 0, 0, 0, 0, 0],
	[0, 1, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0]
];

function generateBoard(board, canvas) {

	var ctx = canvas.getContext('2d'),
		width = canvas.width,
		height = canvas.height,
		cellHeight = height/ board.length,
		cellWidth = width / board[0].length;

	// Loop through the board and draw each cell
	board.forEach(function(row, rowIndex) {
		row.forEach(function(col, colIndex) {
			ctx.fillStyle = col ? '#ccc' : '#fff';
			ctx.fillRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
			ctx.strokeRect(colIndex*cellWidth, rowIndex*cellHeight, cellWidth, cellHeight);
		});
	});

	console.log(jenova.compress(board));

	// Finally Generate a new board, with a callback to redraw it
	jenova.next(board, function(newBoard) {
		setTimeout(generateBoard.bind(this, newBoard, canvas), 200);
	});
}

window.requestAnimationFrame(generateBoard.bind(this, initialBoard, document.getElementById('myCanvas')));