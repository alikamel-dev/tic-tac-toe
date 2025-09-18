"use strict";

// Objects for Gameboard and Game are created through Immediately Invoked Function Expressions (IIFEs) (The Module Pattern), as they are meant to have one instance.
// Object for Player is created through a factory function, as it is meant to have two instances.

const Game = (function () {
    // Private properties

    // IIFE to create Gameboard moved here to prevent access to properties only meant to be accessed by IIFE for Game.
    const Gameboard = (function () {
        // Private properties

        // Tic-Tac-Toe can be considered a type of an (n raised to the power of 2) game, specifically the (3 raised to the power of 2) type.
        // This variable can be used to create other variants of the game where n is equal to a different value.
        let width = 3;

        let gameboard = [];

        function init() {
            gameboard = new Array(width);

            clear();
        };

        function isValidRowOrColumnNumber(number) {
            return (typeof number === "number" && number >= 0 && number < width);
        }

        // Public properties (to Game module)

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
                return false;

            gameboard[rowNumber][columnNumber] = mark;

            return true;
        };

        function clear() {
            // Arrays created using the array constructor with the number of elements passed as argument contain that number as empty slots (i.e. they are sparse arrays).
            // Array iteration methods and `for...of` cannot iterate over empty slots, so one has to define values for them, or use other `for` iteration statements.
            for (let rowNumber = 0; rowNumber < width; ++rowNumber)
                gameboard[rowNumber] = new Array(width).fill("", 0);
        };

        // Setter methods will be created when the option to modify gameboard dimensions and number of cells marked by one player in a row/column/diagonal is added.

        // `Object.preventExtensions` is used to prevent addition of properties to the returned object. Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions#description.
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
                }
            };
                
            if (mainDiagonalMarked) return 1;
        }

        // (4) Checking the anti-diagonal of the gameboard

        // The marked cell is in the anti-diagonal of the gameboard if the sum of the numbers of its row and its column is equal to the gameboard width minus one.
        if (rowNumber + columnNumber === gameboard.length - 1) {
            let antiDiagonalMarked = true;
            for (let row = 0, column = gameboard.length - 1; row < gameboard.length; ++row, --column) {
                if (gameboard[row][column] !== mark) {
                    antiDiagonalMarked = false;

                    break;
                }
            };

            if (antiDiagonalMarked) return 1;
        }

        // (5) Checking if the board is full (in which case both players come to a draw)
        if (currentTurn === Gameboard.getGameboardArea())
            return 2;

        // (6) If all of the previous checks are negative, then the game is not over yet.
        return 0;
    }

    // Public properties

    const getMarks = () => marks;
    const getFirstPlayingMark = () => firstPlayingMark;

    const getPlayers = () => players;
    const getPlayer = (playerNumber) => {
        if (typeof playerNumber !== "number")
            throw Error(`The value for player number cannot be of type \`${typeof playerNumber}. It must be of type \`number\`.`);

        if (playerNumber < 1 || playerNumber > marks.length)
            throw Error(`Enter \`1\` for the first player, \`2\` for the second player, and so on... (You entered \`${playerNumber}\`).`);

        return players[playerNumber - 1];
    };

    const getCurrentPlayer = () => currentPlayer;
    const getCurrentTurn = () => currentTurn;

    const start = (gameboardWidth, ...playerNames) => {
        if (players.length > 0) {
            // If there is a game in progress (i.e. there are players), reset it.

            players = [];

            currentPlayer = null;
            currentTurn = 1;
        }

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

            switch (turnResult) {
                case 0:     // game is not over
                    const currentPlayerIndex = players.indexOf(currentPlayer);
                    currentPlayer = (currentPlayerIndex === players.length - 1 ? players[0] : players[currentPlayerIndex + 1]);

                    ++currentTurn;

                    break;
                
                case 1:     // game is over and current player wins
                case 2:     // game is over and both players come to a draw
                    // const playerNames = players.map(player => player.getName());
                    // start(...playerNames);

                    break;
            }

            return turnResult;
        }
    };

    return Object.preventExtensions({ getMarks, getFirstPlayingMark, getPlayers, getPlayer, getCurrentPlayer, getCurrentTurn, start, playTurn, getGameboardWidth: Gameboard.getGameboardWidth, getGameboardArea: Gameboard.getGameboardArea });
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

    const setGameboardHeight = () => gameboardHeightSpan.textContent = ` × ${gameboardSizeInput.value}`;

    const newGameButton = form.querySelector("button[type='submit']");

    const footer = document.body.querySelector("footer");

    let playerNameInputs = null;

    // (A - 2) Event Functions

    const startGame = () => {
        playerNameInputs = Array.from(form.querySelectorAll(".player-name-input"));
        const playerNames = playerNameInputs.map(playerNameInput => playerNameInput.value);

        const gameboardWidth = gameboardSizeInput.value;

        Game.start(gameboardWidth, ...playerNames);
    };

    const showGameboard = () => {
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
        // `tabindex=0` makes the element it is set on focusable in sequential keyboard navigation ("tabbing").
        // The element is focused after all elements that have a positive integer value for `tabindex` or otherwise precede it in document order. 
        gameboardCell.setAttribute("tabindex", "0");

        for (let i = 1; i <= gameboardWidth; ++i) {
            const row = gameboardRow.cloneNode(true);

            for (let j = 1; j <= gameboardWidth; ++j) {
                const cell = gameboardCell.cloneNode(true);

                row.appendChild(cell);
            }

            gameboard.appendChild(row.cloneNode(true));
        }

        // (?) The first line below successfully sets the width to `3ch` (for a 3-by-3 gameboard), but the one after it never works as expected.

        gameboard.style.minWidth = `${gameboardWidth}ch`;
        gameboard.style.width = `max(${getComputedStyle(gameboard).height}, ${gameboardWidth}ch})`;

        footer.hidden = true;
    }

    const setForm = (gameStage) => {
        if (gameStage === "gameStart" || gameStage === "start")
            gameStage = false;
        else if (gameStage === "gameEnd" || gameStage === "end")
            gameStage = true;
        else if (!(typeof gameStage === "boolean"))
            throw TypeError(`The type of \`${gameStage}\` must be a boolean or one of the strings \`"start"\`, \`"gameStart\`, \`"end"\`, and \`"gameEnd"\` (You entered \`${gameStage}\`).`);

        const areInputsReadOnly = !gameStage;
        // A negative value for `tabindex` makes the element the attribute-value pair is set on not focusable in sequential keyboard navigation ("tabbing").
        const tabIndex = areInputsReadOnly ? "-1" : "0";

        const allInputs = [...playerNameInputs, gameboardSizeInput];

        allInputs.forEach(input => {
            input.setAttribute("readonly", `${areInputsReadOnly}`);
            input.setAttribute("tabindex", `${tabIndex}`);
        });

        intro.setAttribute("hidden", true);
        firstPlayerNote.hidden = areInputsReadOnly;
    }

    const doOnNewGame = () => {
        startGame();
        showGameboard();
        setForm("gameStart");
    };

    form.addEventListener('submit', (event) => {
        // Using `event.preventDefault()` in an event listener for submit button click prevents HTML form validation.
        event.preventDefault();

        doOnNewGame();
    })

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
