import React from "react";
import { useState } from "react";
import Pixel from "./Pixel";

const width = 11;
const height = 21;
let block = 0;

interface Props {
  className: string;
}

class Block {
  color: string = "#fff";
  x: number = 0;
  y: number = -10;
  shape: number[][] = [];
  shapeId: number = 0;
  constructor(color: string, x: number, shape: number[][], shapeId: number) {
    this.color = color;
    this.x = x;
    this.shape = shape;
    this.shapeId = shapeId;
  }
}

const pixelsColors: [string, number, number, number][] = [];

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    pixelsColors.push(["#fff", 0, -5 + j, -10 + i]);
  }
}

const board: React.ReactNode[][] = [];
for (let i = 0; i < height; i++) {
  board.push([]);
  for (let j = 0; j < width; j++) {
    board[i].push(
      <Pixel className="pixel" color="#fff" x={-5 + j} y={10 - i}></Pixel>
    );
  }
}

const shapes = [
  [
    [0, 0],
    [-1, 0],
    [1, 0],
    [2, 0],
  ],
  [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [0, -1],
  ],
  [
    [0, 0],
    [-1, 0],
    [-2, 0],
    [0, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, -1],
  ],
  [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 1],
  ],
  [
    [0, 0],
    [0, 1],
    [1, 1],
    [1, 0],
  ],
];

function moveToTheWorldSpace(block: Block) {
  const worldSpacePoints: number[][] = [];
  block.shape.forEach((point) =>
    worldSpacePoints.push([block.x + point[0], block.y + point[1]])
  );
  return worldSpacePoints;
}

function createBlock() {
  let color: string = "#fff";
  const drawColor: number = Math.floor(Math.random() * 4);
  if (drawColor === 0) {
    color = "#f00";
  } else if (drawColor === 1) {
    color = "#0f0";
  } else if (drawColor === 2) {
    color = "#00f";
  } else {
    color = "#ff0";
  }
  const drawShape = Math.floor(Math.random() * 6);
  const shape = shapes[drawShape];
  let x = 0;
  if (drawShape === 0) {
    x = 3 - Math.floor(Math.random() * 8);
  } else if (drawShape === 1 || drawShape === 2) {
    x = 5 - Math.floor(Math.random() * 9);
  } else if (drawShape === 3 || drawShape === 5) {
    x = 4 - Math.floor(Math.random() * 10);
  } else if (drawShape === 4) {
    x = 5 - Math.floor(Math.random() * 10);
  }
  return new Block(color, x, shape, drawShape);
}

function moveBlock(block: Block, direct: number) {
  const newCoord: number[][] = [];
  let flag = true;
  if (direct === -1) {
    block.shape.forEach((coord) => {
      if (coord[0] - 1 < -5 && !flag) flag = true;
      else newCoord.push([coord[0] - 1, coord[1]]);
    });
  } else if (direct === 1) {
    block.shape.forEach((coord) => {
      if (coord[0] + 1 > 5 && !flag) flag = true;
      else newCoord.push([coord[0] + 1, coord[1]]);
    });
  } else if (direct === 0) {
    block.shape.forEach((coord) => {
      if (coord[0] + 1 > 5 && !flag) flag = true;
      else newCoord.push([coord[0], coord[1] - 1]);
      newCoord.forEach((item) => {
        if (item[1] > 10) {
          flag = false;
        }
      });
      if (flag) {
        newCoord.forEach((item) => {
          const pixel1: React.ReactNode = board[item[0]][item[1]];
          if (React.isValidElement(pixel1)) {
            const pix = pixel1.props;
            const color = pix.color;
            if (color !== "#fff") flag = false;
          }
        });
      }
      if (!flag) {
        pixelsColors
          .filter((item) => item[1] === 1)
          .forEach((item) => (item[1] = 0));
        block.shape = newCoord;
        newCoord.forEach((item) =>
          pixelsColors
            .filter((item2) => item[0] === item2[2] && item[1] === item2[3])
            .forEach((item) => (item[1] = 2))
        );
      }
    });
  }
  if (!flag) {
    newCoord.forEach((coord) => {
      const pixel1: React.ReactNode = board[coord[0]][coord[1]];
      if (React.isValidElement(pixel1)) {
        const pix = pixel1.props;
        const color = pix.color;
        if (color !== "#fff") flag = false;
      }
    });
    if (flag) {
      pixelsColors
        .filter((item) => item[1] === 1)
        .forEach((item) => (item[1] = 0));
      block.shape = newCoord;
      newCoord.forEach((item) =>
        pixelsColors
          .filter((item2) => item[0] === item2[2] && item[1] === item2[3])
          .forEach((item) => (item[1] = 1))
      );
    }
  }
}

function rotateBlock(block: Block) {
  const newCoord: number[][] = [];
  block.shape.forEach((coord) => newCoord.push([coord[1], -coord[0]]));
  let flag = true;
  let [minX, maxX, maxY] = [0, 0, 0];
  newCoord.forEach((coord) => {
    const pixel1: React.ReactNode = board[coord[0]][coord[1]];
    if (React.isValidElement(pixel1)) {
      const pix = pixel1.props;
      const [x, y] = [pix.x, pix.y];
      x < -5 ? (minX = x) : x > 5 ? (maxX = x) : y > 10 ? (maxY = y) : 0;
    }
  });
  if (minX < -5) {
    newCoord.forEach((coord) => (coord[0] += -5 - minX));
  } else if (maxX > 5) {
    newCoord.forEach((coord) => (coord[0] -= maxX - 5));
  } else if (maxY > 10) {
    newCoord.forEach((coord) => (coord[1] -= maxY - 10));
  }
  newCoord.forEach((coord) => {
    const pixel1: React.ReactNode = board[coord[0]][coord[1]];
    if (React.isValidElement(pixel1)) {
      const pix = pixel1.props;
      const color = pix.color;
      if (color !== "#fff") flag = false;
    }
  });
  if (flag) {
    pixelsColors
      .filter((item) => item[1] === 1)
      .forEach((item) => (item[1] = 0));
    block.shape = newCoord;
    newCoord.forEach((item) =>
      pixelsColors
        .filter((item2) => item[0] === item2[2] && item[1] === item2[3])
        .forEach((item) => (item[1] = 1))
    );
  }
}
function startGame() {
  let blockScreen: Block;
  if (block === 0) {
    blockScreen = createBlock();
    block = 1;
  }
  document.addEventListener("keypress", (event) => {
    if (event.key === "ArrowLeft") {
      moveBlock(blockScreen, -1);
    } else if (event.key === "ArrowRight") {
      moveBlock(blockScreen, 1);
    } else if (event.key === "Space") {
      rotateBlock(blockScreen);
    }
  });
  const interval = setInterval(
    () =>
      blockScreen.shape.forEach((item) => {
        moveBlock(blockScreen, 0);
      }),
    750
  );
}

const groups: React.ReactNode[] = [];
board.forEach((item) => {
  let li: React.ReactNode;
  item.map((item2) => {
    if (React.isValidElement(item2)) {
      const pixel1 = item2.props;
      const color = pixelsColors.filter(
        (item3) => item3[2] === pixel1.x && item3[3] === pixel1.y
      )[0][0];
      const pixel2 = { ...pixel1, color: color };
      li = [li, React.cloneElement(item2, pixel2)];
    } else {
      li = [li, item2];
    }
  });
  groups.push(li);
});

const Tetris = ({ className }: Props) => {
  const lines: React.ReactNode[] = [];
  startGame();
  return (
    <ul>
      {groups.map((item) => (
        <div>{item}</div>
      ))}
    </ul>
  );
};

export default Tetris;
