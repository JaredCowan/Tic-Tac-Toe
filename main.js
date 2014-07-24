var TicTacApp = angular.module('TicTacApp', ["firebase"]);
TicTacApp.controller('TicTacController', function ($scope, $firebase) {

  var html = document.getElementsByTagName('html')[0];
    var removeLoading = function() {
    setTimeout(function() {
    html.className = html.className.replace(/loading/, '');
    }, 3000);
    };
    removeLoading();


var TTTref = new Firebase("https://tictactoe1.firebaseio.com/");
              
  // INITIATE GAME CELLS AND AND GRID LAYOUT
  $scope.cells      = ['','','','','','','','',''];
  $scope.grid       = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];

  $scope.movesCount = $firebase(new Firebase("https://tictactoe1.firebaseIO.com/movesCount"));
  $scope.remoteCellList = $firebase(new Firebase("https://tictactoe1.firebaseIO.com" + '/remoteCellList')) ;
  $scope.remoteCellList.$bind($scope, "cellList");
  $scope.$watch('cellList', function() {
    console.log('Model changed!') ;
  });
  $scope.playerPicks = function(thisCell) {
      console.log("Cell was: " + thisCell.cells) ;
  thisCell.cells = "x" ;
      console.log("Cell is now: " + thisCell.cells) ;
  console.log($scope.movesCount) ;
    // $scope.movesCount = $scope.movesCount + 1 ;
    console.log(TTTRef.movesCounter);
    $scope.movesCounter.$set({movesCounter: $scope.movesCount}) ;
  }


  // DISABLE SPACEBAR FROM SCROLLING DOWN PAGE. ALLOWS SPACEBAR TO ROTATE CUBE 180DEG.
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
      }
    }, false);
  // END SPACEBAR DISABLE FUNCTION.

  
  // INITIATES GENERAL GAME BOOLEANS, VALUES AND VARIABLES FOR 'MOVES' 'GAMEOVER' 'SCORE' 'CELLS' 'EMPTY'
  $scope.currentMark =  'o'; $scope.empty      = true; $scope.movesCount  =        0; $scope.gameover  =  false;
  $scope.leftScore   =    0; $scope.rightScore =    0; $scope.cells  =  $scope.cells; $scope.showbtn   =  false;
  $scope.turn1       = true; // Sets 'x' as true on start for "your turn" image to show.

  // RESPONSIBLE FOR ASSIGING 'X' && 'O' VALUES TO BOARD AND RAISE 'MOVES' COUNT. CHECKS CURRENT PLAYER FOR NEXT TURN.
  // DIVIDES 'GRID' AND 'CELLS' FOR INDEXES TO BE CHECKED FOR WINNING COMBINATIONS BY 'EVALUATEWIN()'.
  $scope.drawMark = function(index) {
    if ($scope.gameover == false && $scope.cells[index] == '') {
      if ($scope.currentMark == 'o') {
        $scope.cells[index]     = 'x';
        $scope.currentMark      = 'x';
        $scope.movesCount          ++;
        $scope.turn1 = false; $scope.turn2 = true;
        document.getElementById( 'leftDiv').style.background =  "rgba(255,0,0,0.3)";
        document.getElementById('rightDiv').style.background = "rgba(70,162,8,0.7)";
    } else {
        $scope.cells[index]     = 'o';
        $scope.currentMark      = 'o';
        $scope.movesCount          ++;
        $scope.turn1 = true; $scope.turn2 = false;
        document.getElementById('rightDiv').style.background = "rgba(100,8,162,0.7)";
        document.getElementById( 'leftDiv').style.background =  "rgba(70,162,8,0.7)";
      }
    }
    var row               =  Math.floor(index/3);
    var column            =          (index % 3);
    $scope.grid[row][column] =   $scope.currentMark;
    if ($scope.gameover == false) $scope.evaluateWin(); }

  // WIN/LOSE LOGIC - PRINTS MESSAGE ON RIGHT && LEFT PANEL FOR DRAWS. 'GAMEOVER' IS TRUE.
  $scope.evaluateWin   = function() {
    var grid = $scope.grid;
    if (grid[0][0] == "x" && grid[0][1] == "x" && grid[0][2] == "x" || grid[1][0] == "x" && grid[1][1] == "x" && grid[1][2] == "x" || grid[2][0] == "x" && grid[2][1] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][0] == "x" && grid[2][0] == "x" || grid[0][1] == "x" && grid[1][1] == "x" && grid[2][1] == "x" || grid[0][2] == "x" && grid[1][2] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][1] == "x" && grid[2][2] == "x" || grid[0][2] == "x" && grid[1][1] == "x" && grid[2][0] == "x") {
      $scope.xwin(); } else if     (grid[0][0] == "o" && grid[0][1] == "o" && grid[0][2] == "o" || grid[1][0] == "o" && grid[1][1] == "o" && grid[1][2] == "o" || grid[2][0] == "o" && grid[2][1] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][0] == "o" && grid[2][0] == "o" || grid[0][1] == "o" && grid[1][1] == "o" && grid[2][1] == "o" || grid[0][2] == "o" && grid[1][2] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][1] == "o" && grid[2][2] == "o" || grid[0][2] == "o" && grid[1][1] == "o" && grid[2][0] == "o") {
      $scope.owin(); } else if ($scope.movesCount == 9) {
      $scope.leftMessage  = "It's a draw..."; $scope.rightMessage = "It's a draw...";
      $scope.messagebox   =                       document.getElementById('message');
      $scope.gameover     = true;
    }
  }

  // DATABINDING AND FUNCTION FOR SETTING PLAYER1 AND PLAYER2 NAME && CSS DISABLE IF 'EMPTY' IS FALSE.
  $scope.setName1      = function(player1Name)              { $scope.player1Name = ''; }
  $scope.setName2      = function(player2Name)              { $scope.player2Name = ''; }
  $scope.removeFocus1  = function(key) { if (key.keyCode  == 13) { key.target.blur(); }}
  $scope.removeFocus2  = function(key) { if (key.keyCode  == 13) { key.target.blur(); }}

  // SHOW WIN/LOSS DATA -- WIN/LOSS 'SCORE' && SHOW/HIDE 'PLAYAGAIN' BUTTON.
  $scope.xwin = function() { $scope.leftMessage  = $scope.player1Name + " wins!"; $scope.gameover =  true; $scope.leftScore  += 1; $scope.showbtn = true; $scope.turn1 = false; $scope.turn2 = false; }
  $scope.owin = function() { $scope.rightMessage = $scope.player2Name + " wins!"; $scope.gameover =  true; $scope.rightScore += 1; $scope.showbtn = true; $scope.turn1 = false; $scope.turn2 = false; }

  // CLEARBOARD FUNCTION FOR 'NEWGAME' BUTTON ON GAME.HTML. CLEARS EVERYTHING EXCEPT FOR WIN/LOSS COUNT AND PLAYER NAMES.
  $scope.clearBoard     = function() { for (var j = 0; j < $scope.cells.length; j++) { $scope.cells[j]          = ''; }
    $scope.leftMessage  = ""; $scope.rightMessage = ""; $scope.currentMark = 'o'; $scope.empty =  true; $scope.movesCount =  0;
    $scope.gameover     = false;      $scope.grid = [[ "" , "" , "" ], [ "" , "" , "" ], [ "" , "" , "" ]];   };

  // FIREBASE CHAT BOX ON GAME.HTML
  var myDataRef = new Firebase('https://tictactoe1.firebaseio.com/chat');
    $('#messageInput').keypress(function (e) { if (e.keyCode == 13) { var name = 'Guest' + Math.floor(Math.random() * 101); var text = $('#messageInput').val();
        myDataRef.push({name: name, text: text}); $('#messageInput').val(''); }});
        myDataRef.on('child_added', function(snapshot) { var message = snapshot.val(); displayChatMessage(message.name, message.text); });
    function displayChatMessage(name, text) { $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight; };})
  // END FIREBASE CHAT BOX