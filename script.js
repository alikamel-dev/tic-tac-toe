"use strict";

// Objects for Gameboard and Game are created through Immediately Invoked Function Expressions (IIFEs) (The Module Pattern), as they are meant to have one instance.
// Object for Player is created through a factory function, as it is meant to have two instances.

const Gameboard = (function () {
    // Tic-Tac-Toe is a subtype of m,n,k-games (as a 3,3,3-game or a 3-in-a-row game on a 3 by 3 board) or n raised to d games (as a 3 raised to a power of 2 game). Refer to https://en.wikipedia.org/wiki/Tic-tac-toe#Gameplay for more information.
    // I have chosen the m,n,k-game general model, as it provides more flexibility in case we want to give the user the option to modify the game structure or we want to implement another variant (e.g. gomoku, a 15,15,5-game).    
    const [numberOfRows, numberOfColumns, numberOfCellsMarkedToWin] = [3, 3, 3];

    let gameboard = [];

    const clear = () => {
        // Arrays created using the array constructor with the number of elements passed as argument contain that number as empty slots (i.e. they are sparse arrays).
        // Array iteration methods and `for...of` cannot iterate over empty slots, so one has to define values for them, or use other `for` iteration statements.
        for (let rowNumber = 0; rowNumber < numberOfRows; ++rowNumber)
            gameboard[rowNumber] = new Array(numberOfColumns).fill("", 0);
    }

    const init = () => {
        gameboard = new Array(numberOfRows);

        clear();
    };

    init();

    const [getNumberOfRows, getNumberOfColumns, getNumberOfCellsMarkedToWin] = [
        () => numberOfRows,
        () => numberOfColumns,
        () => numberOfCellsMarkedToWin,
    ];

    const getGameboard = () => gameboard;

    // Setter methods will be created when the option to modify gameboard dimensions and number of cells marked by one player in a row/column/diagonal is added.

    // `Object.preventExtensions` is used to prevent addition of properties to the returned object. Read more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions#description.
    return Object.preventExtensions({getNumberOfRows, getNumberOfColumns, getNumberOfCellsMarkedToWin, getGameboard, clear});
})();

const Game = (function () {
    const marks = ["X", "O"];
    const firstPlayingMark = marks[0];

    const getMarks = () => marks;
    const getFirstPlayingMark = () => firstPlayingMark;

    const isAValidMark = mark => marks.includes(mark.toUpperCase());

    // Factory function to create a new player moved here to prevent creation of more players than two.
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

    const getPlayers = () => players;

    const getPlayer = (playerNumber) => {
        if (typeof playerNumber !== "number")
            throw Error(`The value for player number cannot be of type \`${typeof playerNumber}. It must be of type \`number\`.`);

        if (playerNumber < 1 || playerNumber > marks.length)
            throw Error(`Enter \`1\` for the first player, \`2\` for the second player, and so on... (You entered \`${playerNumber}\`).`);

        return players[playerNumber - 1];
    };

    const start = (...playerNames) => {
        if (players.length > 0) {
            // If there is a game in progress (i.e. there are players), end it by removing said players and clearing the gameboard.

            players = [];
            Gameboard.clear();
        }

        if (playerNames.length !== marks.length)
            throw Error(`The number of players must be exactly equal to ${marks.length} (You entered ${playerNames.length}).`);

        playerNames.forEach((playerName, playerIndex) => { 
            players.push( Player(playerName, marks[playerIndex]) );
        });
    };

    return Object.preventExtensions({ getMarks, getFirstPlayingMark, isAValidMark, getPlayers, getPlayer, start });
})();
