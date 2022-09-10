export const drawCircle = function (
  ctx: CanvasRenderingContext2D,
  radius: number,
  thickness: number
) {
  ctx.lineWidth = thickness
  ctx.beginPath()
  ctx.arc(100, 100, radius, 0, 2 * Math.PI)
  ctx.stroke()
}
