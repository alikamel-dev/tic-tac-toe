"use strict";

// Objects for Gameboard and Game are created through Immediately Invoked Function Expressions (IIFEs) (The Module Pattern), as they are meant to have one instance.
// Object for Player is created through a factory function, as it is meant to have two instances.

const Game = (function () {
    // (A) Private variables

    const Gameboard = (function () {
        // (A) Private variables

        // Tic-Tac-Toe can be considered a type of an (n raised to the power of 2) game, specifically the (3 raised to the power of 2) type.
        // This variable can be used to create other variants of the game where n is equal to a different value.
        let width = 3;

        let gameboard = [];

        const clear = () => {
            // Arrays created using the array constructor with the number of elements passed as argument contain that number as empty slots (i.e. they are sparse arrays).
            // Array iteration methods and `for...of` cannot iterate over empty slots, so one has to define values for them, or use other `for` iteration statements.
            for (let rowNumber = 0; rowNumber < width; ++rowNumber)
                gameboard[rowNumber] = new Array(width).fill("", 0);
        };

        const init = () => {
            gameboard = new Array(width);

            // Creates a number of sub-arrays representing the gameboard rows.
            clear();
        };

        const isValidRowOrColumnNumber = (number) => {
            return (typeof number === "number" && number >= 0 && number < width);
        };

        // (B) Public variables (to `Game`)

        const getGameboard = () => gameboard;
        const getGameboardWidth = () => width;
        const getGameboardArea = () => (width ** 2);

        const setGameboard = (newWidth) => {
            width = newWidth;

            init();
        };

        const markGameboard = (mark, rowNumber, columnNumber) => {
            if (!Game.getMarks().includes(mark))
                throw Error(`The value for mark cannot be \`${mark}\`. It must be one of the following strings: ${Game.getMarks()}.`);

            const areRowAndColumnNumbersValid = isValidRowOrColumnNumber(rowNumber) && isValidRowOrColumnNumber(columnNumber);

            if (!areRowAndColumnNumbersValid)
                throw Error(`Invalid value(s) for row and/or column number (Row number: ${rowNumber}, Column number: ${columnNumber})`);

            const cellToBeMarked = gameboard[rowNumber][columnNumber];
            if (cellToBeMarked !== "")
                // `false` means that the current player's turn has not ended yet.
                return false;

            gameboard[rowNumber][columnNumber] = mark;

            // `true` means that the current player's turn has ended.
            return true;
        };

        // `Object.preventExtensions` is used to prevent addition of properties to the returned object. 
        // Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions#description.
        
        return Object.preventExtensions({ getGameboard, getGameboardWidth, getGameboardArea, setGameboard, markGameboard });
    })();

    const marks = ["X", "O"];
    const firstPlayingMark = marks[0];

    const isAValidMark = mark => marks.includes(mark.toUpperCase());

    // Factory function to create a new player moved here to prevent creation of more players than required.
    const Player = (name, mark) => {
        if (typeof name !== "string")
            throw Error(`The value for player name cannot be of type \`${typeof name}\`. It must be of type \`string\`.`);

        if (!isAValidMark(mark))
            throw Error(`The value for player mark cannot be \`${mark}\`. It must be one of the following strings: ${marks}.`);

        const getName = () => name;
        const getMark = () => mark;

        return Object.preventExtensions({ getName, getMark });
    };

    let players = [];

    let currentPlayer = null;
    let currentTurn = 1;

    // The turn before which neither player can win against or draw with the other, as neither player has placed the number of instances of their mark required for a win and the board is not yet full.
    const firstTurnAtWhichGameCanEnd = marks.length * (Gameboard.getGameboardWidth() - 1) + 1;

    function markResult(mark, rowNumber, columnNumber) {
        // Return early if it is impossible for either player to win in the current turn (as neither player has placed the required number of instances of their mark that would make them win).
        if (currentTurn < firstTurnAtWhichGameCanEnd)
            return 0;

        const gameboard = Gameboard.getGameboard();

        // (1) Checking the row of the gameboard where the specified cell is located

        const rowMarked = gameboard[rowNumber].every(cell => cell === mark);
        if (rowMarked) return 1;

        // (2) Checking the column of the gameboard where the specified cell is located

        const columnMarked = gameboard.every(row => row[columnNumber] === mark);
        if (columnMarked) return 1;

        // (3) Checking the main diagonal of the gameboard

        // In both of the following `for` statements, checking the condition `row < gameboard.length` without checking another regarding the value of `column` is enough.
        // Also, separating two conditions using the comma operator (`,`) would make the entire parent condition statement return the value of the second condition, as the comma operator returns the value of the last operand.

        // The marked cell is in the main diagonal of the gameboard if the number of its row is equal to the number of its column.
        if (rowNumber === columnNumber) {
            let mainDiagonalMarked = true;

            for (let row = 0, column = 0; row < gameboard.length; ++row, ++column) {
                if (gameboard[row][column] !== mark) {
                    mainDiagonalMarked = false;
                    break;
                };
            };
                
            if (mainDiagonalMarked) return 1;
        };

        // (4) Checking the anti-diagonal of the gameboard

        // The marked cell is in the anti-diagonal of the gameboard if the sum of the numbers of its row and its column is equal to the gameboard width minus one.
        if (rowNumber + columnNumber === gameboard.length - 1) {
            let antiDiagonalMarked = true;

            for (let row = 0, column = gameboard.length - 1; row < gameboard.length; ++row, --column) {
                if (gameboard[row][column] !== mark) {
                    antiDiagonalMarked = false;
                    break;
                };
            };

            if (antiDiagonalMarked) return 1;
        };

        // (5) Checking if the board is full (in which case both players come to a draw)
        if (currentTurn === Gameboard.getGameboardArea())
            return 2;

        // (6) If all of the previous checks are negative, then the game is not over yet.
        return 0;
    };

    // (B) Public variables

    const getMarks = () => marks;
    const getFirstPlayingMark = () => firstPlayingMark;

    const getCurrentPlayerName = () => {
        if (currentPlayer === null)
            throw Error(`There are no information available regarding the current player.`);

        return currentPlayer.getName();
    };

    const getCurrentPlayerMark = () => {
        if (currentPlayer === null)
            throw Error(`There are no information available regarding the current player.`);

        return currentPlayer.getMark();
    };

    const getCurrentPlayerOrder = () => {
        if (currentPlayer === null)
            throw Error(`There are no information available regarding the current player.`);

        return players.indexOf(currentPlayer) + 1;
    };

    const getCurrentTurn = () => currentTurn;

    const start = (gameboardWidth, ...playerNames) => {
        if (players.length > 0) {
            // If there is a game in progress (i.e. there are players), reset it.

            players = [];

            currentPlayer = null;
            currentTurn = 1;
        };

        Gameboard.setGameboard(gameboardWidth);

        if (playerNames.length !== marks.length)
            throw Error(`The number of players must be exactly equal to ${marks.length} (You entered ${playerNames.length}).`);

        playerNames.forEach((playerName, playerIndex) => { 
            players.push( Player(playerName, marks[playerIndex]) );
        });

        currentPlayer = players[0];
    };

    const playTurn = (rowNumber, columnNumber) => {
        if (typeof rowNumber !== "number" || typeof columnNumber !== "number")
            throw Error(`Row and Column numbers must be of the \`number\` type (You entered a/an \`${typeof rowNumber}\` and a/an \`${typeof columnNumber}\` for row and column numbers, respectively.)`);

        const endTurn = Gameboard.markGameboard(currentPlayer.getMark(), rowNumber, columnNumber);

        if (endTurn) {
            const turnResult = markResult(currentPlayer.getMark(), rowNumber, columnNumber);

            if (turnResult === 0) {
                const currentPlayerIndex = players.indexOf(currentPlayer);
                currentPlayer = (currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1]);

                ++currentTurn;
            };

            // The value of `turnResult` will be used by `DisplayController` to decide whether to display game results or not, and what results to display.
            return turnResult;
        };
    };

    return Object.preventExtensions({
        // Public variables of `Game` (to `DisplayController`)
        getMarks, getFirstPlayingMark,
        getCurrentPlayerName, getCurrentPlayerMark, getCurrentPlayerOrder, getCurrentTurn,
        start,
        playTurn,

        // Public variables of `Gameboard` (to `DisplayController`)
        getGameboardWidth: Gameboard.getGameboardWidth,
    });
})();

