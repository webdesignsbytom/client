import React, { useRef, useEffect, useState } from 'react';
// Data
import { GridData } from '../../utils/data/GameGridData';
import { TileObject } from './tileObject';

const IsometricGridCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const gridRef = useRef([]);

  const [gridDataObject] = useState(GridData);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    var rect = canvas.parentNode.getBoundingClientRect();

    canvas.style.backgroundColor = '#bee0ec';

    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

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

    context.beginPath();
    context.arc(centreX, centreY, 5, 0, 2 * Math.PI);
    context.fillStyle = 'black';
    context.fill();
  };

  const drawIsometricGrid = () => {
    let context = contextRef.current

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

    tempGridArray.forEach((tile) => {
      const colour = tile.hovered ? 'blue' : tile.colour;
      tile.draw(colour, context);
    });
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

        let gridSq = new TileObject(
          tileIdNum,
          offX,
          offY,
          tileColumnOffset,
          tileRowOffset,
          colour
        );

        tileIdNum++;

        gridSq.draw(colour, context);

        tempGridArray.push(gridSq);
      }

      gridRef.current = tempGridArray;
    }
  };

  const selectTile = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
  
    const clickedTile = gridRef.current.find((tile) =>
      checkPointInPolygon({ x: offsetX, y: offsetY }, tile.vertices)
    );
  
    if (clickedTile) {
      clickedTile.selectTile();
    }
  
    drawIsometricGrid();
  };

  const handleMouseMove = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    gridRef.current.forEach((tile) => {
      const isHovered = checkPointInPolygon(
        { x: offsetX, y: offsetY },
        tile.vertices
      );
      tile.setHovered(isHovered);
    });

    drawIsometricGrid();
  };

  const checkPointInPolygon = (point, vertices) => {
    let collision = false;
    for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      const xi = vertices[i].x;
      const yi = vertices[i].y;
      const xj = vertices[j].x;
      const yj = vertices[j].y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

      if (intersect) {
        collision = !collision;
      }
    }
    return collision;
  };

  return <canvas ref={canvasRef} onMouseDown={selectTile} onMouseMove={handleMouseMove} />;
};

export default IsometricGridCanvas;
