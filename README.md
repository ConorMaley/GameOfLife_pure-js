# CONWAY'S GAME OF LIFE
### (using only HTML/CSS and *PURE* Javascript)

#### Getting Started: 

Live demo [here](https://conormaley.github.io/GameOfLife_pure-js/). Compatible with chrome 62, unsure about other browsers.

#### Description:
This is [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) written in pure Javascript (*0 libraries/frameworks used in development! Wow!*). [Jasmine.js](https://jasmine.github.io) is used for unit testing.

Use the input boxes, buttons, and slider to begin manipulating the simulation.

Grid does not loop (flat 2D surface). Max grid size is 64x64. Click on any grid element to create/kill cell.

View Jasmine test results by clicking the link in the top right corner.

#### Future additions:
Increase efficency
 - update size - detect increase/decrease will increase efficency
 - larger grids (zoom option?)
 - storing neighbors as pointers of some sort instead of counting each neighbor each frame may save time
 - better neighbor calculation in general (>4 & live -> stop counting)
Data dump
 - plot population sizes at different points in time
More styling (although, the simple black and white does look nice)
Test other browsers
More unit testing
 - mainly for html functionality (use karma in future)
Layout code better
 - limit globals, more clear architecture

#### Bugs:
Potential incorrect board update when creating/killing a cell while game is running
 - may desynch board and boardElements arrays
