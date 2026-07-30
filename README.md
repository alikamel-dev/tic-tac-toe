# Tic-Tac-Toe

![A screenshot of the game. From top to bottom: game title ('Xs and Os'), two input fields showing Player 1 and Player 2 as 'X' and 'O', respectively, A 3-by-3 gameboard marked by both players, where Player 1 has marked the diagonal extending from the top right cell to the bottom left cell, an input for the gameboard size, set to 3, and finally a read-only input field for the name of the winner, Player 1.](screenshot.png)

A game of _[tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)_ (also known as _noughts and crosses_ and _Xs and Os_, among [other names](https://en.wikipedia.org/wiki/Tic-tac-toe#Names)) that you can play with a friend in your web browser.

This project was created as part of my journey in the [Full Stack JavaScript](https://theodinproject.com/paths/full-stack-javascript) path of [The Odin Project (TOP)](https://theodinproject.com), as a practice on [Factory Functions and The Module Pattern in JavaScript](https://theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern).

> [!NOTE]
> Despite being primarily a practice project, contributions are still welcome! You can try resolving any [issues](https://github.com/alikamel-dev/tic-tac-toe/issues), or, if you think you have found one, feel free to [create an issue](https://github.com/alikamel-dev/tic-tac-toe/issues/new) or solve it and [create a pull request](https://github.com/alikamel-dev/tic-tac-toe/compare).

## Playing the game

You can play the game on its [GitHub Pages website](https://alikamel-dev.github.io/tic-tac-toe).

>[!IMPORTANT]
> About supported devices and browsers:
> - The game is designed to be played in a 1920 × 1080 screen/window resolution. The website is not completely responsive, and is likely to produce worse visual results on smaller screen sizes, especially mobile phone screens, though this issue can be mitigated by loading the desktop version of the website.
> - The game is primarily developed for [Google Chrome](https://google.com/chrome). It should function properly in fairly new versions of major web browsers, though minor visual differences may arise.

> [!TIP]
> If you encounter an issue with the game, feel free to [create an issue](https://github.com/alikamel-dev/tic-tac-toe/issues/new) or even solve it yourself and [create a pull request](https://github.com/alikamel-dev/tic-tac-toe/compare).

If you like my project, please support me by starring [its repository on GitHub](https://github.com/alikamel-dev/tic-tac-toe) and, if you are a fellow learner of The Odin Project, liking it on the project's [community solutions page](https://theodinproject.com/lessons/node-path-javascript-tic-tac-toe/project_submissions).

### How to Play

If you know how tic-tac-toe is played, you should be able to play this web version of it without much trouble — The following step-by-step guide is mostly for documentation purposes.

<ol>
  <li>
    Enter the names to be used for the players playing as <i>X</i> and <i>O</i> (or simply leave the default names as-is). <br>
    All characters are allowed in a player name. However, the following are not allowed:
    <ul>
      <li>A player name that consists solely of <a href="https://en.wikipedia.org/wiki/Whitespace_character">whitespace characters</a> (e.g. spaces, tabs, ...)</li>
      <li>Two player names that are identical</li>
      <li>Two player names that are only different in letter cases and/or the number of leading and/or trailing spaces</li>
    </ul>
  </li>

  <br>

  <li>
    You may also set the gameboard size (that is, the number of rows and columns of the gameboard) to any number from `3` (the default, and the size of a traditional tic-tac-toe board) to `10`, though larger values tend to overflow the browser viewport, forcing players to sometimes scroll up and down to reach the desired cells.
  </li>

  <br>

  <li>
    Click the <i>New Game</i> button to start a new game with the specified settings. <b>The player whose mark is _X_ starts first</b>.
  </li>

  <br>
  
  <li>
    The name of the player supposed to play the current turn will be surrounded by a box. They should play their turn by clicking an empty cell they wish to mark.
  </li>

  <br>

  <li>
    <b>The first player to mark all of the cells in a single row, column, or diagonal wins</b>. If all cells of the gameboard are marked before either player manages to do so, then neither player wins.
  </li>

  <br>

  <li>
    Once the game ends, the page scrolls down to show the gameboard and the result of the current round. You can click the <i>New Round</i> button to start a new round. Note that player markers will be swapped (For example, If your mark during the first round is <i>X</i>, it becomes <i>O</i> during the second round and it becomes <i>X</i> again during the third round, and so forth).
  </li>
</ol>

> [!TIP]
> You cannot edit player names or the gameboard size once a new game is started. To do this, click the _Home_ button at the bottom of the page to end the game and return to the start page.

## Design

The design of this project aims to make it look more like an activity page in an elementary school workbook, albeit more colorful, with user-generated content (player names and marks on the gameboard) looking like the writing of children on it.

This direction affected the choice of [background image](#background-image), [fonts](#fonts) and [colors](#colors).

### Background Image

The background image is [_white textile on a brown wooden table_](https://unsplash.com/photos/white-textile-on-brown-wooden-table-_kUxT8WkoeY) by [Marjan Blan on Unsplash](https://unsplash.com/@marjan_blan).

### Fonts and Colors

### Fonts

The following are the main fonts used for this project. Each link leads to the respective [Google Fonts](https://fonts.google.com) page of the font.

| Type of text                                   | Font                                                                                 |
|------------------------------------------------|--------------------------------------------------------------------------------------|
| Title and Player marks (except user-generated) | [Caveat](https://fonts.google.com/specimen/Caveat)                                   |
| Main text                                      | [Comic Neue](https://fonts.google.com/specimen/Comic+Neue)                           |
| User-generated content                         | [Waiting for the Sunrise](https://fonts.google.com/specimen/Waiting+for+the+Sunrise) |

### Colors

The following are the colors used for this project. Each link leads to the respective [ColorHexa](https://colorhexa.com) page of the color.

[Crayola](https://crayola.com) colors have been chosen from this [list of Crayola crayon colors on Wikipedia](https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors#Standard_colors).

| Type of item                 | Color                                                                     |
|------------------------------|---------------------------------------------------------------------------|
| Main text                    | [`#000000`](https://colorhexa.com/000000) (Black)                         |
| Player _X_ mark              | [`#ED0A3F`](https://colorhexa.com/ED0A3F) (Crayola Red)                   |
| Player _O_ mark              | [`#0066FF`](https://colorhexa.com/0066FF) (Crayola Blue (III))            |
| Draw/Input placeholder       | [`8B8680`](https://colorhexa.com/8B8680) (Crayola Gray)                   |
| Selection background         | [`hsl(60, 100%, 45%)`](https://colorhexa.com/E6E600) with `85%` opacity |

The selection background color is based on _Maximum Yellow_ Crayola color ([`#FAFA37`](https://colorhexa.com/FAFA37)), with modifications to saturation, lightness, and opacity.

## Other Projects

Feel free to view my other projects on [my website](https://alikamel-dev.github.io/tic-tac-toe).
