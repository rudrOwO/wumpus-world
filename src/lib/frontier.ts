import { Slot } from "./slot"
import { Position, stage } from "./game"

export class Frontier {
  private center: Slot
  private neighborhood: Array<Slot>

  constructor(center: Slot) {
    this.center = center
    this.neighborhood = center.getNeighborhood()
  }

  probabilisticReasoning() {
    const frequencyCount = new Map<Position, number>(
      this.neighborhood.map(slot => [slot.stageLocation, 0])
    )
    const upperLimit = 1 << this.neighborhood.length

    // * enumerate all possible neighborhoods
    for (let plate = 1; plate < upperLimit; plate++) {
      let mask = 1
      let newModel = new Array<Slot>()

      for (let i = 0; i < this.neighborhood.length; i++) {
        if (mask & plate) {
          newModel.push(this.neighborhood[i])
        }
        mask <<= 1
      }

      if (this.isModelValid(newModel)) {
        this.addModelToCount(frequencyCount, newModel)
      }
    }

    // * Assign probabilites
  }

  isModelValid(model: Array<Slot>) {
    return false
  }
  addModelToCount(frequencyCount: Map<Position, number>, model: Array<Slot>) {
    // const pos = this.neighborhood[i].stageLocation
    // frequencyCount.set(pos, frequencyCount.get(pos)! + 1)
  }
}
