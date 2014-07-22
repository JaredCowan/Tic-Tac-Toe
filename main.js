function TicTacController($scope) {

  var cells = ['','','','','','','','',''];
  var currentMark = 'o';
  var empty = true;
  moves = 1;
  gameover = false;
  grid = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];
  $scope.leftScore = 0;
  $scope.rightScore = 0;

  $scope.cells   = cells;
  $scope.showbtn =  false;

  $scope.drawMark = function(index) {
    if (gameover == false && cells[index] == '') {
      if (currentMark == 'o') {
        $scope.cells[index] = 'x';
        currentMark = 'x';
      } else {
        $scope.cells[index] = 'o';
        currentMark = 'o';
      }
    }
    var row = Math.floor(index/3);
    var column = (index % 3);
    grid[row][column] = currentMark;
    if (gameover == false) evaluateWin();
  }

  var evaluateWin = function() {
    if (grid[0][0] == "x" && grid[0][1] == "x" && grid[0][2] == "x" || grid[1][0] == "x" && grid[1][1] == "x" && grid[1][2] == "x" || grid[2][0] == "x" && grid[2][1] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][0] == "x" && grid[2][0] == "x" || grid[0][1] == "x" && grid[1][1] == "x" && grid[2][1] == "x" || grid[0][2] == "x" && grid[1][2] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][1] == "x" && grid[2][2] == "x" || grid[0][2] == "x" && grid[1][1] == "x" && grid[2][0] == "x") {
      xwin();
    } else if (grid[0][0] == "o" && grid[0][1] == "o" && grid[0][2] == "o" || grid[1][0] == "o" && grid[1][1] == "o" && grid[1][2] == "o" || grid[2][0] == "o" && grid[2][1] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][0] == "o" && grid[2][0] == "o" || grid[0][1] == "o" && grid[1][1] == "o" && grid[2][1] == "o" || grid[0][2] == "o" && grid[1][2] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][1] == "o" && grid[2][2] == "o" || grid[0][2] == "o" && grid[1][1] == "o" && grid[2][0] == "o") {
      owin();
    } else if (moves == 9) {
      var messagebox = document.getElementById('message');
      $scope.leftMessage = "draw...";
      $scope.rightMessage = "draw...";
    } else {
      moves += 1;
    }
  }

  $scope.setName1 = function(player1Name) {
    $scope.player1Name = '';
  }

  $scope.setName2 = function(player2Name) {
    $scope.player2Name = '';
  }

  $scope.removeFocus1 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }

  $scope.removeFocus2 = function(key) {
    if (key.keyCode == 13) {
      key.target.blur();
    }
  }

  var xwin = function () {
    $scope.leftMessage = $scope.player1Name + " wins!";
    gameover = true;
    $scope.leftScore += 1;
    $scope.showbtn =  true;
  }

  var owin = function () {
    $scope.rightMessage = $scope.player2Name + " wins!";
    gameover = true;
    $scope.rightScore += 1;
    $scope.showbtn =  true;
  }

  $scope.clearBoard = function() {
    console.log('you tried to clear the board');
    for (var j = 0; j < cells.length; j++) {
      $scope.cells[j] = '';
    }
    $scope.leftMessage = "";
    $scope.rightMessage = "";
    currentMark = 'o';
    var empty = true;
    moves = 1;
    gameover = false;
    grid = [
        [ "" , "" , "" ],
        [ "" , "" , "" ],
        [ "" , "" , "" ]
    ];
  };

}


