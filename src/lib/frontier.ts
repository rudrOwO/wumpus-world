import { Slot } from "./slot"
import { Position, stage } from "./game"

export class Frontier {
  private center: Slot
  private neighbors: Array<Slot>

  constructor(center: Slot) {
    this.center = center
    this.neighbors = new Array<Slot>()
    const { x, y } = { ...center.stageLocation }

    const top: Position | null = y - 1 >= 0 ? { x: x, y: y - 1 } : null
    const down: Position | null = y + 1 < 10 ? { x: x, y: y + 1 } : null
    const left: Position | null = x - 1 >= 0 ? { x: x - 1, y: y } : null
    const right: Position | null = x + 1 < 10 ? { x: x + 1, y: y } : null

    for (const pos of [top, down, left, right]) {
      if (pos) {
        this.neighbors.push(stage[pos.y][pos.x])
      }
    }
  }

  // TODO: check all neighbors for potential conflicts
  probabilisticReasoning() {}
}
