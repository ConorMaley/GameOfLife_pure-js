/*
INITALIZATION
*/

var x_grid, y_grid, num_iterations, board, boardElements, isRunning = false; 
bootup();
run();

function bootup() {
	//initalize with 6x8
	x_grid = 6;
	y_grid	= 8;

	initalizeBoard();
	drawBoard(x_grid, y_grid);
}


///////////////BOARD STORAGE MANIPULATION///////////////

//creates new array 
//set each element of board to false
function initalizeBoard() {
	board = new Array(x_grid);
	for (var i = 0; i < x_grid; i++) {
		board[i] = new Array(y_grid);
		for (var j = 0; j < y_grid; j++) {
			board[i][j] = 0;
		}
	}
}

//updates the board, not the elements
function updateBoard(b) {
	//GoL logic
	function getNumNeighbors(row, col, isAlive) {
		function isInArray(x, y) {
			if (x < 0 || x >= x_grid || y < 0 || y >= y_grid) {
				return false;
			}
			return true;
		}

		function isNotSelf(i, j) {
			return !(i == row && j == col);
		}

		var numNeighbors = 0;

		for (var i = row - 1; i <= row + 1; i++) {
			for (var j = col - 1; j <=col + 1; j++) {
				if (isInArray(i, j) && isNotSelf(i,j)) {
					numNeighbors = b[i][j] ? numNeighbors + 1 : numNeighbors;
					if (!isAlive && numNeighbors > 3) {
						//save some time for dead cells becoming alive
						//can also check for number of remaining checks and how many more alive cells do we need
						return numNeighbors;
					}
				}
			}
		}
		return numNeighbors;
	}
	var newBoard = new Array(x_grid);
	for (var i = 0; i < x_grid; i++) {
		newBoard[i] = b[i].slice();
	}
	//for each cell
	for (var i = 0; i < x_grid; i++){
		for (var j = 0; j < y_grid; j++) {
			var numNeighbors = getNumNeighbors(i, j, b[i][j]);
			// if the cell is dead and has exactly 3 neighbors, its alive now!
			if (!b[i][j] && numNeighbors == 3) {
				newBoard[i][j] = 1;
			}
			if (board[i][j] && (numNeighbors < 2 || numNeighbors > 3)) {
				newBoard[i][j] = 0;
			}
		}
	}
	return newBoard;
}

///////////////BOARD ELEMENT MANIPULATION///////////////
//uses boardElemets as a true global

//draws and places the boardElements
function drawBoard(x, y) {
	//get board div
	var boardDiv = document.getElementById("board");
	boardElements = new Array(x);
	for (var i = 0; i < x; i++) {
		boardElements[i] = new Array(y);
		for(var j = 0; j < y; j++) {
			boardElements[i][j] = document.createElement("BUTTON");
			boardElements[i][j].innerHTML = "O";
			boardElements[i][j].i = i;
			boardElements[i][j].j = j;
			boardElements[i][j].onclick = function() {
				board[this.i][this.j] = !board[this.i][this.j]; 
				fillCell(this.i, this.j);};
			boardDiv.appendChild(boardElements[i][j]);
		}
		boardDiv.appendChild(document.createElement("div"));
	}
	fillBoard(board);
}

function deleteDrawnBoard(x, y) {
	//remove all previous elements (wow this would've been so nice to use jQuery)
	var boardDiv = document.getElementById("board");
	while (boardDiv.hasChildNodes()) {
		boardDiv.removeChild(boardDiv.firstChild);
	}
}

function updateSize() {
	function getNewGrid(gridID) {
		//prevent overflow
		if (document.getElementById(gridID).value > parseInt(document.getElementById(gridID).max)) {
			document.getElementById(gridID).value = parseInt(document.getElementById(gridID).max);
		}
		return document.getElementById(gridID).value;
	}

	stopRun();

	//run before we update x_grid and y_grid
	deleteDrawnBoard(x_grid, y_grid);

	x_grid = getNewGrid("x_grid");
	y_grid = getNewGrid("y_grid");

	initalizeBoard(board);
	drawBoard(x_grid, y_grid);


	//update board
}


///////////////BOARD STORAGE - BOARD ELEMENT CHATS///////////////

function fillBoard(b) {
	b.forEach(function(bi, i) {
		bi.forEach(function(bj, j) {
			fillCell(i,j);
		});
	});

}

function fillCell(i, j) {
	if (board[i][j]) {
		boardElements[i][j].classList.remove('cell_dead');
		boardElements[i][j].classList.add('cell_alive');
	} else {
		boardElements[i][j].classList.remove('cell_alive');
		boardElements[i][j].classList.add('cell_dead');
	}
} 

///////////////BOARD COMMANDS///////////////

function randomizeBoard() {
	stopRun();
	board.forEach(function(bi, i) {
		bi.forEach(function(bj, j) {
			//should set board[i][j] to rand
			board[i][j] = Math.floor(Math.random() * 2);
		});
	});
	fillBoard(board);
}

//both clears the board and updates board elements
function clearBoard() {
	stopRun();
	board.forEach(function(bi, i) {
		bi.forEach(function(bj, j) {
			//should set board[i][j] to rand
			board[i][j] = 0;
		});
	});
	fillBoard(board);
}

function takeStep() {
	board = updateBoard(board);
	fillBoard(board);
}

function takeSingleStep() {
	stopRun();
	takeStep();
}


function toggleRun() {
	isRunning = !isRunning;
	setRunButton();
}

function setRunButton () {
	if (isRunning) {
		document.getElementById("run_toggle").innerHTML = "Pause";
	} else {
		document.getElementById("run_toggle").innerHTML = "Run";
	}
}

///////////////RUN OPERATIONS///////////////

function run() {
	var runSpeed = getRunSpeed() ;

	//tried creating a var function, but it didn't work for some reason
	//^-- look into this, used the same code in function assigned to a var, did not work
	var interval = setInterval(function() {
		if (isRunning) {
			takeStep()
		}}, runSpeed);

	document.getElementById("run_speed_slider").onchange = function() {
		runSpeed = getRunSpeed();
		clearInterval(interval);
		interval = setInterval(function() {
		if (isRunning) {
			takeStep()
		}}, runSpeed);
	};

	function intervalToRun() {
		if (isRunning) {
			takeStep();
		}
	}

	function getRunSpeed() {
		return (1000/parseInt(document.getElementById("run_speed_slider").value));
	}
}

function startRun() {
	isRunning = true;
	setRunButton();
}

function stopRun() {
	isRunning = false;
	setRunButton();
}