var board = {
  name: undefined,
  opponent: undefined,
  opponentName: undefined,
  whoPicksSymbol: undefined,
  playerSymbol: undefined,
  opponentSymbol: undefined,
  boardState : ["","","","","","","","","",],
  currentSymbol: undefined,
  strategicMoveOptions: [],
  fullBoard: undefined,
  winner: undefined,
  playerScore: 0,
  opponentScore: 0,

  pickFirstPlayer: function () {
    //randomly choose who goes first
    var choosePlayer = Math.floor(Math.random()*2)

    if (choosePlayer === 0) {
      this.currentSymbol = this.playerSymbol;
      alert (this.name + " go first!");
    } else {
      this.currentSymbol = this.opponentSymbol;
      alert (this.opponentName + " moves first.")
      if (this.opponentName === "Computer") {
        this.computerMove();
      }
    }
    if (this.currentSymbol === "O") {
      if ($('body').hasClass('football')) {
        $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');
      } else if ($('body').hasClass('basketball')) {
        $('.board').css('cursor', 'url("http://www.nba.com/media/njn_50px.gif"), default');
      } else if ($('body').hasClass('baseball'))  {
        $('.board').css('cursor', 'url("https://lh3.googleusercontent.com/-GWZ5tpqutFI/AAAAAAAAAAI/AAAAAAAAT8I/pder2YoCqKE/s46-c-k-no/photo.jpg"), default');
      } else {
        $('.board').css('cursor', 'url("https://static.globalcitizen.org/static/img/o-logo.a54ec4957321.png"), default');
      }

    } else {
        if ($('body').hasClass('football')) {
          $('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');
        } else if ($('body').hasClass('basketball')) {
          $('.board').css('cursor', 'url("https://pbs.twimg.com/profile_images/378800000581876664/655755f8e7f689a29dc69ca3382fc676_normal.jpeg"), default');
        } else if ($('body').hasClass('baseball')){
          $('.board').css('cursor', 'url("https://pbs.twimg.com/profile_images/619233476978569216/eyNgj0_K_normal.jpg"), default');
        } else {
          $('.board').css('cursor', 'url("https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png"), default');
        }
    }
  },

  switchPlayer: function() {
    if (this.currentSymbol == "X") {
      this.currentSymbol = "O";

      if ($('body').hasClass('football')) {
        $('.board').css('cursor', 'url("http://multimedia.3m.com/mws/media/912031P/scotch-r-nfl-tape-dispenser-c32-helmet-nyj.jpg?boundedSize=40"), default');
      } else if ($('body').hasClass('basketball')) {
        $('.board').css('cursor', 'url("http://www.nba.com/media/njn_50px.gif"), default');
      } else if ($('body').hasClass('baseball'))  {
        $('.board').css('cursor', 'url("https://lh3.googleusercontent.com/-GWZ5tpqutFI/AAAAAAAAAAI/AAAAAAAAT8I/pder2YoCqKE/s46-c-k-no/photo.jpg"), default');
      } else {
        $('.board').css('cursor', 'url("https://static.globalcitizen.org/static/img/o-logo.a54ec4957321.png"), default');
      }

      if (this.playerSymbol == "O") {
        $('h3').text(this.name + "'s turn");
      }
      else {
        $('h3').text(this.opponentName + "'s turn");
      }
    }
    else if (this.currentSymbol == "O") {
      this.currentSymbol = "X";

        if ($('body').hasClass('football')) {
          $('.board').css('cursor', 'url("http://cdn.sportsmemorabilia.com/sports-product-image/new_york_giants-l283-45.jpg"), default');
        } else if ($('body').hasClass('basketball')) {
          $('.board').css('cursor', 'url("https://pbs.twimg.com/profile_images/378800000581876664/655755f8e7f689a29dc69ca3382fc676_normal.jpeg"), default');
        } else if ($('body').hasClass('baseball')){
          $('.board').css('cursor', 'url("https://pbs.twimg.com/profile_images/619233476978569216/eyNgj0_K_normal.jpg"), default');
        } else {
          $('.board').css('cursor', 'url("https://upload.wikimedia.org/wikipedia/commons/d/da/Crystal_button_cancel.png"), default');
        }

      if (this.playerSymbol == "X") {
        $('h3').text(this.name + "'s turn");
      }
      else {
        $('h3').text(this.opponentName + "'s turn");
      }
    }
  },

  //check if the board is empty or not - when press start game use this to determine if mid game
  checkBoardEmpty: function () {
    for (var i=0; i<this.boardState.length; i++) {
      if (this.boardState[i] != "") {
        return false;
      }
    }
    return true;
  },

  checkForTwo: function (position) {
    if (position === 0) {
      if ((this.boardState[1] != "" && this.boardState[1] === this.boardState[2])
          || (this.boardState[3] != "" && this.boardState[3] === this.boardState[6])
          || (this.boardState[4] != "" && this.boardState[4] === this.boardState[8])) {
            this.strategicMoveOptions.push(0);
          }
        }
      else if (position === 1) {
        if ((this.boardState[0] != "" && this.boardState[0] === this.boardState[2])
            || (this.boardState[4] != "" && this.boardState[4] === this.boardState[7])) {
              this.strategicMoveOptions.push(1);
          }
        }

      else if (position === 2) {
        if ((this.boardState[0] != "" && this.boardState[0] === this.boardState[1])
            || (this.boardState[4] != "" && this.boardState[4] === this.boardState[6])
            || (this.boardState[5] != "" && this.boardState[5] === this.boardState[8])) {
              this.strategicMoveOptions.push(2);
          }
        }

      else if (position === 3) {
        if ((this.boardState[0] != "" && this.boardState[0] === this.boardState[6])
            || (this.boardState[4] != "" && this.boardState[4] === this.boardState[5])) {
              this.strategicMoveOptions.push(3);
          }
        }

      else if (position === 4) {
        if ((this.boardState[0] != "" && this.boardState[0] === this.boardState[8])
            || (this.boardState[1] != "" && this.boardState[1] === this.boardState[7])
            || (this.boardState[2] != "" && this.boardState[2] === this.boardState[6])
            || (this.boardState[3] != "" && this.boardState[3] === this.boardState[5])) {
              this.strategicMoveOptions.push(4);
          }
        }

      else if (position === 5) {
        if ((this.boardState[2] != "" && this.boardState[2] === this.boardState[8])
            || (this.boardState[3] != "" && this.boardState[3] === this.boardState[4])) {
              this.strategicMoveOptions.push(5);
          }
        }

      else if (position === 6) {
        if ((this.boardState[0] != "" && this.boardState[0] === this.boardState[3])
            || (this.boardState[7] != "" && this.boardState[7] === this.boardState[8])
            || (this.boardState[2] != "" && this.boardState[2] === this.boardState[4])) {
              this.strategicMoveOptions.push(6);
          }
        }

      else if (position === 7) {
        if ((this.boardState[1] != "" && this.boardState[1] === this.boardState[4])
            || (this.boardState[6] != "" && this.boardState[6] === this.boardState[8])) {
              this.strategicMoveOptions.push(7);
          }
        }
      else {
        if ((this.boardState[6] != "" && this.boardState[6] === this.boardState[7])
            || (this.boardState[2] != "" && this.boardState[2] === this.boardState[5])
            || (this.boardState[0] != "" && this.boardState[0] === this.boardState[4])) {
              this.strategicMoveOptions.push(8);
          }
      }

  },

  computerMove: function () {
    if (this.currentSymbol == this.opponentSymbol) {
      var availableOptions = [];
      for (var i=0; i<this.boardState.length; i++) {
        if (this.boardState[i] == "") {
          availableOptions.push(i);
        }
      }
      for (var j=0; j<availableOptions.length; j++) {
        this.checkForTwo(availableOptions[j]);
      }

      if (this.strategicMoveOptions.length == 0) {
         var availableOptionsLength = availableOptions.length;
         var randomNumber = Math.floor(Math.random()*availableOptionsLength);
         var computerChoice = availableOptions[randomNumber];

         this.boardState[computerChoice] = this.opponentSymbol;

      } else {
          var randomNumber = Math.floor(Math.random()*this.strategicMoveOptions.length);
          var computerChoice = this.strategicMoveOptions[randomNumber];

          this.boardState[computerChoice] = this.opponentSymbol;
    }

      boardView.render();
      board.checkFullBoard();
      board.determineWinner();
      board.switchPlayer();
      board.strategicMoveOptions = [];
    }

  },

//remember boardState index is one less than the number of the square
  checkRow: function () {
      if (this.boardState[0] != "" && this.boardState[0] === this.boardState[1] && this.boardState[0] === this.boardState[2]
            || this.boardState[3] != "" && this.boardState[3] === this.boardState[4] && this.boardState[3] === this.boardState[5]
            || this.boardState[6] != "" && this.boardState[6] === this.boardState[7] && this.boardState[6] === this.boardState[8]) {
            this.winner = this.currentSymbol;
      }
  },

//remember boardState index is one less than the number of the square
  checkColumn: function () {
      if (this.boardState[0] != "" && this.boardState[0] === this.boardState[3] && this.boardState[0] === this.boardState[6]
            || this.boardState[1] != "" && this.boardState[1] === this.boardState[4] && this.boardState[1] === this.boardState[7]
            || this.boardState[2] != "" && this.boardState[2] === this.boardState[5] && this.boardState[2] === this.boardState[8]) {
            this.winner = this.currentSymbol;
      }
  },

//remember boardState index is one less than the number of the square
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
      this.checkRow();
      this.checkColumn();
      this.checkDiagonal();

      if (this.winner === "X") {
        if (this.playerSymbol === "X") {
          alert(this.name + " wins!");
          this.playerScore +=1;
        } else {
            alert (this.opponentName + " wins!");
            this.opponentScore +=1;
        }
        this.reset();
      }
      else if (this.winner === "O") {
        if (this.playerSymbol === "O") {
          alert(this.name + " wins!");
          this.playerScore +=1;
        } else {
          alert (this.opponentName + " wins!");
          this.opponentScore +=1;
        }
        this.reset();
      }

      $('#score').text(this.name + ": "+ board.playerScore + " vs. " + board.opponentName + ": " + board.opponentScore);
    },

    reset: function () {
      var choiceDisplay = $('h3');
      this.currentSymbol = undefined;

      this.boardState = ["","","","","","","","",""];
      boardView.render();

      if (this.opponentName != "Computer") {
         this.whoPicksSymbol = (Math.floor(Math.random() * 2) == 0) ? this.name : this.opponentName;
         choiceDisplay.text(this.whoPicksSymbol + ", choose X or O");
       } else {
         choiceDisplay.text(this.name + ", choose X or O");
       }

      this.playerSymbol = undefined;
      this.opponentSymbol = undefined;
      this.winner = undefined;
      this.fullBoard = undefined;
      $('.board').css('cursor', 'default');
      $('#X').prop("checked", false);
      $('#O').prop("checked", false);
      $('#labels').css('visibility', 'visible');
      $('.board').removeClass('responsive');

    },
  };

  var boardView = {
  thisView: this,

  setHandlers: function () {
    var body = $('body'),
        newGame = $("#newgame"),
        nameInput = $('#nameInput'),
        playPlayer = $('#playPlayer'),
        playComputer = $('#playComputer'),
        secondNameInput = $('#secondNameInput'),
        secondNameLabel = $('#secondNameLabel'),
        chooseX = $('#X'),
        chooseO = $('#O'),
        choiceDisplay = $('h3'),
        tictactoeBoard = $('.board'),
        heads = $('#heads'),
        tails = $('#tails'),
        themes = $('#themes'),
        classicTheme = $('#classic')
        footballTheme = $('#football'),
        basketballTheme = $('#basketball'),
        baseballTheme = $('#baseball');

    classicTheme.on('click', function () {
      body.addClass('classic').removeClass("football").removeClass('basketball').removeClass('baseball');
    });

    footballTheme.on('click', function () {
      body.addClass('football').removeClass("classic").removeClass('basketball').removeClass('baseball');
    });

    basketballTheme.on('click', function () {
      body.addClass('basketball').removeClass("classic").removeClass('football').removeClass('baseball');
    });

    baseballTheme.on('click', function () {
      body.addClass('baseball').removeClass("classic").removeClass('basketball').removeClass('football');
    });

    nameInput.on('keypress', function (e) {
        if (e.charCode === 13) {
          //if no opponent selected
          if (playPlayer.prop("checked") == false && playComputer.prop("checked") == false) {
            alert("Please select an opponent");
          }
          else {
          var name = $(this).val();
          var header = $('h1');

          header.text("Welcome " + name + "!");
          board.name = name;

          if (playPlayer.prop("checked")) {
            //if player opponent selected but no second name inputted
            if(secondNameInput.val() === "") {
              alert("Enter second player's name");
            }
            else {
              board.opponentName = secondNameInput.val();
              header.text("Welcome " + board.name + " and " + board.opponentName + "!");

              if (body.hasClass('football')) {
                choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
              } else if (body.hasClass('basketball')) {
                choiceDisplay.text(board.name + ", choose X (Knicks) or O (Nets)");
              } else if (body.hasClass('baseball')){
                choiceDisplay.text(board.name + ", choose X (Yankees) or O (Mets)");
              } else {
                choiceDisplay.text(board.name + ", choose X or O");
              }

              $(this).remove();
              $('#nameLabel').remove();
              $('#score').text(name + ": " + board.playerScore + " vs. " + board.opponentName + ": " + board.opponentScore);

              $('#startScreen').css('visibility','hidden');
              $('#secondScreen').css('visibility','visible');

              secondNameLabel.remove();
              secondNameInput.remove();
              themes.remove();
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
              $('#score').text(board.name + ":"+ board.playerScore + " vs. Computer:" + board.opponentScore);

              if (body.hasClass('football')) {
                choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
              } else if (body.hasClass('basketball')) {
                choiceDisplay.text(board.name + ", choose X (Knicks) or O (Nets)");
              } else if (body.hasClass('baseball')){
                choiceDisplay.text(board.name + ", choose X (Yankees) or O (Mets)");
              } else {
                choiceDisplay.text(board.name + ", choose X or O");
              }

              secondNameLabel.remove();
              secondNameInput.remove();
              themes.remove();
              $('#startScreen').css('visibility','hidden');
              $('#secondScreen').css('visibility','visible');
            }
          }
        }
      }
    });

    secondNameInput.on('keypress', function (e) {
      if (e.charCode === 13) {
        board.opponentName = $(this).val();

        if (nameInput.val() === "") {
          alert("Enter first player's name")
        }
        else if (secondNameInput.val() == "") {
          alert("Enter second player's name")
        }
        else {
          board.name = nameInput.val();
          $('h1').text("Welcome " + board.name + " and " + board.opponentName + "!");
          $('#score').text(board.name + ": " + board.playerScore + " vs. " + board.opponentName + ": " + board.opponentScore);

          if (body.hasClass('football')) {
            choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
          } else if (body.hasClass('basketball')) {
            choiceDisplay.text(board.name + ", choose X (Knicks) or O (Nets)");
          } else if (body.hasClass('baseball')){
            choiceDisplay.text(board.name + ", choose X (Yankees) or O (Mets)");
          } else {
            choiceDisplay.text(board.name + ", choose X or O");
          }

          $(this).remove();
          secondNameLabel.remove();
          $('#startScreen').css('visibility','hidden');
          $('#secondScreen').css('visibility','visible');
        }
      }
    });

    playPlayer.on('click', function (e) {
      board.opponent = "player";

      secondNameLabel.css('visibility','visible');
      secondNameInput.css('visibility','visible');
    });

    playComputer.on('click', function () {
      board.opponent = "computer";
      board.opponentName = "Computer";

      if (nameInput.val() != "") {
        $('#startScreen').css('visibility','hidden');
        $('#secondScreen').css('visibility','visible');
        secondNameLabel.remove();
        secondNameInput.remove();
        themes.remove();


        board.name = nameInput.val();
        $('h1').text("Welcome " + board.name + "!");

        if (body.hasClass('football')) {
          choiceDisplay.text(board.name + ", choose X (Giants) or O (Jets)");
        } else if (body.hasClass('basketball')) {
          choiceDisplay.text(board.name + ", choose X (Knicks) or O (Nets)");
        } else if (body.hasClass('baseball')){
          choiceDisplay.text(board.name + ", choose X (Yankees) or O (Mets)");
        } else {
          choiceDisplay.text(board.name + ", choose X or O");
        }

        $('#score').text(board.name + ":"+ board.playerScore + " vs. Computer:" + board.opponentScore);
      }
    });

    //set x and o button handlers
    chooseX.on('click', function () {
      if (board.whoPicksSymbol === undefined || board.whoPicksSymbol === board.name) {
        board.currentSymbol = "X";
        board.playerSymbol = "X";
        board.opponentSymbol = "O";
        choiceDisplay.text(board.name + " chooses X");
      } else {
        board.currentSymbol = "X";
        board.playerSymbol = "O";
        board.opponentSymbol = "X";
        choiceDisplay.text(board.whoPicksSymbol + " chooses X");
      }
      $('#labels').css('visibility', 'hidden');
    });

    chooseO.on('click', function () {
      if (board.whoPicksSymbol === undefined || board.whoPicksSymbol === board.name) {
        board.currentSymbol = "O";
        board.playerSymbol = "O";
        board.opponentSymbol = "X";
        choiceDisplay.text(board.name + " chooses O");
      } else {
        board.currentSymbol = "O";
        board.playerSymbol = "X";
        board.opponentSymbol = "O";
        choiceDisplay.text(board.whoPicksSymbol + " chooses O");
      }
      $('#labels').css('visibility', 'hidden');
    });

    //set new game handlers
    newGame.on('click', function () {
      tictactoeBoard.addClass('responsive');
      var gameInPlay = !(board.checkBoardEmpty());

      if (chooseO.prop("checked") == false && chooseX.prop("checked") == false) {
        alert("Please select X or O");
        tictactoeBoard.removeClass('responsive');
      } else if (gameInPlay == false) {
        board.pickFirstPlayer();
      }
       else if (gameInPlay == true) {
        board.reset();
      }

      if (board.currentSymbol != undefined && board.currentSymbol == board.playerSymbol) {
        choiceDisplay.text(board.name + "'s turn");
      } else if (board.currentSymbol != undefined && board.currentSymbol != board.playerSymbol) {
        choiceDisplay.text(board.opponentName + "'s turn");
      }

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

    //of cell is empty and game has started, set the value render it check if winner and switch player
    square1.on('click', function () {
      if (square1.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square2.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square3.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square4.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square5.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square6.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square7.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square8.text() == "" && $('.board').hasClass('responsive')) {
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
      if (square9.text() == "" && $('.board').hasClass('responsive')) {
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

  //cell number corresponds to the boardState array value at number-1
  render: function () {
    for (var i=1; i<=board.boardState.length; i++) {
      $("." + (i)).text(board.boardState[i-1]);
    }
 },
};

boardView.setHandlers();
