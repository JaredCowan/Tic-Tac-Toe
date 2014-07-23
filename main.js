var TicTacApp = angular.module('TicTacApp', ["firebase"]);
TicTacApp.controller('TicTacController', function ($scope) {

  // INITIATE GAME CELLS AND AND GRID LAYOUT
  var cells         = ['','','','','','','','',''];
  grid              = [
      [ "" , "" , "" ],
      [ "" , "" , "" ],
      [ "" , "" , "" ]
  ];

  // INITIATES GENERAL GAME BOOLEANS, VALUES AND VARIABLES FOR 'MOVES' 'GAMEOVER' 'SCORE' 'CELLS' 'EMPTY'
  var currentMark   = 'o'; var empty         = true; moves         =      0; gameover       =  false;
  $scope.leftScore  =   0; $scope.rightScore =    0; $scope.cells  =  cells; $scope.showbtn =  false;

  // RESPONSIBLE FOR ASSIGING 'X' && 'O' VALUES TO BOARD AND RAISE 'MOVES' COUNT. CHECKS CURRENT PLAYER FOR NEXT TURN.
  // DIVIDES 'GRID' AND 'CELLS' FOR INDEXES TO BE CHECKED FOR WINNING COMBINATIONS BY 'EVALUATEWIN()'.
  $scope.drawMark = function(index) {
    if (gameover == false && cells[index] == '') {
      if (currentMark == 'o') {
        $scope.cells[index]     = 'x';
        currentMark             = 'x';
        moves                      ++;
      } else {
        $scope.cells[index]     = 'o';
        currentMark             = 'o';
        moves                      ++;
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

  var xwin = function () {
    $scope.leftMessage = $scope.player1Name + " wins!";
    gameover           =  true;
    $scope.leftScore  +=     1;
    $scope.showbtn     =  true;
  }

  var owin = function () {
    $scope.rightMessage = $scope.player2Name + " wins!";
    gameover            = true;
    $scope.rightScore  +=    1;
    $scope.showbtn      = true;
  }

  $scope.clearBoard   = function() {
    for (var j = 0; j < cells.length; j++) {
      $scope.cells[j] = '';
    }
    $scope.leftMessage  =    "";
    $scope.rightMessage =    "";
    currentMark         =   'o';
    var empty           =  true;
    moves               =     0;
    gameover            = false;
    grid                = [
        [ "" , "" , "" ],
        [ "" , "" , "" ],
        [ "" , "" , "" ]
    ];
  };
  // FIREBASE CHAT BOX ON GAME.HTML
var myDataRef = new Firebase('https://tictactoe1.firebaseio.com/chat');
  $('#messageInput').keypress(function (e) { if (e.keyCode == 13) { var name = $('#nameInput').val(); var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text}); $('#messageInput').val(''); }});
      myDataRef.on('child_added', function(snapshot) { var message = snapshot.val(); displayChatMessage(message.name, message.text); });
  function displayChatMessage(name, text) { $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight; };})
// END FIREBASE CHAT BOX

