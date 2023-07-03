import React from "react";
import Pixel from "./Pixel";

const width = 11;
const height = 21;

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

const pixelsColors: [string, number][] = [];

for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    pixelsColors.push(["#fff", 0]);
  }
}

const board: React.ReactNode[][] = [];
for (let i = 0; i < height; i++) {
  board.push([]);
  for (let j = 0; j < width; j++) {
    board[i].push(
      <Pixel className="pixel" color="#fff" x={7 - j} y={10 - i}></Pixel>
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
  if (direct === -1) {
    if (
      ((block.shapeId === 1 || block.shapeId === 4) && block.x >= -4) ||
      ((block.shapeId === 1 || block.shapeId === 2) && block.x >= -3) ||
      (block.shapeId === 5 && block.x >= -5)
    ) {
      block.shape.forEach((coord) => newCoord.push([coord[0] - 1, coord[1]]));
    }
  } else if (direct === 1) {
    if (
      (block.shapeId === 0 && block.x <= 3) ||
      ((block.shapeId === 1 || block.shapeId === 2 || block.shapeId === 4) &&
        block.x <= 5) ||
      ((block.shapeId === 3 || block.shapeId === 5) && block.x <= 4)
    ) {
      block.shape.forEach((coord) => newCoord.push([coord[0] + 1, coord[1]]));
    }
  }
  let flag = false;
  newCoord.forEach((coord) => {
    const pixel1: React.ReactNode = board[coord[0]][coord[1]];
    if (React.isValidElement(pixel1)) {
      const pix = pixel1.props;
      const color = pix.color;
      if (color === "#fff") flag = true;
    }
  });
  if (!flag) {
    block.shape = newCoord;
  }
}

function startGame() {
  const color: number = Math.floor(Math.random() * 4);
}

const Tetris = () => {
  const lines: React.ReactNode[] = [];
  const items = board.map((item) => {
    lines[item.values.arguments.getAttriibute("y")] = `${
      lines[item.values.arguments.getAttribute("y")]
    }${item}`;
  });
  return <ul></ul>;
};

export default Tetris;
