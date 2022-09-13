import { Slot, EnvironmentVariable } from "./slot"

let stage: Slot[][] = []

export let fontSize: number
export interface Position {
  x: number
  y: number
}
// Export refences to images
export const wumpusImage = new Image()
export const goldImage = new Image()
export const agentImage = new Array<HTMLImageElement>()

export const generateStage = (environment: Array<EnvironmentVariable>, unit: number) => {
  fontSize = Math.sqrt(unit * unit * (5 / 4)) / 6
  const newStage: Slot[][] = []
  const initalPos: Position = { x: 10 * unit, y: unit }

  for (let y = 0; y < 10; y++) {
    newStage.push([])

    for (let x = 0; x < 10; x++) {
      newStage[y].push(
        new Slot(environment[10 * y + x], {
          // +x for Isometric X Axis
          x: initalPos.x + x * unit,
          y: initalPos.y + x * unit * 0.5,
        })
      )
    }

    // -1 for Isometric Y Axis
    initalPos.x -= unit
    initalPos.y += unit / 2
  }

  stage = newStage
}

export const loadGameAssets = async (ctx: CanvasRenderingContext2D) => {
  ctx.font = `bold ${fontSize}px sans`
  wumpusImage.src = "/wumpus.png"
  goldImage.src = "/goldbricks.svg"

  for (let i = 0; i < 4; i++) {
    agentImage.push(new Image())
    agentImage[i].src = "/android" + i + ".svg"
  }

  // * Wait for all images to load
  await Promise.all(
    [wumpusImage, goldImage, ...agentImage].map(
      image =>
        new Promise<void>(resolve => {
          image.addEventListener("load", () => {
            resolve()
          })
        })
    )
  )
}

export const gameTick = (ctx: CanvasRenderingContext2D, unit: number) => {
  ctx.clearRect(0, 0, 10 * 2 * unit, 10 * unit)

  stage[0][0].hasBreeze = true

  // * Drawing the stage with Painter's Algorithm
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      stage[y][x].drawToCanvas(ctx, unit)
    }
  }
}
