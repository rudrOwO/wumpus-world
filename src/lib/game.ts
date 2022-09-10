import { Slot, SlotType } from "./slot"

export interface Position {
  x: number
  y: number
}

// TODO: Populate this with a default configuration
const stage: Array<Slot> = []

export const generateStage = (rawStageInput: string) => {
  // if (stage.length > 0) {
  //   return
  // }
  // TODO: Parse Raw input and generate Array<Slot>
}

export const initGame = (ctx: CanvasRenderingContext2D, canvasDimension: number) => {
  const testPos: Position = { y: canvasDimension / 2, x: canvasDimension / 2 }
  const testSlot = new Slot(SlotType.SAFE, testPos)

  testSlot.isHidden = false
  testSlot.hasStench = false
  testSlot.hasBreeze = false

  ctx.lineWidth = 1

  testSlot.drawToCanvas(ctx, canvasDimension / 12)
}
