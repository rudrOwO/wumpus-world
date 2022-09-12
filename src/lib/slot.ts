import { Position, wumpusImage, goldImage, fontSize } from "./game"
/*
 * LEGEND --
 *  S -> Safe
 *  W -> Wumpus
 *  P -> Pot
 *  G -> Gold
 */
export type EnvironmentVariable = "S" | "W" | "A" | "P" | "G"

export class Slot {
  readonly type: EnvironmentVariable = "S"
  readonly renderLocation: Position
  static readonly filterString = "grayscale(75%)"

  isHidden = true
  hasStench = false
  hasBreeze = false

  constructor(type: EnvironmentVariable, renderLocation: Position) {
    this.type = type
    this.renderLocation = renderLocation
  }

  public drawTile(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type === "P") {
      // Draw nothing for a pit
      return
    }
    if (this.isHidden) {
      ctx.filter = Slot.filterString
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
    ctx.beginPath()
    ctx.moveTo(x - unit, y)
    ctx.lineTo(x - unit, y + unit / 4)
    ctx.lineTo(x, y + unit / 2 + unit / 4)
    ctx.lineTo(x, y + unit / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x + unit, y)
    ctx.lineTo(x + unit, y + unit / 4)
    ctx.lineTo(x, y + unit / 2 + unit / 4)
    ctx.lineTo(x, y + unit / 2)
    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    ctx.filter = "none"
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

  public drawPit(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type !== "P") {
      return
    }
    if (this.isHidden) {
      ctx.filter = Slot.filterString
    }

    const { x, y } = { ...this.renderLocation }
    ctx.fillStyle = "#cd3132"

    // * Draw Isometric Pit
    ctx.beginPath()
    ctx.moveTo(x, y - unit / 2)
    ctx.lineTo(x + unit, y)
    ctx.lineTo(x, y + unit / 2)
    ctx.lineTo(x - unit, y)
    ctx.closePath()
    ctx.fill()

    ctx.filter = "none"
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

    ctx.translate(x - unit, y) // Transforming Matrix for writing skewed Text
    ctx.rotate(-0.463647609) // arctan(1 / 2)
    ctx.translate(1.5 * fontSize, 1.5 * fontSize)
    ctx.fillStyle = "black"

    if (this.hasStench) {
      ctx.fillText("STENCH", 0, 0)
    }
    ctx.translate(fontSize, fontSize)

    if (this.hasBreeze) {
      ctx.fillText("BREEZE", 0, 0)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Resetting Transformer to identity matrix
  }

  drawEnvironmentVariable(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.isHidden) {
      ctx.filter = Slot.filterString
    }

    switch (this.type) {
      case "W":
        this.drawWumpus(ctx, unit * 0.7)
        break
      case "G":
        this.drawGold(ctx, unit * 0.9)
        break
      default:
        this.drawSenses(ctx, unit)
    }

    ctx.filter = "none"
  }
}
