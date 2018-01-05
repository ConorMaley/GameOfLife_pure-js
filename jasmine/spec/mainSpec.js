describe("board functionality", function () {
	//main.js is imported already
	beforeEach(function() {
		x_grid=3;
		y_grid=3;
		
		initalizeBoard();
	});

	it("initalizeBoard should create an empty board", function() {
		board.forEach(function(bi, i) {
			bi.forEach(function(bj, j) {
				expect(bj).toBeFalsy();
			});
		})
	});	

	it("board should be a 3 x 3", function() {
		//we set the board to be a 3 x 3
		expect(board.length).toEqual(3);
		expect(board[0].length).toEqual(3);
	});

	it("isRunning should be false on startup", function() {
		expect(isRunning).toBeFalsy();
	});

	describe("clicking the elements", function() {
		//clicking any cell calls flipBoard ("backend") and fillCell ("frontend")
		beforeEach(function() {

		});

		it("clicking any dead cell should make it alive", function() {
			//all my cells are dead
			board.forEach(function(bi, i) {
				bi.forEach(function(bj, j){ 
					flipBoard(i, j);
				});
			});

			board.forEach(function(bi, i) {
				bi.forEach(function(bj, j){ 
					expect(bj).toBeTruthy();
				});
			});
		});
	});

	describe('updateBoard scenarios', function() {
		beforeEach(function() {

		});

		it("updateBoard should return a board of the same size", function() {
			var rows = board.length; 
			var cols = board[0].length;
			board = updateBoard(board);
		
			expect(board.length).toEqual(rows);
			expect(board[0].length).toEqual(cols);
		});

		it("a live cell with 2 neighbors should live to the next generation", function() {
			//1, 1 is our target
			flipBoard(1, 1);
			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(1, 2);

			board = updateBoard(board);

			expect(board[1][1]).toBeTruthy();
		});

		it("a live cell with 3 neighbors should live to the next generation", function() {
			//1, 1 is our target
			flipBoard(1, 1);
			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(1, 2);
			//n3
			flipBoard(0, 0);

			board = updateBoard(board);

			expect(board[1][1]).toBeTruthy();
		});

		it("a live cell with more than 3 neighbors should die", function() {
			//1, 1 is our target
			flipBoard(1, 1);
			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(1, 2);
			//n3
			flipBoard(0, 0);
			//n4
			flipBoard(0, 1);

			board = updateBoard(board);

			expect(board[1][1]).toBeFalsy();
		});

		it("a live cell with less than 2 neighbors should die", function() {
			//1, 1 is our target
			flipBoard(1, 1);
			//n1
			flipBoard(2, 1);

			board = updateBoard(board);

			expect(board[1][1]).toBeFalsy();
		});

		it("a dead cell with exactly 3 neighbors should be alive", function() {
			//1, 1 is our target
			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(2, 2);
			//n3
			flipBoard(1, 1);

			board = updateBoard(board);

			expect(board[1][1]).toBeTruthy();
		});

		it("a dead cell with anytihing other than 3 neighbors should be still be dead", function() {
			//1, 1 is our target
			//2 neighbors
			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(2, 2);

			board = updateBoard(board);

			//all cells should be dead
			board.forEach(function(bi) {
				bi.forEach(function(bj){ 
					expect(bj).toBeFalsy();
				});
			});

			//n1
			flipBoard(2, 1);
			//n2
			flipBoard(2, 2);
			//n3
			flipBoard(0, 0);
			//n4
			flipBoard(1, 2);

			//1, 1 has 4 neighbors, should still be dead.
			expect(board[1][1]).toBeFalsy();
		});
	});

	describe("board commands", function() {
		//install karma and get to work on these
		beforeEach(function() {

		});
	});
})