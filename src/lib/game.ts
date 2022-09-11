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
  const sanitizedCSV = rawCSV.replace(/[^SWAPG]/g, "")
  const scale = canvasDimension / 16
  const newStage: Slot[][] = []
  const initalPos: Position = { x: canvasDimension / 2, y: (window.innerHeight - 10 * scale) / 2 }

  for (let y = 0; y < 10; y++) {
    newStage.push([])

    for (let x = 0; x < 10; x++) {
      newStage[y].push(
        //@ts-ignore
        new Slot(SlotType[sanitizedCSV[10 * y + x]], {
          x: initalPos.x + x * scale,
          y: initalPos.y + x * scale * 0.5,
        })
      )
    }

    initalPos.x -= scale
    initalPos.y += scale / 2
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

  stage[0][0].isHidden = false
  stage[0][1].isHidden = false
  stage[0][2].isHidden = false
  stage[0][3].isHidden = false
  stage[0][4].isHidden = false
  stage[0][5].isHidden = false
  stage[1][0].isHidden = false

  // stage[0][1].drawTile(ctx, canvasDimension / 12)
  // stage[0][1].drawEnvironmentVariable(ctx, canvasDimension / 12)

  // * Loops for drawing the stage ~ Uses Painter's Algorithm
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      stage[y][x].drawTile(ctx, canvasDimension / 16)
    }
  }

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      stage[y][x].drawEnvironmentVariable(ctx, canvasDimension / 16)
    }
  }
}
