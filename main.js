var TicTacApp = angular.module('TicTacApp', ["firebase"]);
TicTacApp.controller('TicTacController', function ($scope, $firebase) {
  // var playerMoves = new Firebase("https://tictactoe1.firebaseio.com/board");
              
  // INITIATE GAME CELLS AND AND GRID LAYOUT
  var cells      = ['','','','','','','','',''];
  grid           = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];

  // DISABLE SPACEBAR FROM SCROLLING DOWN PAGE. ALLOWS SPACEBAR TO ROTATE CUBE 180DEG.
    document.documentElement.addEventListener('keydown', function (e) {
      if ( ( e.keycode || e.which ) == 32) {
        e.preventDefault();
      }
    }, false);
  // END SPACEBAR DISABLE FUNCTION.

  $scope.turn1 = true; // Sets 'x' as true on start for "your turn" image to show.
  // INITIATES GENERAL GAME BOOLEANS, VALUES AND VARIABLES FOR 'MOVES' 'GAMEOVER' 'SCORE' 'CELLS' 'EMPTY'
  var currentMark   = 'o'; var empty         = true; $scope.moves  =      0; gameover       =  false;
  $scope.leftScore  =   0; $scope.rightScore =    0; $scope.cells  =  cells; $scope.showbtn =  false;

  // RESPONSIBLE FOR ASSIGING 'X' && 'O' VALUES TO BOARD AND RAISE 'MOVES' COUNT. CHECKS CURRENT PLAYER FOR NEXT TURN.
  // DIVIDES 'GRID' AND 'CELLS' FOR INDEXES TO BE CHECKED FOR WINNING COMBINATIONS BY 'EVALUATEWIN()'.
  $scope.drawMark = function(index) {
    if (gameover == false && cells[index] == '') {
      if (currentMark == 'o') {
        $scope.cells[index]     = 'x';
        currentMark             = 'x';
        $scope.moves               ++;
        $scope.turn1 = false; $scope.turn2 = true;
        document.getElementById( 'leftDiv').style.background =  "rgba(255,0,0,0.3)";
        document.getElementById('rightDiv').style.background = "rgba(70,162,8,0.7)";
    } else {
        $scope.cells[index]     = 'o';
        currentMark             = 'o';
        $scope.moves               ++;
        $scope.turn1 = true; $scope.turn2 = false;
        document.getElementById('rightDiv').style.background = "rgba(100,8,162,0.7)";
        document.getElementById( 'leftDiv').style.background =  "rgba(70,162,8,0.7)";
      }
    }
    var row           =  Math.floor(index/3);
    var column        =          (index % 3);
    grid[row][column] =          currentMark;
    if (gameover == false)     evaluateWin();
  }
  // WIN/LOSE LOGIC - PRINTS MESSAGE ON RIGHT && LEFT PANEL FOR DRAWS. 'GAMEOVER' IS TRUE.
  var evaluateWin   = function() {
    if (grid[0][0] == "x" && grid[0][1] == "x" && grid[0][2] == "x" || grid[1][0] == "x" && grid[1][1] == "x" && grid[1][2] == "x" || grid[2][0] == "x" && grid[2][1] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][0] == "x" && grid[2][0] == "x" || grid[0][1] == "x" && grid[1][1] == "x" && grid[2][1] == "x" || grid[0][2] == "x" && grid[1][2] == "x" && grid[2][2] == "x" || grid[0][0] == "x" && grid[1][1] == "x" && grid[2][2] == "x" || grid[0][2] == "x" && grid[1][1] == "x" && grid[2][0] == "x") {
      xwin(); } else if     (grid[0][0] == "o" && grid[0][1] == "o" && grid[0][2] == "o" || grid[1][0] == "o" && grid[1][1] == "o" && grid[1][2] == "o" || grid[2][0] == "o" && grid[2][1] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][0] == "o" && grid[2][0] == "o" || grid[0][1] == "o" && grid[1][1] == "o" && grid[2][1] == "o" || grid[0][2] == "o" && grid[1][2] == "o" && grid[2][2] == "o" || grid[0][0] == "o" && grid[1][1] == "o" && grid[2][2] == "o" || grid[0][2] == "o" && grid[1][1] == "o" && grid[2][0] == "o") {
      owin(); } else if (moves == 9) {
      $scope.leftMessage  = "It's a draw..."; $scope.rightMessage = "It's a draw...";
      var messagebox      =                       document.getElementById('message');
      gameover            = true;
    }
  }

  // DATABINDING AND FUNCTION FOR SETTING PLAYER1 AND PLAYER2 NAME && CSS DISABLE IF 'EMPTY' IS FALSE.
  $scope.setName1      = function(player1Name)              { $scope.player1Name = ''; }
  $scope.setName2      = function(player2Name)              { $scope.player2Name = ''; }
  $scope.removeFocus1  = function(key) { if (key.keyCode  == 13) { key.target.blur(); }}
  $scope.removeFocus2  = function(key) { if (key.keyCode  == 13) { key.target.blur(); }}

  // SHOW WIN/LOSS DATA -- WIN/LOSS 'SCORE' && SHOW/HIDE 'PLAYAGAIN' BUTTON.
  var xwin = function() { $scope.leftMessage  = $scope.player1Name + " wins!"; gameover =  true; $scope.leftScore  += 1; $scope.showbtn = true; $scope.turn1 = false; $scope.turn2 = false; }
  var owin = function() { $scope.rightMessage = $scope.player2Name + " wins!"; gameover =  true; $scope.rightScore += 1; $scope.showbtn = true; $scope.turn1 = false; $scope.turn2 = false; }

  // CLEARBOARD FUNCTION FOR 'NEWGAME' BUTTON ON GAME.HTML. CLEARS EVERYTHING EXCEPT FOR WIN/LOSS COUNT AND PLAYER NAMES.
  $scope.clearBoard     = function() { for (var j = 0; j < cells.length; j++) { $scope.cells[j]     = ''; }
    $scope.leftMessage  = ""; $scope.rightMessage = ""; currentMark = 'o'; var empty =  true; $scope.moves =  0;
    gameover            = false; grid  = [[ "" , "" , "" ], [ "" , "" , "" ], [ "" , "" , "" ]]; };

  // FIREBASE CHAT BOX ON GAME.HTML
  var myDataRef = new Firebase('https://tictactoe1.firebaseio.com/chat');
    $('#messageInput').keypress(function (e) { if (e.keyCode == 37) { var name = 'Guest' + Math.floor(Math.random() * 101); var text = $('#messageInput').val();
        myDataRef.push({name: name, text: text}); $('#messageInput').val(''); }});
        myDataRef.on('child_added', function(snapshot) { var message = snapshot.val(); displayChatMessage(message.name, message.text); });
    function displayChatMessage(name, text) { $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight; };})
  // END FIREBASE CHAT BOX