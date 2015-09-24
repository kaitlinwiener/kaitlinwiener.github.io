var board = {
  playerSymbol: undefined,
  computerSymbol: undefined,
  boardState : ["","","","","","","","","",],
  currentSymbol: undefined,
  winner: undefined,

  pickFirstPlayer: function () {
    var choose = Math.floor(Math.random()*2)
    if (choose === 0) {
      this.currentSymbol = this.playerSymbol;
      alert ("You go first!");
    } else {this.currentSymbol = this.computerSymbol;
      alert ("Computer moves first.")
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
    else {
      this.currentSymbol = "X";
      $('.board').css('cursor', 'url("http://geeko.ioda.net/git/art/cursors/dmz-aa/pngs/32x32/X_cursor.png"), default');
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

  determineWinner: function () {
    //remember boardState index is one less than the number of the square
      this.checkRow();
      this.checkColumn();
      this.checkDiagonal();

      if (this.winner === "X") {
        if (this.playerSymbol === "X") {
          alert("Player wins!");
        } else {alert ("Computer wins!");}
      }
      else if (this.winner === "O") {
        if (this.playerSymbol === "O") {
          alert("Player wins!");
        } else {alert ("Computer wins!");}
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

    //set new game handler
    $("#newgame").on('click', function () {
      for (var i=0; i<boardState.length; i++) {
        $("." + i).text("");
      }
      board.reset();
    });

    nameInput.on('keypress', function (e) {
      if (e.charCode === 13) {
        var name = $(this).val();
        var header = $('h1');

        header.text("Welcome " + name + "!");

        $(this).remove();
        $('#nameLabel').remove();
        $('#options').css('display', 'block');
      }
    })

    //set x and o button handlers
    $(chooseX).on('click', function () {
      board.playerSymbol = "X";
      board.computerSymbol = "O";
      choiceDisplay.text("You choose X");
      $('.board').css('display', 'block');
      $('#newgame').css('display', 'inline-block');
    });

    $(chooseO).on('click', function () {
      board.playerSymbol = "O";
      board.computerSymbol = "X";
      choiceDisplay.text("You choose O");
      $('.board').css('display', 'block');
      $('#newgame').css('display', 'inline-block');
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
    })

    square2.on('click', function () {
      boardState[1] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square3.on('click', function () {
      boardState[2] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square4.on('click', function () {
      boardState[3] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square5.on('click', function () {
      boardState[4] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square6.on('click', function () {
      boardState[5] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square7.on('click', function () {
      boardState[6] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square8.on('click', function () {
      boardState[7] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

    square9.on('click', function () {
      boardState[8] = board.currentSymbol;
      boardView.render();
      board.determineWinner();
      board.switchPlayer();
    })

  },

  render: function () {
    for (var i=1; i<=board.boardState.length; i++) {
      $("." + (i)).text(board.boardState[i-1]);
    }
 },

};

boardView.setHandlers();
