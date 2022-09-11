import { Position, wumpusImage, goldImage } from "./game"

export enum SlotType {
  SAFE, // S
  WUMPUS, // W
  PIT, // P
  GOLD, // G
}

export class Slot {
  readonly type: number
  readonly renderLocation: Position
  static readonly hiddenOpacity = 0.6

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
      ctx.globalAlpha = Slot.hiddenOpacity
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
      x - scale * Math.SQRT1_2,
      y - scale * Math.SQRT2 * 0.9,
      scale * Math.SQRT2,
      scale * Math.SQRT2
    )
  }

  private drawGold(ctx: CanvasRenderingContext2D, scale: number) {
    const { x, y } = { ...this.renderLocation }

    ctx.drawImage(
      goldImage,
      x - scale * Math.SQRT1_2,
      y - scale * 0.9,
      scale * Math.SQRT2,
      scale * Math.SQRT2
    )
  }

  private drawSenses(ctx: CanvasRenderingContext2D, scale: number) {
    const { x, y } = { ...this.renderLocation }

    // Transforming Matrix for writing skewed Text
    ctx.translate(x - scale, y + 20)
    ctx.rotate(-0.463647609) // arctan(1 / 2)
    ctx.fillStyle = "black"

    if (this.hasStench) {
      ctx.fillText("STENCH", 28, 4)
    }

    if (this.hasBreeze) {
      ctx.fillText("BREEZE", 56, 35)
    }

    // Resetting Transformer to identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawEnvironmentVariable(ctx: CanvasRenderingContext2D, scale: number) {
    if (this.isHidden) {
      ctx.globalAlpha = Slot.hiddenOpacity
    }

    if (this.type === SlotType.WUMPUS) {
      this.drawWumpus(ctx, scale * 0.75)
      return
    }

    if (this.type === SlotType.GOLD) {
      this.drawGold(ctx, scale * 0.9)
      return
    }

    if (this.type !== SlotType.PIT) {
      this.drawSenses(ctx, scale)
    }

    ctx.globalAlpha = 1
  }
}
