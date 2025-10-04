# Tic-Tac-Toe

A game of _[tic-tac-toe](https://en.wikipedia.org/wiki/Tic-tac-toe)_ ([also known as](https://en.wikipedia.org/wiki/Tic-tac-toe#Names) _noughts and crosses_ and _Xs and Os_ ) that you can play with a friend in your web browser.

This project is created as a practice with [The Odin Project](https://www.theodinproject.com) (TOP) on [Factory Functions and The Module Pattern in JavaScript](https://www.theodinproject.com/lessons/node-path-javascript-factory-functions-and-the-module-pattern).

This is my [ninth practice project](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe#assignment) with TOP. I would appreciate it if you also take a look at my [other projects](#other-projects), including my [other projects with TOP](#other-projects-with-the-odin-project).

## Playing the Game

You can play the game on this [GitHub Pages Website](https://ali-aboulsauood.github.io/tic-tac-toe).

### Before you play the game

#### Notes

- This game is best played in **a maximized [Google Chrome](https://www.google.com/chrome) browser window on a 1920 × 1080 monitor**. It is not guaranteed that other browsers, window sizes or resolutions will produce the intended, or even fairly acceptable, visual results. Also, **_this project is NOT designed for mobile browsers_.**

If you notice any bugs or issues in the project, feel free to [open an issue on GitHub](https://github.com/ali-aboulsauood/tic-tac-toe/issues/new).

And finally, If you like my project, please support me by **starring its repository on GitHub** and **liking it on the project's [community solutions page](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe/project_submissions)**.

#### How to Play

1. Enter the names to be used for the players playing as _X_ and _O_ (or simply leave the default names as-is) <br> There is no restriction on the types of characters used in player names, but **a player name may not consist solely of whitespace characters**, and **the two players may not have the same name, two names consisting of the same characters but with different letter cases, or two names only differing in the number of leading/trailing spaces**. <br><br> _The player whose mark is **X** plays first_.

2. You may also set the gameboard size (that is, the number of rows and columns of the gameboard), or leave it at the default value of `3` (3 rows and 3 columns, the gameboard of a traditional tic-tac-toe game). <br> Gameboard size can be any integer value from `3` to `10` (inclusive), though larger sizes may cause the page to overflow the browser viewport, forcing players to scroll up and down to reach desired cells.

3. Click the "New Game" button to start a new game with the specified settings.

4. During each turn, the name of the player who should play will be surrounded by a box. <br> Each player should click on the cell of the gameboard they wish to mark.

5. The winner is **the first player to mark all of the cells in a single row, column, or diagonal** - If all cells of the gameboard are marked before either player manages to meet the aforementioned condition, then neither player wins.

6. After the game ends, you can edit the player names and gameboard size again and click "New Game" to start a new game with the new settings. <br> You may also start a new game in the middle of one in progress, but you may only edit the gameboard size.

## Contributing to or Forking the project

### Contribution

If you do not mind contributing to this project, start by checking the [issues](https://github.com/ali-aboulsauood/tic-tac-toe/issues) and see if you can resolve them.

If you have any improvements to the project code, or small features to add, feel free to create a pull request.

**Contributors' GitHub profiles will be linked to in the [acknowledgements](#acknowledgements) section of this README file**.

### Forking

If you decide to fork this project, please link to [this repository](https://github.com/ali-aboulsauood/tic-tac-toe) in your repository's README file and to [the project's GitHub Pages website](https://ali-aboulsauood.github.io/tic-tac-toe) in your project release. This is not required by the [license of this project](https://github.com/ali-aboulsauood/tic-tac-toe/blob/main/LICENSE), but I would appreciate it.

## Design

The design of this project aims to make it look more like an activity page in an elementary school workbook, albeit more colorful, with user-generated content (player names and marks on the gameboard) looking like the writing of children on the said page.

This direction affected the choice of [background image](#background-image), [fonts and colors](#fonts-and-colors).

### Background Image

The background image is [_white textile on a brown wooden table_](https://unsplash.com/photos/white-textile-on-brown-wooden-table-_kUxT8WkoeY) by [Marjan Blan on Unsplash](https://unsplash.com/@marjan_blan).

### Fonts and Colors

### Fonts

The following are the main fonts used for this project. Each link leads to the respective [Google Fonts](https://fonts.google.com) page of the font.

| Type of text                                | Font                                                                                 |
|---------------------------------------------|--------------------------------------------------------------------------------------|
| Title and Player marks (not user-generated) | [Caveat](https://fonts.google.com/specimen/Caveat)                                   |
| Main text                                   | [Comic Neue](https://fonts.google.com/specimen/Comic+Neue)                           |
| User-generated content                      | [Waiting for the Sunrise](https://fonts.google.com/specimen/Waiting+for+the+Sunrise) |

### Colors

The following are the colors used for this project. Each link leads to the respective [ColorHexa](https://www.colorhexa.com) page of the color.

[Crayola](https://www.crayola.com) colors have been obtained from this [list of Crayola crayon colors on Wikipedia](https://en.wikipedia.org/wiki/List_of_Crayola_crayon_colors#Standard_colors).

| Type of item                 | Color                                                                                          |
|------------------------------|------------------------------------------------------------------------------------------------|
| Main text                    | [`#000000`](https://www.colorhexa.com/000000) (Black)                                          |
| Player 'X' mark              | [`#ED0A3F`](https://www.colorhexa.com/ED0A3F) ([Crayola](https://www.crayola.com/) Red)        |
| Player 'O' mark              | [`#0066FF`](https://www.colorhexa.com/0066FF) ([Crayola](https://www.crayola.com/) Blue (III)) |
| Draw/Input placeholder       | [`8B8680`](https://www.colorhexa.com/8B8680) ([Crayola](https://www.crayola.com/) Gray)        |
| Selection background         | [`hsl(60, 100%, 45%)`](https://www.colorhexa.com/E6E600) with `85%` opacity                  |

The selection background color is based on _Maximum Yellow_ Crayola color ([`#FAFA37`](https://www.colorhexa.com/FAFA37)), with modifications to saturation, lightness, and opacity.

## Acknowledgements

_No one has contributed to this project yet - [Be the first to contribute!](#contribution)_

## Other Projects

Feel free to view my other projects on GitHub:

- [_Rock, Paper, Scissors!_ console game](https://github.com/ali-aboulsauood/rock-paper-scissors-cpp)
- [_Math Game_](https://github.com/ali-aboulsauood/math-game)

### Other Projects with The Odin Project

The following are my previous projects with The Odin Project, ordered from the earliest to the most recent:

1. [_Recipes_](https://github.com/ali-aboulsauood/odin-recipes)
2. [_Landing Page_](https://github.com/ali-aboulsauood/landing-page)
3. [_Rock, Paper, Scissors_](https://github.com/ali-aboulsauood/rock-paper-scissors)
4. [_Etch-A-Sketch_](https://github.com/ali-aboulsauood/etch-a-sketch)
5. [_Calculator_](https://github.com/ali-aboulsauood/calculator)
6. [_Sign-Up Form_](https://github.com/ali-aboulsauood/sign-up-form)
7. [_Admin Dashboard_](https://github.com/ali-aboulsauood/admin-dashboard)
8. [_Library_](https://github.com/ali-aboulsauood/library)
