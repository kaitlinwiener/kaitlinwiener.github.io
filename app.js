var board = {
  name: undefined,
  playerSymbol: undefined,
  computerSymbol: undefined,
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
      alert ("You go first!");
    } else {
      this.currentSymbol = this.computerSymbol;
      alert ("Computer moves first.")
      this.computerMove();
    }
    if (this.currentSymbol === "O") {
      $('.board').css('cursor', 'url("https://i.ppy.sh/9477d15f1f619eb775eaf3e485ed33b0038d8989/687474703a2f2f7075752e73682f3133674a61"), default');
    } else {$('.board').css('cursor', 'url("http://geeko.ioda.net/git/art/cursors/dmz-aa/pngs/32x32/X_cursor.png"), default');}

  },

  switchPlayer: function() {
    if (this.currentSymbol == "X") {
      this.currentSymbol = "O";
      $('.board').css('cursor', 'url("https://i.ppy.sh/9477d15f1f619eb775eaf3e485ed33b0038d8989/687474703a2f2f7075752e73682f3133674a61"), default');
    }
    else if (this.currentSymbol == "O") {
      this.currentSymbol = "X";
      $('.board').css('cursor', 'url("http://geeko.ioda.net/git/art/cursors/dmz-aa/pngs/32x32/X_cursor.png"), default');
    }
  },

  computerMove: function () {
    if (this.currentSymbol == this.computerSymbol) {
      var availableOptions = [];
      for (var i=0; i<this.boardState.length; i++) {
        if (this.boardState[i] == "") {
          availableOptions.push(i);
        }
      }
      var availableOptionsLength = availableOptions.length;
      var randomNumber = Math.floor(Math.random()*availableOptionsLength);

      var computerChoice = availableOptions[randomNumber];

      this.boardState[computerChoice] = this.computerSymbol;
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
          alert("Player wins!");
          this.playerScore +=1;
        } else {
            alert ("Computer wins!");
            this.computerScore +=1;
        }
        this.reset();
      }
      else if (this.winner === "O") {
        if (this.playerSymbol === "O") {
          alert("Player wins!");
          this.playerScore +=1;
        } else {
          alert ("Computer wins!");
          this.computerScore +=1;
        }
        this.reset();
      }

      $('#score').text(this.name + ":"+ board.playerScore + " vs. Computer:" + board.computerScore);
    },

    reset: function () {
      var choiceDisplay = $('h2');
      this.currentSymbol = undefined;

      this.boardState = ["","","","","","","","",""];
      boardView.render();

      choiceDisplay.text("Choose X or O");
      this.playerSymbol = undefined;
      this.computerSymbol = undefined;
      this.winner = undefined;
      this.fullBoard = undefined;
      $('.board').css('cursor', 'default');
      $('#X').prop("checked", false);
      $('#O').prop("checked", false);

      // $('#label1').css('display', 'inline-block');
      // $('#label2').css('display', 'inline-block');

      console.log(this.boardState);
    },
  };

  var boardView = {
  thisView: this,

  setHandlers: function () {
    var nameInput = $('#nameInput');
    var chooseX = $('#X');
    var chooseO = $('#O');
    var choiceDisplay = $('h2');
    var tictactoeBoard = $('.board');
    var heads = $('#heads');
    var tails = $('#tails');

    //set new game handlers
    $("#newgame").on('click', function () {
      //board.reset();
      if ($('#O').prop("checked") == false && $('#X').prop("checked") == false) {
        alert("Please select X or O");
      }
      else if ($('#O').prop("checked")) {
        board.playerSymbol = "O";
        board.computerSymbol = "X";
        board.pickFirstPlayer();
      } else {
        board.playerSymbol = "X";
        board.computerSymbol = "O";
        board.pickFirstPlayer();
      }

    });

    nameInput.on('keypress', function (e) {
      if (e.charCode === 13) {
        var name = $(this).val();
        var header = $('h1');

        header.text("Welcome " + name + "!");
        board.name = name;
        $(this).remove();
        $('#nameLabel').remove();
        $('#score').text(name + ":"+ board.playerScore + " vs. Computer:" + board.computerScore);
        // $('#options').css('display', 'inline-block');
        $('#startScreen').css('visibility','hidden');
        $('#secondScreen').css('visibility','visible');

      }
    });

    //set x and o button handlers
    chooseX.on('click', function () {
      board.currentSymbol = "X";
      board.playerSymbol = "X";
      board.computerSymbol = "O";
      choiceDisplay.text("You choose X");
      // $('#X').css('display', 'none');
      // $('#O').css('display', 'none');
//      $('#coin').css('display', 'inline-block');
      // $('.board').css('display', 'block');
      // $('#newgame').css('display', 'inline-block');
    });

    chooseO.on('click', function () {
      board.currentSymbol = "O";
      board.playerSymbol = "O";
      board.computerSymbol = "X";
      choiceDisplay.text("You choose O");
      // $('#labels').css('display', 'none');
      // $('#X').css('display', 'none');
      // $('#O').css('display', 'none');
      // $('.board').css('display', 'block');
      // $('#newgame').css('display', 'inline-block');
    });

    // heads.on('click', function () {
    //   console.log("clicked");
    //   board.pickFirstPlayer('Heads');
    // });

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

        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square2.on('click', function () {
      if (square2.text() == "") {
        board.boardState[1] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square3.on('click', function () {
      if (square3.text() == "") {
        board.boardState[2] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square4.on('click', function () {
      if (square4.text() == "") {
        board.boardState[3] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();
        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square5.on('click', function () {
      if (square5.text() == "") {
        board.boardState[4] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();
        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square6.on('click', function () {
      if (square6.text() == "") {
        board.boardState[5] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();
        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square7.on('click', function () {
      if (square7.text() == "") {
        board.boardState[6] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();
        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square8.on('click', function () {
      if (square8.text() == "") {
        board.boardState[7] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        setTimeout(function () {
          board.computerMove();
        }, 1000);
      }
    })

    square9.on('click', function () {
      if (square9.text() == "") {
        board.boardState[8] = board.currentSymbol;
        boardView.render();
        board.determineWinner();
        board.checkFullBoard();
        board.switchPlayer();

        setTimeout(function () {
          board.computerMove();
        }, 1000);
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
