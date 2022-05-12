// Tutorial used for battleship game: https://github.com/LearnTeachCode/Battleship-JavaScript

var rows = 10;
var columns = 10;
var gridSize = 50;
var hitCount = 0;

var gameBoardContainer = document.getElementById("gameboard");

createGrid();

// This for loop creates each indiviudal square of the grid by looping through until it meets the required amount as listed above

function createGrid(){
    for (i=0; i < columns; i++){
        for (j=0; j < rows; j++){
            var grid = document.createElement("div");
            gameBoardContainer.appendChild(grid);
            grid.id = 's' + j + i;
            var topPosition = j * gridSize;
            var leftPosition = i * gridSize;
            grid.style.top = topPosition + 'px';
            grid.style.left = leftPosition + 'px';
        }
    }
}

// 0 represents the open sea spaces
// 1 represents where the battleships are placed
var computerBoard = [
    [0,0,0,0,0,0,0,0,1,0],
	[0,1,1,1,1,0,0,0,1,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,1,0,0,1,0,0,0,0],
	[0,0,0,0,0,1,0,0,0,0],
	[0,1,0,0,0,1,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,1,1,0],
	[1,0,0,0,0,0,0,0,0,0],
	[1,0,0,0,1,1,1,0,0,0],
	]

// Player's board
// Function clickBoard turns 0 to 1 when the player clicks on a spot on the board
var userBoard = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        ]

// Useful reference for Javascript events: kirupa.com/html5/javascript_events.htm
// Format: source.addEventListener(eventName, eventHandler, true/false);

// 3 stages of the game, settingShips is true because it is the initial stage
settingShips = true;
firing = false;
computerFiring = false;

var squaresPlaced = 0;

gameBoardContainer.addEventListener("click", clickBoard, false);

function clickBoard(e){
    if (settingShips == true){

        var row = e.target.id.substring(1,2);
        var col = e.target.id.substring(2, 3);
        userBoard[row][col] = 1;
        if (userBoard[row][col] == 1){
            e.target.style.background = '#bbb'
        } 
        squaresPlaced++
        if (squaresPlaced >= 19){
            startGame();

        settingShips = false;
        firing = true;
        return;
        }
    }

    if (firing == true){
        if ((e.target !== e.currentTarget)&&hitCount<19){
            var row = e.target.id.substring(1,2);
            var col = e.target.id.substring(2,3);
            if (computerBoard[row][col] == 0){
                e.target.style.background = '#bbb'
                computerBoard[row][col] = 3;
            } else if (computerBoard[row][col] == 1){
                e.target.style.background = 'hotpink';
                computerBoard[row][col] = 2;
                hitCount++;
                if (hitCount == 19){
                    alert("Congratulations! You won.");
                }
            } else if (computerBoard[row][col] > 1){
                alert("You've already fired at this spot.")
            }
        }

    }

    e.stopPropagation();
}

// Onclick function for the "Fire" button
function startGame(){
    if (settingShips == true){
        settingShips == false;
        firing == true;
        document.getElementById("setup").innerHTML = "There are 7 battleships hidden across the board. Click on a box to fire a missile. If you miss, the box will appear grey, but if you landed a missile, the box will appear pink. Best of luck!"
        gameBoardContainer.innerHTML="";
        createGrid();
        gameBoardContainer.addEventListener("click", clickBoard, false);
    }
}