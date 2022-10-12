import { Position, wumpusImage, stage, goldImage, fontSize } from "./game"
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
  public readonly stageLocation: Position
  public readonly renderLocation: Position

  public type: EnvironmentVariable = "S"
  public hasStench = false
  public hasBreeze = false
  public isResolved = false

  public confidence = {
    wumpus: 0,
    pit: 0,
  }

  constructor(type: EnvironmentVariable, stageLocation: Position, renderLocation: Position) {
    this.type = type
    this.stageLocation = stageLocation
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

  public applyFilter(ctx: CanvasRenderingContext2D, on: "wumpus" | "pit" | "tile") {
    const grayScalePercentage = this.isResolved ? "0%" : "95%"
    const opacityPercentage =
      on === "tile" ? "100%" : on === "wumpus" ? this.confidence.wumpus : this.confidence.pit

    ctx.filter = `grayscale(${grayScalePercentage}) opacity(${opacityPercentage})`
  }

  public clearFilter(ctx: CanvasRenderingContext2D) {
    ctx.filter = "none"
  }

  public drawTile(ctx: CanvasRenderingContext2D, unit: number) {
    const { x, y } = { ...this.renderLocation }

    this.applyFilter(ctx, "tile")

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

    this.clearFilter(ctx)
  }

  private drawWumpus(ctx: CanvasRenderingContext2D, unit: number) {
    const { x, y } = { ...this.renderLocation }

    this.applyFilter(ctx, "wumpus")
    ctx.drawImage(
      wumpusImage,
      x - unit * Math.SQRT1_2,
      y - unit * Math.SQRT2 * 0.9,
      unit * Math.SQRT2,
      unit * Math.SQRT2
    )
    this.clearFilter(ctx)
  }

  public drawPit(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type !== "P") {
      return
    }
    let { x, y } = { ...this.renderLocation }
    y += unit * Slot.heightScale // Offset for pseudo height

    ctx.fillStyle = "#cd3132"

    this.applyFilter(ctx, "pit")
    this.drawPolygon(ctx, [x, x + unit, x, x - unit], [y - unit / 2, y, y + unit / 2, y])
    this.clearFilter(ctx)
  }

  private drawGold(ctx: CanvasRenderingContext2D, unit: number) {
    if (this.type !== "G" || !this.isResolved) {
      return
    }
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
    if (this.type !== "S" || !this.isResolved) {
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
    if (this.confidence.pit > 0) {
      this.drawPit(ctx, unit)
    } else {
      this.drawTile(ctx, unit)
    }
    this.drawWumpus(ctx, unit * 0.7)
    this.drawGold(ctx, unit * 0.9)
    this.drawSenses(ctx, unit)
  }

  public getNeighbors() {
    const neighbors = new Array<Slot>()
    const { x, y } = { ...this.stageLocation }

    const top: Position | null = y - 1 >= 0 ? { x: x, y: y - 1 } : null
    const down: Position | null = y + 1 < 10 ? { x: x, y: y + 1 } : null
    const left: Position | null = x - 1 >= 0 ? { x: x - 1, y: y } : null
    const right: Position | null = x + 1 < 10 ? { x: x + 1, y: y } : null

    for (const pos of [top, down, left, right]) {
      if (pos) {
        neighbors.push(stage[pos.y][pos.x])
      }
    }
    
    return neighbors
  }
}
