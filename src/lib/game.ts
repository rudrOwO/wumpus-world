import { Slot, SlotType } from "./slot"

export interface Position {
  x: number
  y: number
}

// Export refences to images
export const wumpusImage = new Image()
export const goldImage = new Image()
export const agentImage = new Array<HTMLImageElement>()

let stage: Slot[][] = []

export const generateStage = (rawCSV: string, canvasDimension: number) => {
  // * Raw String to array of 'S' | 'W' | 'A' | 'P' | 'G'
  // const normalizedCSV: Array<Array<"S" | "W" | "A" | "P" | "G">> = []

  rawCSV.replace(/[, \n]/, "")
  console.log(rawCSV)

  return

  const scale = canvasDimension / 12
  const newStage: Slot[][] = []
  const initalPos: Position = { x: scale, y: canvasDimension / 2 }

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      newStage[y][x] = new Slot(SlotType[rawCSV[10 * y + x]], {
        x: initalPos.x + x * scale,
        y: initalPos.y + x * scale * 0.5,
      })
    }

    initalPos.x += scale
    initalPos.y -= scale / 2
  }

  stage = newStage
}

export const loadGameAssets = async (ctx: CanvasRenderingContext2D, canvasDimension: number) => {
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

  ctx.font = "bold 18px sans"
}

export const runGameLoop = (ctx: CanvasRenderingContext2D, canvasDimension: number) => {
  // ! Test Stuff
  const testPos = { y: canvasDimension / 2, x: canvasDimension / 2 }
  const testSlot = new Slot(SlotType.W, testPos)

  testSlot.isHidden = false
  testSlot.hasStench = false
  testSlot.hasBreeze = true
  // ! Test Stuff

  // * Loops for drawing the stage ~ Uses Painter's Algorithm
  testSlot.drawTile(ctx, canvasDimension / 12)
  testSlot.drawEnvironmentVariable(ctx, canvasDimension / 12)
}
