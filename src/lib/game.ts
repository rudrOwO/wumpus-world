import { Slot, SlotType } from "./slot"

export interface Position {
  x: number
  y: number
}

// Export refences to images
export const wumpusImage = new Image()
export const goldImage = new Image()
export const stenchImage = new Image()
export const breezeImage = new Image()
export const agentImage = new Array<HTMLImageElement>()

// TODO: Populate this with a default configuration
const stage: Array<Slot> = []

export const generateStage = (rawStageInput: string) => {
  // if (stage.length > 0) {
  //   return
  // }
  // TODO: Parse Raw input and generate Array<Slot>
}

export const initGame = async (ctx: CanvasRenderingContext2D, canvasDimension: number) => {
  // ? Test Stuff
  const testPos: Position = { y: canvasDimension / 2, x: canvasDimension / 2 }
  const testSlot = new Slot(SlotType.WUMPUS, testPos)

  testSlot.isHidden = false
  testSlot.hasStench = false
  testSlot.hasBreeze = false
  // ? Test Stuff

  // * Load images
  wumpusImage.src = "/wumpus.png"
  breezeImage.src = "/breeze.png"
  stenchImage.src = "/stench.png"
  goldImage.src = "/goldbricks.svg"

  for (let i = 0; i < 4; i++) {
    agentImage.push(new Image())
    agentImage[i].src = "/android" + i + ".svg"
  }

  // * Wait for all images to load
  await Promise.all(
    [wumpusImage, breezeImage, stenchImage, goldImage, ...agentImage].map(
      image =>
        new Promise<void>(resolve => {
          image.addEventListener("load", () => {
            resolve()
          })
        })
    )
  )

  // * Loops for drawing the stage ~ Uses Painter's Algorithm
  testSlot.drawTile(ctx, canvasDimension / 12)
  testSlot.drawEnvironmentVariable(ctx, canvasDimension / 12)
}

export const loopGame = () => {}
