import React, { useRef, useEffect, useState } from 'react';
// Data
import { GridData } from '../../utils/data/GameGridData';
import { TileObject } from './tileObject';

const IsometricGridCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const gridRef = useRef([]);

  console.log('gridRef s', gridRef);

  const [gridDataObject, setGridDataObject] = useState(GridData);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    var rect = canvas.parentNode.getBoundingClientRect();

    canvas.style.backgroundColor = '#bee0ec';

    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    console.log('canvas.width: ', canvas.width);
    console.log('canvas.height: ', canvas.height);

    const context = canvas.getContext('2d');

    context.scale(1, 1);
    contextRef.current = context;

    context.clearRect(0, 0, canvas.width, canvas.height);
    findAndMarkCenterPoint(context, canvas);
    drawIsometricGrid(context, canvas);
  }, []);

  const findAndMarkCenterPoint = (context, canvas) => {
    let centreX = canvas.width / 2;
    let centreY = canvas.height / 2;
    console.log('centreX', centreX);
    console.log('centrey', centreY);

    context.beginPath();
    context.arc(centreX, centreY, 5, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
  };

  const drawIsometricGrid = (context, canvas) => {
    let tileColumnOffset = gridDataObject.tileColumnOffset; // pixels
    let tileRowOffset = gridDataObject.tileRowOffset; // pixels

    let tileIdNum = 0;

    let originX = 0; // offset from left
    let originY = 0; // offset from top

    let Xtiles = gridDataObject.totalXSquares;
    let Ytiles = gridDataObject.totalYSquares;

    let tempGridArray = gridRef.current;

    createGridTiles(
      tileColumnOffset,
      tileRowOffset,
      tileIdNum,
      originX,
      originY,
      Xtiles,
      Ytiles,
      tempGridArray,
      context
    );
  };

  const createGridTiles = (
    tileColumnOffset,
    tileRowOffset,
    tileIdNum,
    originX,
    originY,
    Xtiles,
    Ytiles,
    tempGridArray,
    context
  ) => {
    for (let Xi = 0; Xi < Xtiles; Xi++) {
      for (let Yi = 0; Yi < Ytiles; Yi++) {
        let offX =
          (Xi * tileColumnOffset) / 2 + (Yi * tileColumnOffset) / 2 + originX;
        let offY =
          (Yi * tileRowOffset) / 2 - (Xi * tileRowOffset) / 2 + originY;

        // Draw tile outline
        let colour = gridDataObject.colour;
        console.log('colour', colour);

        let gridSq = new TileObject(
          tileIdNum,
          offX,
          offY,
          tileColumnOffset,
          tileRowOffset,
          colour
        );

        console.log('gridSq', gridSq);

        tileIdNum++;

        gridSq.draw(colour, context);

        tempGridArray.push(gridSq);
      }

      console.log('tempGridArray', tempGridArray);
      gridRef.current = tempGridArray;
    }
  };

  const getMouse = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log('offsetX', offsetX);
    console.log('offsetY', offsetY);
  };

  return <canvas ref={canvasRef} onMouseDown={getMouse} />;
};

export default IsometricGridCanvas;
