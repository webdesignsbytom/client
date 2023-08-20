export class TileObject {
  constructor(id, offX, offY, tileColumnOffset, tileRowOffset, colour) {
    this.id = id;
    this.offX = offX;
    this.offY = offY;
    this.tileColumnOffset = tileColumnOffset;
    this.tileRowOffset = tileRowOffset;
    this.colour = colour;

    // Define the vertices of the tile
    this.vertices = [
      { x: offX, y: offY + tileRowOffset / 2 },
      { x: offX + tileColumnOffset / 2, y: offY },
      { x: offX + tileColumnOffset, y: offY + tileRowOffset / 2 },
      { x: offX + tileColumnOffset / 2, y: offY + tileRowOffset },
    ];
  }

  // Draw the tile using stored vertices
  draw(color, context) {
    color = typeof color !== 'undefined' ? color : this.colour;
    context.strokeStyle = color;
    context.beginPath();
    context.lineWidth = 1;

    for (let i = 0; i < this.vertices.length; i++) {
      const startVertex = this.vertices[i];
      const endVertex = this.vertices[(i + 1) % this.vertices.length];

      context.moveTo(startVertex.x, startVertex.y);
      context.lineTo(endVertex.x, endVertex.y);
    }

    context.stroke();
  }
}
