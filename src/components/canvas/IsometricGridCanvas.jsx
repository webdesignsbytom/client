import React, { useRef, useEffect } from 'react';

const IsometricGridCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const gridRef = useRef([]);
  const availableGridSquareRef = useRef(12);
  const maxGridSquareRef = useRef(120);

  useEffect(() => {
    const canvas = canvasRef.current;
    var rect = canvas.parentNode.getBoundingClientRect();

    canvas.style.backgroundColor = '#bee0ec';

    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    console.log('canvas.width: ', canvas.width);
    const context = canvas.getContext('2d');

    context.scale(1, 1);
    // context.lineCap = 'round';
    // context.strokeStyle = 'black';
    // context.lineWidth = 1;
    contextRef.current = context;

    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log('AAA');
    drawIsometricGrid(context, canvas);
  }, []);

  const projectIsometric = (x, y, z) => {
    const projectionX = (x - y) * Math.cos(Math.PI / 6);
    const projectionY = (x + y) * Math.sin(Math.PI / 6) - z;
    return { x: projectionX, y: projectionY };
  };

  const drawIsometricGrid = (context, canvas) => {
    const totalGridSquares = maxGridSquareRef.current;
    let numSqCreated = 0;
    let gridSize = 20;
  
    // Calculate the center of the canvas
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
  
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 20; col++) {
        if (numSqCreated < 3) {
          // Calculate the coordinates for the center-aligned grid
          let x = centerX - (10 * gridSize) + col * gridSize;
          let y = centerY - (3 * gridSize) + row * gridSize;
  
          let projected = projectIsometric(x, y, 0);
          context.beginPath();
          context.moveTo(projected.x, projected.y);
  
          projected = projectIsometric(x + gridSize, y, 0);
          context.lineTo(projected.x, projected.y);
  
          projected = projectIsometric(x + gridSize, y + gridSize, 0);
          context.lineTo(projected.x, projected.y);
  
          projected = projectIsometric(x, y + gridSize, 0);
          context.lineTo(projected.x, projected.y);
  
          context.closePath();
          context.strokeStyle = '#333';
          context.stroke();
  
          numSqCreated++;
        }
      }
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
