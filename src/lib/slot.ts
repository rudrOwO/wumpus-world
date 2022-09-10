import { Position, wumpusImage, stenchImage, breezeImage, goldImage, agentImage } from "./game"

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

  public drawTile(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.type === SlotType.PIT) {
      // Draw nothing for a pit
      return
    }

    if (this.isHidden) {
      ctx.globalAlpha = 0.6
    }

    const { x, y } = { ...this.renderLocation }

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

    ctx.globalAlpha = 1
  }

  private drawWumpus(ctx: CanvasRenderingContext2D, scale: number) {
    const { x, y } = { ...this.renderLocation }

    ctx.drawImage(
      wumpusImage,
      x - scale * Math.SQRT1_2 * 0.75,
      y - scale * Math.SQRT2 * 0.7,
      scale * Math.SQRT2 * 0.8,
      scale * Math.SQRT2 * 0.8
    )
  }

  private drawGold(ctx: CanvasRenderingContext2D, scale: number) {
    const { x, y } = { ...this.renderLocation }
  }

  private drawSenses(ctx: CanvasRenderingContext2D, scale: number) {}

  drawEnvironmentVariable(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.isHidden) {
      ctx.globalAlpha = 0.6
    }

    if (this.type === SlotType.WUMPUS) {
      this.drawWumpus(ctx, scale)
      return
    }

    if (this.type === SlotType.GOLD) {
      this.drawGold(ctx, scale)
      return
    }

    this.drawSenses(ctx, scale) // Always draw indicators on a safe Tile

    ctx.globalAlpha = 1
  }
}
