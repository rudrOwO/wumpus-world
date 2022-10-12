import { Slot } from "./slot"
import { Position, stage } from "./game"

export class Frontier {
  private center: Slot
  private neighbors: Array<Slot>

  constructor(center: Slot) {
    this.center = center
    this.neighbors = center.getNeighbors()
  }

  // TODO: check all neighbors for potential conflicts
  probabilisticReasoning() {}
}
