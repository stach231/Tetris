## Tetris

## Overview

Tetris is my private implementation of the world-famous puzzle game created in the 1980s by Alexei Pazhytnov written using the React JavaScript library and in TypeScript. It is also my first project in which I used React.

## Control

Left arrow - move the block one pixel to left
Right arrow - move the block one pixel to right
Down arrow - accelerate falling of the block
Spacebar - rotate the block to the right
Enter - drop the block to the very bottom

## Rules

The game starts on a rectangular board (initially empty) called a tetrion or matrix, laid out horizontally with its shorter side.

In this version of the game the tetrion measures 21 rows by 11 columns.

During the course of the game, blocks made up of four small squares, appear individually at a random point on the top edge of the board.

Here, 7 different shapes capable of 4 different colours are implemented.

These blocks (reffered to as 'tetrimino') move towards the bottom edge as far as possible.

When one tetrimino falls to the bottom, it is immobilised and another appears at the top of the board.

The game continues until a block can't appear on the board.

The player's task is to arrange the tetriminoes on the board (by using rotation and moving the blocks horizontally) in such a way that the squares that make up the blocks form a row of uniform color across the width of the rectangle.

In such a situation, this row is removed and the remaining blocks fall by a number of pixels equal to the number of removed rows in the direction of the bottom, creating more space for the following elements.

It is possible to remove up to 4 rows at the same time, what is made possible by tetrimino "I".

Such a situation is named identically to the game, namely "Tetris".

## Score

The number of points received depends on the number of rows removed as a result of the fall of a single tetrimino.

So for 1 row, 100 points are allocated, for 2 rows 250 points, for 3 rows 450 points, and for "tetris" 700 points.

This number can be increased depending on how many rows were removed by the previous tetrimino, the so-called "combo".

One combo is worth 50 points.

They are counted from the first tetrimino in a row that removed the rows.

In addition, the player is allocated a bonus 10 points for each minute played.

Enjoy the game!

## About the original Tetris

https://pl.wikipedia.org/wiki/Tetris
