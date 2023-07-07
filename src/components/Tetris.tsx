import React, { useEffect, useRef } from "react";
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
  y: number = 10;
  shape: number[][] = [];
  shapeId: number = 0;
  constructor(color: string, x: number, shape: number[][], shapeId: number) {
    this.color = color;
    this.x = x;
    this.shape = shape;
    this.shapeId = shapeId;
  }
}

const Tetris = ({ className }: Props) => {
  const [pixelsColors, setPixelColors] = useState<
    [string, number, number, number][]
  >([]);
  const pixelsColorsRef = useRef(pixelsColors);
  const [oldCoords, setOldCoords] = useState<[number, number][]>([]);
  const oldCoordsRef = useRef<[number, number][]>([]);
  const [block, setBlock] = useState(0);
  const blockScreenRef = useRef<Block | null>(null);
  const [shape, setShape] = useState(createBlock());

  function setUpPixelColors() {
    const newPixelsColors: [string, number, number, number][] = [];
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 11; j++) {
        newPixelsColors.push(["#fff", 0, -5 + j, 10 - i]);
      }
    }
    pixelsColorsRef.current = newPixelsColors;
    return [...newPixelsColors];
  }

  function createBlock() {
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
    const blockShape = shapes[drawShape];
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
    return new Block(color, x, blockShape, drawShape);
  }

  function startGame() {
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

    let blockScreen: Block = createBlock();
    setBlock(1);

    window.addEventListener("keydown", (event) => {
      if (event.code === "ArrowLeft") {
        console.log("ArrowLeft");
        moveBlock(-1);
      } else if (event.code === "ArrowRight") {
        console.log("ArrowRight");
        moveBlock(1);
      } else if (event.code === "Space") {
        console.log("Space");
        rotateBlock();
      }
    });

    blockScreenRef.current = blockScreen;

    return blockScreen;
  }

  function moveBlock(direct: number) {
    setOldCoords([]);
    //console.log(`Kształt1: ${blockScreenRef.current?.shape}`);console.log(  `old coord1: ${oldCoords.length} ${blockScreenRef.current?.shape.length} Shape: ${blockScreenRef.current!.x}, ${blockScreenRef.current!.y}`);

    const old: [number, number][] = [];
    //console.log(`-1 Przesunięcie: ${blockScreenRef.current?.shape.length}`);
    blockScreenRef.current?.shape.forEach((item) => {
      old.push([
        item[0] + blockScreenRef.current!.x,
        item[1] + blockScreenRef.current!.y,
      ]);
    });
    setOldCoords(old);
    oldCoordsRef.current = old;
    //console.log(`-2 ${oldCoordsRef.current.length}`);

    console.log(
      `Przesunięcie: ${blockScreenRef.current!.y} ${
        oldCoordsRef.current.length
      }`
    );
    let flag = true;
    const newCoords: number[][] = [];
    if (direct === 0) {
      //console.log("Przesunięcie 0");
      oldCoordsRef.current.forEach((coord) => {
        //console.log(`Przesunięcie 01: ${coord[0]} ${coord[1]}`);
        if (coord[1] - 1 < -10) flag = false;
        else if (coord[1] <= 11) newCoords.push([coord[0], coord[1] - 1]);
      });
      //console.log(`Przesunięcie 02: ${newCoords.length} ${flag}`);
      if (flag) {
        //console.log(`Przesunięcie 1 ;; ${newCoords.length}`);
        newCoords.forEach((item) => {
          //console.log(`New: ${item[0]}, ${item[1]} ; ${(item[1] + 10) * 11 + (item[0] + 5)} Wartość: ${pixelsColorsRef.current[(item[1] + 10) * 11 + (item[0] + 5)]} ;; `);
          if (
            pixelsColorsRef.current[(item[1] + 10) * 11 + (item[0] + 5)][1] ===
            2
          ) {
            flag = false;
          }
        });
        //console.log(`Przesunięcie 1 // ${newCoords.length}`);
      }
      if (flag) {
        //console.log("Przesunięcie 2");
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            //console.log("Równe 1");
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        //console.log(`Koordy: ${newCoords.length}`);
        newCoords.forEach((item) => {
          //console.log("Zmiana na 1 (0)");
          pixelsColorsRef.current.forEach((item2) => {
            //console.log("Zmiana na 1 (1)");
            if (item[0] === item2[2] && item[1] === item2[3]) {
              //console.log("Zmiana na 1 (2)");
              item2[1] = 1;
              item2[0] = blockScreenRef.current!.color;
            }
          });
        });
        blockScreenRef.current!.y--;
      }
    } else if (direct === 1) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[0] + 1 > 5) flag = false;
        else newCoords.push([coord[0] + 1, coord[1]]);
      });
      if (flag) {
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        newCoords.forEach((item) => {
          pixelsColorsRef.current.forEach((item2) => {
            if (item[0] === item2[2] && item[1] === item2[3]) {
              item2[1] = 1;
              item2[0] = blockScreenRef.current!.color;
            }
          });
        });
        blockScreenRef.current!.x++;
      }
    } else if (direct === -1) {
      oldCoordsRef.current.forEach((coord) => {
        if (coord[0] - 1 < -5) flag = false;
        else newCoords.push([coord[0] - 1, coord[1]]);
      });
      if (flag) {
        pixelsColorsRef.current.forEach((item) => {
          if (item[1] === 1) {
            item[1] = 0;
            item[0] = "#fff";
          }
        });
        newCoords.forEach((item) => {
          pixelsColorsRef.current.forEach((item2) => {
            if (item[0] === item2[2] && item[1] === item2[3]) {
              item2[1] = 1;
              item2[0] = blockScreenRef.current!.color;
            }
          });
        });
        blockScreenRef.current!.x--;
      }
    }

    //console.log(`Kształt2: ${blockScreenRef.current!.shape}`);
  }

  function rotateBlock() {
    console.log("Rotate block");

    const newShapeCoords: [number, number][] = [];
    blockScreenRef.current?.shape.forEach((item) => {
      newShapeCoords.push([item[1], -item[0]]);
    });

    setOldCoords([]);

    let [minX, maxX, minY] = [0, 0, 0];
    const old: [number, number][] = [];
    let flag = true;

    newShapeCoords.forEach((item) => {
      if (item[0] + blockScreenRef.current!.x > maxX)
        maxX = item[0] + blockScreenRef.current!.x;
      if (item[0] + blockScreenRef.current!.x < minX)
        minX = item[0] + blockScreenRef.current!.x;
      if (item[1] + blockScreenRef.current!.y < minY)
        minY = item[1] + blockScreenRef.current!.y;
    });

    const moveX1 = Math.max(-5 - minX, 0);
    const moveX2 = Math.max(maxX - 5, 0);
    const moveY = Math.max(-10 - minY, 0);

    console.log(`Shape kordy ${newShapeCoords}`);

    newShapeCoords.forEach((item) => {
      item[0] = item[0];
      item[1] = item[1];
      old.push([
        item[0] + blockScreenRef.current!.x + moveX1 - moveX2,
        item[1] + blockScreenRef.current!.y + moveY,
      ]);
    });

    blockScreenRef.current!.x += moveX1 - moveX2;
    blockScreenRef.current!.y += moveY;

    setOldCoords(old);
    oldCoordsRef.current = old;

    console.log(
      `Przesunięcie: ${blockScreenRef.current!.y} ${
        oldCoordsRef.current.length
      }`
    );

    if (flag) {
      pixelsColorsRef.current.forEach((item) => {
        if (item[1] === 1) {
          item[1] = 0;
          item[0] = "#fff";
        }
      });
      oldCoordsRef.current.forEach((item) => {
        pixelsColorsRef.current.forEach((item2) => {
          if (item[0] === item2[2] && item[1] === item2[3]) {
            item2[1] = 1;
            item2[0] = blockScreenRef.current!.color;
          }
        });
      });
    }

    blockScreenRef.current!.shape = newShapeCoords;
  }

  const [test, setTest] = useState(0);
  const testRef = useRef(test);

  useEffect(() => {
    console.log(`Początkowo: ${test}`);
  }, []);

  useEffect(() => {
    if (testRef.current === 0) {
      setTest((prevTest) => prevTest + 1);
      setPixelColors(setUpPixelColors());
      return () => {
        setShape(startGame());
        setInterval(() => {
          moveBlock(0);
        }, 1000);
      };
    }
  }, []);

  return (
    <ul>
      {pixelsColors.map((item) => (
        <Pixel
          className="pixel"
          color={item[0]}
          x={item[2]}
          y={item[3]}
        ></Pixel>
      ))}
    </ul>
  );
};

export default Tetris;
