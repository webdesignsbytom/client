import { TileObject } from './tileObject';
export const drawIsometricGrid = (
  contextRef,
  canvasRef,
  gridDataObject,
  gridRef,
  zoomLevel,
  panOffset,
) => {
  console.log('PPPPPPPPppp');
  let context = contextRef.current;
  let canvas = canvasRef.current;
  
  context.clearRect(0, 0, canvas.width, canvas.height);
  // Apply zoom
  context.setTransform(zoomLevel, 0, 0, zoomLevel, panOffset.x, panOffset.y);

  let tileColumnOffset = gridDataObject.tileColumnOffset; // pixels
  let tileRowOffset = gridDataObject.tileRowOffset; // pixels

  let Xtiles = gridDataObject.totalXSquares;
  let Ytiles = gridDataObject.totalYSquares;

  let tileIdNum = 0;

  let centreX = canvas.width / 2;
  let centreY = canvas.height / 2;

  // Calculate the adjusted origin for centering
  let originX = centreX - (Xtiles * tileColumnOffset) / 2;
  let originY = centreY - (Ytiles * tileRowOffset) / 2;

  originY += tileRowOffset * (Ytiles / 2);

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
    context,
    gridDataObject,
    gridRef
  );

  tempGridArray.forEach((tile) => {
    const colour = tile.hovered ? 'blue' : tile.colour;
    tile.draw(colour, context);
  });
};

export const createGridTiles = (
  tileColumnOffset,
  tileRowOffset,
  tileIdNum,
  originX,
  originY,
  Xtiles,
  Ytiles,
  tempGridArray,
  context,
  gridDataObject,
  gridRef
) => {
  for (let Xi = 0; Xi < Xtiles; Xi++) {
    for (let Yi = 0; Yi < Ytiles; Yi++) {
      let offX =
        (Xi * tileColumnOffset) / 2 + (Yi * tileColumnOffset) / 2 + originX;
      let offY = (Yi * tileRowOffset) / 2 - (Xi * tileRowOffset) / 2 + originY;

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

export const findAndMarkCenterPoint = (context, canvas) => {
  let centreX = canvas.width / 2;
  let centreY = canvas.height / 2;

  context.beginPath();
  context.arc(centreX, centreY, 5, 0, 2 * Math.PI);
  context.fillStyle = 'black';
  context.fill();
};
