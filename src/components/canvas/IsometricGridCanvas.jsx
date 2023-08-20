import React, { useRef, useEffect, useState } from 'react';
// Data
import { GridData } from '../../utils/data/GameGridData';
import {
  drawIsometricGrid,
  findAndMarkCenterPoint,
} from './setUp/SetUpFunctions';
import { checkPointInPolygon } from './grid/GridFunctions';

const IsometricGridCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const gridRef = useRef([]);

  const [gridDataObject] = useState(GridData);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

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
    drawIsometricGrid(
      contextRef,
      canvasRef,
      gridDataObject,
      gridRef,
      zoomLevel,
      panOffset
    );
    findAndMarkCenterPoint(context, canvas);
  }, []);

  const selectTile = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    const clickedTile = gridRef.current.find((tile) =>
      checkPointInPolygon({ x: offsetX, y: offsetY }, tile.vertices)
    );

    if (clickedTile) {
      clickedTile.selectTile();
    }

    drawIsometricGrid(
      contextRef,
      canvasRef,
      gridDataObject,
      gridRef,
      zoomLevel,
      panOffset
    );
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

    drawIsometricGrid(
      contextRef,
      canvasRef,
      gridDataObject,
      gridRef,
      zoomLevel,
      panOffset
    );
  };

  // const handleWheel = (e) => {
  //   e.preventDefault();

  //   const scrollSpeed = 0.1; // Adjust the zooming speed as needed
  //   const newZoomLevel = Math.max(0.1, zoomLevel + e.deltaY * scrollSpeed);

  //   const offsetX = (canvasRef.current.width / 2 - e.clientX) * scrollSpeed;
  //   const offsetY = (canvasRef.current.height / 2 - e.clientY) * scrollSpeed;

  //   setPanOffset((prevOffset) => ({
  //     x: prevOffset.x + offsetX,
  //     y: prevOffset.y + offsetY,
  //   }));

  //   setZoomLevel(newZoomLevel);
  //   drawIsometricGrid(
  //     contextRef,
  //     canvasRef,
  //     gridDataObject,
  //     gridRef,
  //     zoomLevel,
  //     panOffset
  //   );
  // };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={selectTile}
      onMouseMove={handleMouseMove}
    />
  );
};

export default IsometricGridCanvas;
