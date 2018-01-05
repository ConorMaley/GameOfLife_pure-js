describe("board functionality", function () {
	//main.js is imported already
	beforeEach(function() {
		initalizeBoard();
	});

	it("initalizeBoard should create an empty board", function() {
		console.log("giiii");
		board.forEach(function(bi, i) {
			bi.forEach(function(bj, j) {
				expect(bj).toBe(0);
			});
		})
	});

	it("updateBoard should return a board of the same size", function() {
		var rows = board.length; 
		var cols = board[0].length;
		board = updateBoard(board);
		
		expect(board.length).toEqual(rows);
		expect(board[0].length).toEqual(cols);
	});

	it("updateBoard should return a board of the same size", function() {
		var rows = board.length; 
		var cols = board[0].length;

		
		board = updateBoard(board);
		
		expect(board.length).toEqual(rows);
		expect(board[0].length).toEqual(cols);
	});
})