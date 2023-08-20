export class TileObject {
  constructor(id, offX, offY, tileColumnOffset, tileRowOffset, colour) {
    this.id = id;
    this.offX = offX;
    this.offY = offY;
    this.tileColumnOffset = tileColumnOffset;
    this.tileRowOffset = tileRowOffset;
    this.colour = colour;
    this.defaultColor = 'white';
    this.hovered = false; // Initialize as not hovered
    this.selected = false;

    // Define the vertices of the tile
    this.vertices = [
      { x: offX, y: offY + tileRowOffset / 2 },
      { x: offX + tileColumnOffset / 2, y: offY },
      { x: offX + tileColumnOffset, y: offY + tileRowOffset / 2 },
      { x: offX + tileColumnOffset / 2, y: offY + tileRowOffset },
    ];
  }

  draw(color, context) {
    color = typeof color !== 'undefined' ? color : this.colour;
    context.strokeStyle = color;
    context.fillStyle = this.backgroundColor; // Set the background color
    context.beginPath();
    context.lineWidth = 1;

    for (let i = 0; i < this.vertices.length; i++) {
      const startVertex = this.vertices[i];
      const endVertex = this.vertices[(i + 1) % this.vertices.length];

      context.moveTo(startVertex.x, startVertex.y);
      context.lineTo(endVertex.x, endVertex.y);
    }

    context.stroke();
    context.fill(); // Fill the tile with the background color
  }
  
  setHovered(hovered) {
    this.hovered = hovered;
  }

  selectTile() {
    if (this.selected) {
      console.log('Deselecting tile', this.id);
      this.selected = false;
      this.backgroundColor = 'white'; // Reset background color
    } else {
      console.log('Selecting tile', this.id);
      this.selected = true;
      this.backgroundColor = 'blue'; // Set background color to blue
    }
  }
}
