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

    
    // var $scope.rowLast = $scope.board[0][0] + $scope.board[0][1] + $scope.board[0][2];
    // $scope.rowLast.join().replace(/,/g, '');
    $scope.board[row][col] = $scope.currentPlayer;
    logBoard($scope.board);
    if ($scope.board[0][0] + $scope.board[0][1] + $scope.board[0][2] == "XXX" || $scope.board[0][0] + $scope.board[0][1] + $scope.board[0][2] == "OOO" || $scope.board[0][0] + $scope.board[1][0] + $scope.board[2][0] == "XXX" || $scope.board[0][0] + $scope.board[1][0] + $scope.board[2][0] == "OOO" || $scope.board[0][1] + $scope.board[1][1] + $scope.board[2][1] == "XXX" || $scope.board[0][2] + $scope.board[1][0] + $scope.board[2][0] == "OOO") {
      console.log('winner');
    } else if ($scope.rowLast == "XXX") {
      console.log('winnerwinner');
    }
    // else if ($scope.board[0][0].join() == "X,X,X" || $scope.board[1][0].join() == "X,X,X" || $scope.board[2][0].join() == "X,X,X") {
    //   console.log('winner2');
    // }
  };
}