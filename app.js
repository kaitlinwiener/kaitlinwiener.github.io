var board = {
  playerSymbol: undefined,
  computerSymbol: undefined,
  boardState : ["","","","","","","","","",],
  currentSymbol: undefined,
  fullBoard: false,
  winner: undefined,

  pickFirstPlayer: function (choice) {
    var choose = Math.floor(Math.random()*2)
    if (choose === 0) {
      this.currentSymbol = this.playerSymbol;
      alert ("You go first!");
    } else {this.currentSymbol = this.computerSymbol;
      alert ("Computer moves first.")
      this.computerMove();
    }
    if (this.currentSymbol === "O") {
      console.log(this.currentSymbol);
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
      var randomNumber = Math.floor(Math.random()*availableOptionsLength + 1);

      var computerChoice = availableOptions[randomNumber];
      this.boardState[computerChoice] = this.computerSymbol;

      boardView.render();
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
    this.fullBoard = true;
    for (var i = 0; i<this.boardState.length; i++) {
      if (this.boardState[i] == "") {
        this.fullBoard = false;
      }
    }

  },

  determineWinner: function () {
    //remember boardState index is one less than the number of the square
      this.checkRow();
      this.checkColumn();
      this.checkDiagonal();
      this.checkFullBoard();

      if (this.winner === "X") {
        console.log(this.currentSymbol, this.playerSymbol, this.computerSymbol);
        board.reset();
        boardView.render();
        if (this.playerSymbol === "X") {
          alert("Player wins!");
        } else {alert ("Computer wins!");}
      }
      else if (this.winner === "O") {
        console.log(this.currentSymbol, this.playerSymbol, this.computerSymbol);
        board.reset();
        boardView.render();
        if (this.playerSymbol === "O") {
          alert("Player wins!");
        } else {alert ("Computer wins!");}
      }
      else if (this.fullBoard == true) {
        console.log(this.currentSymbol, this.playerSymbol, this.computerSymbol);
        board.reset();
        boardView.render();
        alert ("Tie");
      }
    },

    reset: function () {
      var choiceDisplay = $('h2');

      this.boardState = ["","","","","","","","","",];
      boardView.render();
      choiceDisplay.text("Choose X or O");
      this.playerSymbol = undefined;
      this.computerSymbol = undefined;
      this.currentSymbol = undefined;
      $('.board').css('cursor', 'default');

    },

  };

  var boardView = {
  thisView: this,

  setHandlers: function () {
    boardState = board.boardState;
    currentSymbol = board.currentSymbol;
    var nameInput = $('#nameInput');
    var chooseX = $('#X');
    var chooseO = $('#O');
    var choiceDisplay = $('h2');
    var tictactoeBoard = $('.board');
    var heads = $('#heads');
    var tails = $('#tails');

    //set new game handlers
    $("#newgame").on('click', function () {
      board.pickFirstPlayer();
    });

    nameInput.on('keypress', function (e) {
      if (e.charCode === 13) {
        var name = $(this).val();
        var header = $('h1');

        header.text("Welcome " + name + "!");

        $(this).remove();
        $('#nameLabel').remove();
        // $('#options').css('display', 'inline-block');
      }
    });

    //set x and o button handlers
    chooseX.on('click', function () {
      board.currentSymbol = "X";
      board.playerSymbol = "X";
      board.computerSymbol = "O";
      choiceDisplay.text("You choose X");
//      $('#coin').css('display', 'inline-block');
      // $('.board').css('display', 'block');
      // $('#newgame').css('display', 'inline-block');
    });

    chooseO.on('click', function () {
      board.currentSymbol = "O";
      board.playerSymbol = "O";
      board.computerSymbol = "X";
      choiceDisplay.text("You choose O");
      // $('.board').css('display', 'block');
      // $('#newgame').css('display', 'inline-block');
    });

    heads.on('click', function () {
      console.log("clicked");
      board.pickFirstPlayer('Heads');
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
      boardState[0] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square2.on('click', function () {
      boardState[1] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square3.on('click', function () {
      boardState[2] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square4.on('click', function () {
      boardState[3] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square5.on('click', function () {
      boardState[4] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square6.on('click', function () {
      boardState[5] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square7.on('click', function () {
      boardState[6] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square8.on('click', function () {
      boardState[7] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

    square9.on('click', function () {
      boardState[8] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
      setTimeout(function () {
        board.computerMove();
      }, 500);
    })

  },

  render: function () {
    for (var i=1; i<=board.boardState.length; i++) {
      $("." + (i)).text(board.boardState[i-1]);
    }
 },

};

boardView.setHandlers();
