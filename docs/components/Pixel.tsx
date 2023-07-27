import React from "react";

interface Props {
  className: string;
  color: string;
  x: number;
  y: number;
}

const Pixel = ({ className, color, x, y }: Props) => {
  const param = {
    backgroundColor: color,
  };

  return <div className={className} style={param} data-x={x} data-y={y}></div>;
};

export default Pixel;