const DisplayController = (function () {
    // (A) Private variables

    // (A - 1) DOM Element Nodes

    // The value of the `value` attribute does NOT change as the associated input element text content is changed, 
    // Thus, `HTMLElementNode.value` (which returns the current value of HTMLElementNode) is used instead of `HTMLElementNode.getAttribute("value")`.

    const intro = document.body.querySelector("#intro");

    const form = document.body.querySelector("#page-form");
    const [playerNamesSection, gameboardSection, gameboardSizeSection] = Array.from(form.querySelectorAll(".form-section"));

    const firstPlayerNote = form.querySelector("small#first-player-note");
    const firstPlayerNoteSpan = firstPlayerNote.querySelector(".mark-1");

    const playerNames = playerNamesSection.querySelector(".player-names");
    const playerNameLabelInputTemplate = playerNames.querySelector("#player-name-label-input-template");

    const gameboard = gameboardSection.querySelector("#gameboard");

    const gameboardSizeInput = gameboardSizeSection.querySelector("#gameboard-size-input");
    const gameboardHeightSpan = gameboardSizeSection.querySelector("#gameboard-height");

    const footer = document.body.querySelector("footer");

    const gameResultsContainer = form.querySelector(".game-results");
    const gameResultsLabelAndInput = Array.from(gameResultsContainer.children);

    const newGameButton = form.querySelector("button[type='submit']");

    let playerNameInputs = [];

    const playerNamesMustBeDifferentNote = document.createElement("p");
    playerNamesMustBeDifferentNote.textContent = "Player names must be different!";
    playerNamesMustBeDifferentNote.style.color = "#FF0000";

    // (A - 2) Variables

    // Holds the value returned by `Game.playTurn`. Initialized to `0` so that the following event listener works as intended on the first turn.
    let turnResult = 0;

    // (A - 3) Event Functions

    const setGameboardHeight = () => gameboardHeightSpan.textContent = ` × ${gameboardSizeInput.value}`;

    // TODO: Cache the data of the current players instead of fetching them on each turn.

    const getCurrentPlayerData = () => {
        const currentPlayerName = Game.getCurrentPlayerName();
        const currentPlayerMark = Game.getCurrentPlayerMark();
        const currentPlayerOrder = Game.getCurrentPlayerOrder();

        const playerNameInput = playerNameInputs.find(playerNameInput => playerNameInput.value === currentPlayerName);

        const currentPlayerColor = getComputedStyle(playerNameInput).color;

        return Object.freeze({
            name: currentPlayerName,
            mark: currentPlayerMark,
            order: currentPlayerOrder,

            color: currentPlayerColor,
            input: playerNameInput,
        });
    };

    const highlightCurrentPlayer = () => {
        const currentPlayer = getCurrentPlayerData();

        playerNameInputs.forEach(playerNameInput => {
            const parentContainer = playerNameInput.closest("div");
            parentContainer.style.border = (playerNameInput === currentPlayer.input) ? `2px solid ${currentPlayer.color}` : `none`;
        });
    };

    const startGame = () => {
        playerNameInputs = Array.from(form.querySelectorAll(".player-name-input"));
        const playerNames = playerNameInputs.map(playerNameInput => {
            playerNameInput.value = playerNameInput.value.trim();

            return playerNameInput.value;
        });

        // Since this script uses player names as search queries, each player name must be unique to prevent errors.

        let arePlayerNamesNotUnique = true;

        playerNames.forEach((playerName, playerIndex) => {
            if (playerIndex === playerNames.length - 1)
                return;

            for (let i = playerIndex + 1; i < playerNames.length; ++i) {
                arePlayerNamesNotUnique = (playerName.toLowerCase() === playerNames[i].toLowerCase());

                if (arePlayerNamesNotUnique) {
                    form.insertBefore(playerNamesMustBeDifferentNote, gameboardSection);

                    return;
                };
            };
        });

        if (!arePlayerNamesNotUnique) {
            // Remove the warning regarding player names being the same if it exists
            if (form.contains(playerNamesMustBeDifferentNote))
                form.removeChild(playerNamesMustBeDifferentNote);

            const gameboardWidth = parseInt(gameboardSizeInput.value);

            Game.start(gameboardWidth, ...playerNames);

            highlightCurrentPlayer();
        };

        return arePlayerNamesNotUnique;
    };

    let gameboardRows = [];

    const showGameboard = () => {
        // Removes all the child nodes of the gameboard, without removing their event listeners (which do not exist).
        gameboard.innerHTML = "";

        gameboard.classList.remove(Array.from(gameboard.classList).pop());

        document.body.querySelector("main").classList.add("game-started");

        const gameboardWidth = Game.getGameboardWidth();

        // The HTML attribute `hidden` is not a boolean attribute, so `gameboard.setAttribute("hidden", "false");` does not work.
        gameboardSection.hidden = false;

        const gameboardGridTemplateRowsAndColumns = `repeat(${gameboardWidth}, 1fr)`;

        gameboard.style.display = "grid";
        gameboard.style.gridTemplateRows = gameboardGridTemplateRowsAndColumns;

        const gameboardRow = document.createElement("div");

        gameboardRow.setAttribute("class", "gameboard-row");
        gameboardRow.style.display = "grid";
        gameboardRow.style.gridTemplateColumns = gameboardGridTemplateRowsAndColumns;

        const gameboardCell = document.createElement("div");
        gameboardCell.setAttribute("class", "gameboard-cell");

        for (let i = 1; i <= gameboardWidth; ++i) {
            const row = gameboardRow.cloneNode(true);

            for (let j = 1; j <= gameboardWidth; ++j) {
                const cell = gameboardCell.cloneNode(true);

                // Used to force gameboard cells to have the width and height of a single character.

                cell.textContent = "X";
                cell.style.color = "transparent";

                row.appendChild(cell);
            };

            gameboard.appendChild(row.cloneNode(true));
        };

        gameboard.style.width = gameboard.style.height = `auto`;

        const maxDimension = Math.max(parseFloat(getComputedStyle(gameboard).width), parseFloat(getComputedStyle(gameboard).height));

        gameboard.style.width = gameboard.style.height = `${maxDimension}px`;

        footer.hidden = true;

        gameboardRows = Array.from(gameboard.children);
    };

    const setForm = (gameStage) => {
        if (gameStage === "gameStart")
            gameStage = false;
        else if (gameStage === "gameEnd")
            gameStage = true;
        else if (!(typeof gameStage === "boolean"))
            throw TypeError(`The type of \`${gameStage}\` must be a boolean or one of the strings \`"start"\`, \`"gameStart\`, \`"end"\`, and \`"gameEnd"\` (You entered \`${gameStage}\`).`);

        const areInputsReadOnly = !gameStage;

        playerNameInputs.forEach(playerNameInput => playerNameInput.readOnly = areInputsReadOnly);

        // Game Intro and First Player Note are meant to be displayed only once after page load.
        intro.hidden = true;
        firstPlayerNote.hidden = true;

        gameResultsContainer.hidden = false;
    };

    const doOnNewGame = () => {
        const arePlayerNamesNotUnique = startGame();

        if (arePlayerNamesNotUnique)
            return;

        showGameboard();
        setForm("gameStart");

        // Reset `turnResult` to `0` to allow players to mark the new gameboard.
        turnResult = 0;

        gameResultsLabelAndInput.forEach(element => element.classList.remove(Array.from(element.classList).pop()));
        gameResultsContainer.querySelector("input").value = "";
    };

    form.addEventListener('submit', (event) => {
        // Using `event.preventDefault()` in an event listener for submit button click prevents HTML form validation.
        event.preventDefault();

        doOnNewGame();
    });

    gameboard.addEventListener('click', (event) => {
        if (turnResult !== 0)
            return;

        const gameboardCell = event.target;

        if (!gameboardCell.classList.contains("gameboard-cell"))
            return;

        if (gameboardCell.classList.contains("marked"))
            return;

        const currentPlayer = getCurrentPlayerData();

        gameboardCell.style.opacity = "1.0";

        gameboardCell.textContent = currentPlayer.mark;
        gameboardCell.style.color = currentPlayer.color;
        gameboardCell.classList.add("marked");

        const gameboardRow = gameboardCell.closest(".gameboard-row");
        const gameboardRowCells = Array.from(gameboardRow.children);

        const rowNumber = gameboardRows.indexOf(gameboardRow);
        const columnNumber = gameboardRowCells.indexOf(gameboardCell);

        turnResult = Game.playTurn(rowNumber, columnNumber);

        if (turnResult !== 0) {
            if (turnResult === 1) {
                const currentPlayer = getCurrentPlayerData();

                gameboard.classList.add(`mark-${currentPlayer.order}`);

                // `gameboard.children` returns only the direct child element nodes of `gameboard`.
                Array.from(gameboard.querySelectorAll("*")).forEach(element => element.style.borderColor = currentPlayer.color);

                gameResultsLabelAndInput.forEach(element => element.classList.add(`mark-${currentPlayer.order}`));

                gameResultsContainer.querySelector("input").value = currentPlayer.name;
            } else {
                gameboard.classList.add("draw");
                Array.from(gameboard.querySelectorAll("*")).forEach(element => element.style.borderColor = getComputedStyle(document.documentElement).getPropertyValue("--draw-color"));

                gameResultsLabelAndInput.forEach(element => element.classList.add("draw"));

                gameResultsContainer.querySelector("input").value = "nobody";
            }

            setForm("gameEnd");

        } else highlightCurrentPlayer();
    });

    gameboard.addEventListener('mouseover', (event) => {
        const gameboardCell = event.target;

        if (!gameboardCell.classList.contains("gameboard-cell"))
            return;

        if (turnResult !== 0 || gameboardCell.classList.contains("marked")) {
            gameboardCell.style.cursor = "not-allowed";

            return;
        };

        gameboardCell.style.opacity = "0.5";

        const currentPlayer = getCurrentPlayerData();

        gameboardCell.textContent = currentPlayer.mark;
        gameboardCell.style.color = currentPlayer.color;
    });

    gameboard.addEventListener('mouseout', (event) => {
        const gameboardCell = event.target;

        if (!gameboardCell.classList.contains("gameboard-cell") || turnResult !== 0)
            return;

        gameboardCell.style.opacity = "1.0";

        if (!gameboardCell.classList.contains("marked")) {
            gameboardCell.textContent = "";
        };
    });

    // Public variables

    function displayNewGameScreen() {
        const marks = Game.getMarks();

        firstPlayerNoteSpan.textContent = Game.getFirstPlayingMark();

        marks.forEach((mark, index) => {
            const documentFragment = playerNameLabelInputTemplate.content.cloneNode(true);

            const label = documentFragment.querySelector("label");
            const input = documentFragment.querySelector(".player-name-input");

            const playerNumber = index + 1;

            input.setAttribute("name", `player-${playerNumber}-name`);
            input.setAttribute("id", `player-${playerNumber}-name-input`);
            input.classList.add(`mark-${playerNumber}`);
            input.setAttribute("title", `Enter a name for the player who is going to play as (${mark})`);

            label.setAttribute("for", input.getAttribute("id"));
            label.innerHTML = `<span class="mark-${playerNumber}">${mark}</span> is `;

            setGameboardHeight();

            gameboardSizeInput.addEventListener('input', setGameboardHeight);

            playerNames.appendChild(documentFragment);
        });
    };

    return Object.preventExtensions({ displayNewGameScreen });
})();

DisplayController.displayNewGameScreen();
