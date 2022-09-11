import { Position, wumpusImage, goldImage, fontSize } from "./game"

export enum SlotType {
  S, // Safe
  W, // Wumpus
  P, // Pot
  G, // Gold
}

export class Slot {
  readonly type: number
  readonly renderLocation: Position
  static readonly hiddenOpacity = 0.33

  isHidden = true
  hasStench = false
  hasBreeze = false

  constructor(type: SlotType, renderLocation: Position) {
    this.type = type
    this.renderLocation = renderLocation
  }

  public drawTile(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type === SlotType.P) {
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
    ctx.moveTo(x, y - unit / 2)
    ctx.lineTo(x + unit, y)
    ctx.lineTo(x, y + unit / 2)
    ctx.lineTo(x - unit, y)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.fillStyle = "#2d3748"

    // * Draw Shadow of Isometric Tile
    if (!this.isHidden) {
      ctx.beginPath()
      ctx.moveTo(x - unit, y)
      ctx.lineTo(x - unit, y + unit / 5)
      ctx.lineTo(x, y + unit / 2 + unit / 5)
      ctx.lineTo(x, y + unit / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(x + unit, y)
      ctx.lineTo(x + unit, y + unit / 5)
      ctx.lineTo(x, y + unit / 2 + unit / 5)
      ctx.lineTo(x, y + unit / 2)
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }

    ctx.globalAlpha = 1
  }

  private drawWumpus(ctx: CanvasRenderingContext2D, unit: number) {
    const { x, y } = { ...this.renderLocation }

    ctx.drawImage(
      wumpusImage,
      x - unit * Math.SQRT1_2,
      y - unit * Math.SQRT2 * 0.9,
      unit * Math.SQRT2,
      unit * Math.SQRT2
    )
  }

  private drawGold(ctx: CanvasRenderingContext2D, unit: number) {
    const { x, y } = { ...this.renderLocation }

    ctx.drawImage(
      goldImage,
      x - unit * Math.SQRT1_2,
      y - unit * 0.9,
      unit * Math.SQRT2,
      unit * Math.SQRT2
    )
  }

  private drawSenses(ctx: CanvasRenderingContext2D, unit: number) {
    const { x, y } = { ...this.renderLocation }

    // Transforming Matrix for writing skewed Text
    ctx.translate(x - unit, y)
    ctx.rotate(-0.463647609) // arctan(1 / 2)
    ctx.translate(1.5 * fontSize, 1.5 * fontSize)
    ctx.fillStyle = "black"

    if (this.hasStench) {
      ctx.fillText("STENCH", 0, 0)
    }

    ctx.translate(fontSize, fontSize)
    // ctx.translate()

    if (this.hasBreeze) {
      ctx.fillText("BREEZE", 0, 0)
    }

    // Resetting Transformer to identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }

  drawEnvironmentVariable(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.isHidden) {
      ctx.globalAlpha = Slot.hiddenOpacity
    }

    if (this.type === SlotType.W) {
      this.drawWumpus(ctx, unit * 0.7)
      return
    }

    if (this.type === SlotType.G) {
      this.drawGold(ctx, unit * 0.9)
      return
    }

    if (this.type !== SlotType.P) {
      this.drawSenses(ctx, unit)
    }

    ctx.globalAlpha = 1
  }
}
