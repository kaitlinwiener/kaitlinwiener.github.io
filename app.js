var board = {
  name: undefined,
  opponent: undefined,
  opponentName: undefined,
  playerSymbol: undefined,
  otherSymbol: undefined,
  boardState : ["","","","","","","","","",],
  currentSymbol: undefined,
  fullBoard: undefined,
  winner: undefined,
  playerScore: 0,
  computerScore: 0,

  pickFirstPlayer: function () {
    var choosePlayer = Math.floor(Math.random()*2)
    if (choosePlayer === 0) {
      this.currentSymbol = this.playerSymbol;
      alert (this.name + " go first!");
    } else {
      this.currentSymbol = this.otherSymbol;
      alert (this.opponentName + " moves first.")
      if (this.opponentName === "Computer") {
        this.computerMove();
      }
    }
    if (this.currentSymbol === "O") {
      $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');
    } else {$('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');}

  },

  switchPlayer: function() {
    if (this.currentSymbol == "X") {
      this.currentSymbol = "O";
      $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');

      if (this.playerSymbol == "0") {
        $('h3').text(this.name + "'s turn");
      }
      else {
        $('h3').text(this.opponentName + "'s turn");
      }
    }
    else if (this.currentSymbol == "O") {
      this.currentSymbol = "X";
      $('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');

      if (this.playerSymbol = "X") {
        $('h3').text(this.name + "'s turn");
      }
      else {
        $('h3').text(this.opponentName + "'s turn");
      }
    }
  },

  computerMove: function () {
    if (this.currentSymbol == this.otherSymbol) {
      var availableOptions = [];
      for (var i=0; i<this.boardState.length; i++) {
        if (this.boardState[i] == "") {
          availableOptions.push(i);
        }
      }
      var availableOptionsLength = availableOptions.length;
      var randomNumber = Math.floor(Math.random()*availableOptionsLength);

      var computerChoice = availableOptions[randomNumber];

      this.boardState[computerChoice] = this.otherSymbol;

      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    }

  },

  checkRow: function () {
      if (this.boardState[0] != "" && this.boardState[0] === this.boardState[1] && this.boardState[0] === this.boardState[2]
            || this.boardState[3] != "" && this.boardState[3] === this.boardState[4] && this.boardState[3] === this.boardState[5]
            || this.boardState[6] != "" && this.boardState[6] === this.boardState[7] && this.boardState[6] === this.boardState[8]) {
            this.winner = this.currentSymbol;
      }
  },

  checkColumn: function () {
      if (this.boardState[0] != "" && this.boardState[0] === this.boardState[3] && this.boardState[0] === this.boardState[6]
            || this.boardState[1] != "" && this.boardState[1] === this.boardState[4] && this.boardState[1] === this.boardState[7]
            || this.boardState[2] != "" && this.boardState[2] === this.boardState[5] && this.boardState[2] === this.boardState[8]) {
            this.winner = this.currentSymbol;
      }
  },

  checkDiagonal: function () {
      if (this.boardState[0] != "" && this.boardState[0] === this.boardState[4] && this.boardState[0] === this.boardState[8]
            || this.boardState[2] != "" && this.boardState[2] === this.boardState[4] && this.boardState[2] === this.boardState[6]) {
            this.winner = this.currentSymbol;
      }
  },

  checkFullBoard: function () {
    if (this.boardState[0] != "" && this.boardState[1] != "" && this.boardState[2] != "" && this.boardState[3] != "" &&
         this.boardState[4] != "" && this.boardState[5] != "" && this.boardState[6] != "" && this.boardState[7] != "" &&
         this.boardState[8] != "" && this.winner == undefined) {
           alert ("Tie");
           this.reset();
         }
  },

  determineWinner: function () {
    //remember boardState index is one less than the number of the square
      this.checkRow();
      this.checkColumn();
      this.checkDiagonal();
      this.checkFullBoard();

      if (this.winner === "X") {
        if (this.playerSymbol === "X") {
          alert(this.name + " wins!");
          this.playerScore +=1;
        } else {
            alert (this.opponentName + " wins!");
            this.computerScore +=1;
        }
        this.reset();
      }
      else if (this.winner === "O") {
        if (this.playerSymbol === "O") {
          alert(this.name + " wins!");
          this.playerScore +=1;
        } else {
          alert (this.opponentName + " wins!");
          this.computerScore +=1;
        }
        this.reset();
      }

      $('#score').text(this.name + ": "+ board.playerScore + " vs. " + board.opponentName + ": " + board.computerScore);
    },

    reset: function () {
      var choiceDisplay = $('h3');
      this.currentSymbol = undefined;

      this.boardState = ["","","","","","","","",""];
      boardView.render();

      choiceDisplay.text(this.name + ", choose X (Giants) or O (Jets)");
      this.playerSymbol = undefined;
      this.otherSymbol = undefined;
      this.winner = undefined;
      this.fullBoard = undefined;
      $('.board').css('cursor', 'default');
      $('#X').prop("checked", false);
      $('#O').prop("checked", false);

      // $('#label1').css('display', 'inline-block');
      // $('#label2').css('display', 'inline-block');

    },
  };

  var boardView = {
  thisView: this,

  setHandlers: function () {
    var nameInput = $('#nameInput'),
        playPlayer = $('#playPlayer'),
        playComputer = $('#playComputer'),
        secondNameInput = $('#secondNameInput'),
        chooseX = $('#X'),
        chooseO = $('#O'),
        choiceDisplay = $('h3'),
        tictactoeBoard = $('.board'),
        heads = $('#heads'),
        tails = $('#tails');

    //set new game handlers
    $("#newgame").on('click', function () {
      //board.reset();
      if ($('#O').prop("checked") == false && $('#X').prop("checked") == false) {
        alert("Please select X or O");
      }
      else if ($('#O').prop("checked")) {
        board.playerSymbol = "O";
        board.otherSymbol = "X";
        board.pickFirstPlayer();
      } else {
        board.playerSymbol = "X";
        board.otherSymbol = "O";
        board.pickFirstPlayer();
      }

    });

    playPlayer.on('click', function (e) {
      board.opponent = "player";

      $('#secondNameLabel').css('visibility','visible');
      $('#secondNameInput').css('visibility','visible');
    })

    secondNameInput.on('keypress', function (e) {
      if (e.charCode === 13) {
        board.opponentName = $(this).val();

        if (nameInput.val() == "") {
          alert("Enter first player's name")
        }
        else {
          board.name = nameInput.val();
          $('h1').text("Welcome " + board.name + " and " + board.opponentName + "!");
          $('#score').text(board.name + ": " + board.playerScore + " vs. " + board.opponentName + ": " + board.computerScore);
          choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
          $(this).remove();
          $('#secondNameLabel').remove();
          $('#startScreen').css('visibility','hidden');
          $('#secondScreen').css('visibility','visible');
        }
      }
    })

    playComputer.on('click', function () {
      board.opponent = "computer";
      board.opponentName = "Computer";

      if (nameInput.val() != "") {
        $('#startScreen').css('visibility','hidden');
        $('#secondScreen').css('visibility','visible');

        board.name = nameInput.val();
        $('h1').text("Welcome " + board.name + "!");
        choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
        $('#score').text(board.name + ":"+ board.playerScore + " vs. Computer:" + board.computerScore);

      }
    })

    nameInput.on('keypress', function (e) {
        if (e.charCode === 13) {
          if (playPlayer.prop("checked") == false && playComputer.prop("checked") == false) {
            alert("Please select an opponent");
          }
          else {
          var name = $(this).val();
          var header = $('h1');

          header.text("Welcome " + name + "!");
          board.name = name;

          if (playPlayer.prop("checked")) {
            if(secondNameInput.val() === "") {
              alert("Enter second player's name");
            }
            else {
              board.opponentName = secondNameInput.val();
              header.text("Welcome " + board.name + " and " + board.opponentName + "!");
              choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
              $(this).remove();
              $('#nameLabel').remove();
              $('#score').text(name + ": " + board.playerScore + " vs. " + board.opponentName + ": " + board.computerScore);

              $('#startScreen').css('visibility','hidden');
              $('#secondScreen').css('visibility','visible');

              $('#secondNameInput').remove();
              $('#secondNameLabel').remove();
            }
          }

          else if (playComputer.prop("checked")) {
            if ($(this).val() === "") {
              alert("Please enter name");
            }
            else {
              header.text("Welcome " + board.name + "!");

              $(this).remove();
              $('#nameLabel').remove();
              $('#score').text(board.name + ":"+ board.playerScore + " vs. Computer:" + board.computerScore);
              choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");

              $('#startScreen').css('visibility','hidden');
              $('#secondScreen').css('visibility','visible');
            }
          }
        }
      }
    });

    //set x and o button handlers
    chooseX.on('click', function () {
      board.currentSymbol = "X";
      board.playerSymbol = "X";
      board.otherSymbol = "O";
      choiceDisplay.text(board.name + " chooses X (Giants)");
    });

    chooseO.on('click', function () {
      board.currentSymbol = "O";
      board.playerSymbol = "O";
      board.otherSymbol = "X";
      choiceDisplay.text(board.name + " chooses O (Jets)");
    });

    var square1 = $('.1'),
        square2 = $('.2'),
        square3 = $('.3'),
        square4 = $('.4'),
        square5 = $('.5'),
        square6 = $('.6'),
        square7 = $('.7'),
        square8 = $('.8'),
        square9 = $('.9');

    square1.on('click', function () {
      if (square1.text() == "") {
        board.boardState[0] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square2.on('click', function () {
      if (square2.text() == "") {
        board.boardState[1] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square3.on('click', function () {
      if (square3.text() == "") {
        board.boardState[2] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square4.on('click', function () {
      if (square4.text() == "") {
        board.boardState[3] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square5.on('click', function () {
      if (square5.text() == "") {
        board.boardState[4] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square6.on('click', function () {
      if (square6.text() == "") {
        board.boardState[5] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square7.on('click', function () {
      if (square7.text() == "") {
        board.boardState[6] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }

      }
    })

    square8.on('click', function () {
      if (square8.text() == "") {
        board.boardState[7] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

    square9.on('click', function () {
      if (square9.text() == "") {
        board.boardState[8] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        if (board.opponent == "computer") {
          setTimeout(function () {
            board.computerMove();
          }, 1500);
        }
      }
    })

  },

  render: function () {
    for (var i=1; i<=board.boardState.length; i++) {
      $("." + (i)).text(board.boardState[i-1]);
    }
 },

};

boardView.setHandlers();
