in new game event listener - check if can take out part where set x and o 
check in computerMove if you can write it without creating the variable strategicMoveOptions in the board object


# kaitlinwiener.github.io
1) explanations of the technologies used

For this project I used the HTML, CSS, and javascript/jQuery we have learned in class. 

2) the approach taken

I started by creating two objects - board and boardView - to track the state of the tic tac toe board and update the view accordingly. Once I had a basic board on my page using HTML & CSS I thought about how I wanted to represent the board in javascript and decided to create an array called boardState that was initialized to contain all empty strings. Each move on the board would update the corresponding space in the array to either "X" or "O" and then my boardView object would have a render function to make the necessary updates to the board on the page. 

My next step was to figure out setting up a game - in my board object I created variables to store both players' names, whether the opponent is the computer or a second player, and both players' symbols. I also created a function to choose which player goes first and to assign the corresponding X and O cursors. In my boardView object I created a function to set all of the event handlers on the page which included adding eventListeners to the Enter Name label and opponent choice that would store the players' names and the type of opponent. Then I added listeners to the X and O radio buttons which would store the symbol choice of the player and then disappear so that choices were not able to be switched mid game. Then I added an eventlistener to the Start button that would check if X or O had been chosen and if so would set the board to have class responsive. 


Next step was making the game work with two players. In order to do this I created a
currentSymbol variable to keep track of which symbol is being used on the board. I then set event listeners on all of the different cells that (if the board were responsive and there was no text inside the cell already) would update the corresponding index in the boardState array to the currentSymbol and render that to the view. I then created a switchPlayer function to be called after a cell was clicked/the boardView rendered that would change the currentSymbol and corresponding cursor.

Then I had to figure out how to check if there was a winner. I created checkRow, checkColumn, and checkDiagonal functions that checked the boardState array for any possible winning combination and set the winner variable in the board object equal to the currentSymbol. I then created a determineWinner function that calls all three of these functions and if there is a winner determines which player is the winner, increments the score accordingly and resets the board. I then created my reset function which clears out all of the players' information (except for their names) as well as the boardState array. This didn't account for ties so I created a function to checkFullBoard and called this and then determineWinner every time a cell is clicked after the view is updated.

Now that the game was functioning with two players I created a function called computerMove that ran through boardState, placed all of the indices with empty strings into a second array and chose a value at random from that array to set equal to the currentSymbol (equal to the computer's symbol.) Then I had this called when any cell was pressed after a winner or tie was determined (only if the opponent stored in board was "computer"). I had this called after 1.5 seconds in order to simulate the computer thinking.

My last step was making the game smart. I did this by creating a function called checkForTwo(position) which checks if the inputted position is next to or between two cells with the same value. If so I pushed that position to an array variable I created in board called strategicMoveOptions. In computerMove I called checkForTwo on every available space on the board and if any available spaces were strategic I chose randomly from those and had the computer move there. 

In order to get the game set up I just had to call boardView.setHandlers()

3) installation instructions(which may just be a link to your hosted game)

```javascript
http://kaitlinwiener.github.io/
```

4) unsolved problems

The way I have my computerMove coded it is not able to distinguish between whether it is making a move that will enable it to win (going next to two cells with the same symbol as its own) or a move that will block the player. I wanted to have my checkForTwo function be able to store both the index of the cell next to two as well as what the value of those two cells is but could not figure out how to add that in. 

I also had problems with animation - I was hoping to have my start screen slide up and then disappear but could not get it to work. 


5) wireframe images
6) user stories





