import { drawCircle } from "./utils"

export const initGameLoop = (ctx: CanvasRenderingContext2D, canvasDimension: number) => {
  ctx.strokeStyle = "black"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(canvasDimension / 2, canvasDimension / 2)
  ctx.lineTo(canvasDimension, canvasDimension)
  ctx.stroke()
  ctx.closePath()
  // drawCircle(ctx, 10, 3)
}
