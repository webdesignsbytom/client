export class TileObject {
  constructor(id, offX, offY, tileColumnOffset, tileRowOffset, colour) {
    this.id = id;
    this.offX = offX;
    this.offY = offY;
    this.tileColumnOffset = tileColumnOffset;
    this.tileRowOffset = tileRowOffset;
    this.colour = colour;
  }

  draw(x1, y1, x2, y2, color, context) {
    color = typeof color !== 'undefined' ? color : 'white';
    context.strokeStyle = color;
    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
}
