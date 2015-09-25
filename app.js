var board = {
  name: undefined,
  opponent: undefined,
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
      alert ("Computer moves first.")
      this.computerMove();
    }
    if (this.currentSymbol === "O") {
      $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');
    } else {$('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');}

  },

  switchPlayer: function() {
    if (this.currentSymbol == "X") {
      this.currentSymbol = "O";
      $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');
    }
    else if (this.currentSymbol == "O") {
      this.currentSymbol = "X";
      $('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');
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
            alert ("Computer wins!");
            this.computerScore +=1;
        }
        this.reset();
      }
      else if (this.winner === "O") {
        if (this.playerSymbol === "O") {
          alert(this.name + " wins!");
          this.playerScore +=1;
        } else {
          alert ("Computer wins!");
          this.computerScore +=1;
        }
        this.reset();
      }

      $('#score').text(this.name + ": "+ board.playerScore + " vs. Computer: " + board.computerScore);
    },

    reset: function () {
      var choiceDisplay = $('h3');
      this.currentSymbol = undefined;

      this.boardState = ["","","","","","","","",""];
      boardView.render();

      choiceDisplay.text("Choose X (Giants) or O (Jets)");
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

    playPlayer.on('click', function () {
      board.opponent = "player";
    })

    playComputer.on('click', function () {
      board.opponent = "computer";
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
          $(this).remove();
          $('#nameLabel').remove();
          $('#score').text(name + ":"+ board.playerScore + " vs. Computer:" + board.computerScore);
          // $('#options').css('display', 'inline-block');

         $('#startScreen').css('visibility','hidden');
         $('#secondScreen').css('visibility','visible');
      //    $('#secondScreen').fadeIn("slow");
        }
      }
    });



    //set x and o button handlers
    chooseX.on('click', function () {
      board.currentSymbol = "X";
      board.playerSymbol = "X";
      board.otherSymbol = "O";
      choiceDisplay.text("You choose X (Giants)");
      // $('#X').css('display', 'none');
      // $('#O').css('display', 'none');
//      $('#coin').css('display', 'inline-block');
      // $('.board').css('display', 'block');
      // $('#newgame').css('display', 'inline-block');
    });

    chooseO.on('click', function () {
      board.currentSymbol = "O";
      board.playerSymbol = "O";
      board.otherSymbol = "X";
      choiceDisplay.text("You choose O (Jets)");
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
