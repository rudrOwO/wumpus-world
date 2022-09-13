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
  private static readonly heightScale = 0.3
  private static readonly grayScale: string = "95%"
  private readonly renderLocation: Position

  public readonly type: EnvironmentVariable = "S"
  public isSpeculation = true
  public hasStench = false
  public hasBreeze = false

  constructor(type: EnvironmentVariable, renderLocation: Position) {
    this.type = type
    this.renderLocation = renderLocation
  }

  private drawPolygon(ctx: CanvasRenderingContext2D, x: Array<number>, y: Array<number>) {
    ctx.beginPath()
    ctx.moveTo(x[0], y[0])
    ctx.lineTo(x[1], y[1])
    ctx.lineTo(x[2], y[2])
    ctx.lineTo(x[3], y[3])
    ctx.closePath()
    ctx.fill()
    ctx.stroke()
  }

  public drawTile(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type === "P") {
      return
    }
    const { x, y } = { ...this.renderLocation }

    // * Draw Isometric Tile
    ctx.fillStyle = "#6B46C1"
    this.drawPolygon(ctx, [x, x + unit, x, x - unit], [y - unit / 2, y, y + unit / 2, y])

    // * Draw Shadow of Isometric Tile
    ctx.fillStyle = "#44337A"
    this.drawPolygon(
      ctx,
      [x - unit, x - unit, x, x],
      [y, y + unit * Slot.heightScale, y + unit / 2 + unit * Slot.heightScale, y + unit / 2]
    )
    this.drawPolygon(
      ctx,
      [x + unit, x + unit, x, x],
      [y, y + unit * Slot.heightScale, y + unit / 2 + unit * Slot.heightScale, y + unit / 2]
    )
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
    let { x, y } = { ...this.renderLocation }
    y += unit * Slot.heightScale // Offset for pseudo height

    ctx.fillStyle = "#cd3132"
    this.drawPolygon(ctx, [x, x + unit, x, x - unit], [y - unit / 2, y, y + unit / 2, y])
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
    if (this.isSpeculation) {
      return
    }
    const { x, y } = { ...this.renderLocation }

    ctx.translate(x - unit, y) // Transforming Matrix for writing skewed Text
    ctx.rotate(-0.463647609) // arctan(1 / 2)
    ctx.translate(1.5 * fontSize, 1.5 * fontSize)
    ctx.fillStyle = "black"

    if (this.hasStench) {
      ctx.fillText("STENCH", 0, 0)
    }
    ctx.translate(1.5 * fontSize, 1.5 * fontSize)

    if (this.hasBreeze) {
      ctx.fillText("BREEZE", 0, 0)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Resetting Transformer to identity matrix
  }

  public drawToCanvas(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.isSpeculation) {
      ctx.filter = `grayscale(${Slot.grayScale})`
    }

    this.drawPit(ctx, unit)
    this.drawTile(ctx, unit)

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
