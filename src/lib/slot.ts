import { Position } from "./game"

export enum SlotType {
  SAFE, // S
  WUMPUS, // W
  PIT, // P
  GOLD, // G
}

export class Slot {
  readonly type: number
  readonly renderLocation: Position

  isHidden = true
  hasStench = false
  hasBreeze = false

  constructor(type: SlotType, renderLocation: Position) {
    this.type = type
    this.renderLocation = renderLocation
  }

  drawToCanvas(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.type === SlotType.PIT) {
      // Draw nothing for a pit
      return
    }

    const { x, y } = { ...this.renderLocation }

    if (this.isHidden) {
      ctx.globalAlpha = 0.5
    }

    ctx.fillStyle = "#4a5568"

    // * Draw Isometric Tile
    ctx.beginPath()
    ctx.moveTo(x, y - scale / 2)
    ctx.lineTo(x + scale, y)
    ctx.lineTo(x, y + scale / 2)
    ctx.lineTo(x - scale, y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#2d3748"

    // * Draw Shadow of Isometric Tile
    ctx.beginPath()
    ctx.moveTo(x - scale, y)
    ctx.lineTo(x - scale, y + scale / 5)
    ctx.lineTo(x, y + scale / 2 + scale / 5)
    ctx.lineTo(x, y + scale / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + scale, y)
    ctx.lineTo(x + scale, y + scale / 5)
    ctx.lineTo(x, y + scale / 2 + scale / 5)
    ctx.lineTo(x, y + scale / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // TODO: Handle drawing Gold & Wumpus
    ctx.globalAlpha = 1
  }
}
