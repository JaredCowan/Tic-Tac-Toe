function logBoard(board) {
  var rows = [];

  board.forEach(function(row) {
    rows.push(row.join(','));
  })

  console.log(rows);
}

function GameController($scope) {
  $scope.board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  $scope.currentPlayer = 'O'

  $scope.playerChoice = function(row, col) {
    console.log(row, col);
    console.log($scope.currentPlayer)

    /*

    1. Get current player
    2. Place currentPlayer's value (O or X) into the right col/row of board
    3. Log out board value 
    */
    
    $scope.board[row][col] = $scope.currentPlayer;
    logBoard($scope.board);
  };
}