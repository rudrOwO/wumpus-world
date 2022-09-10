import { Position, agentImage } from "./game"

// * Defined in clockwise fasion
enum Direction {
  FORWARD,
  RIGHT,
  BACK,
  LEFT,
}

export class Agent {
  direction = Direction.FORWARD
  stageLocation: Position
  renderLocation: Position
  isMoving = false // Needed for smooth animation

  constructor(stageLocation: Position, renderLocation: Position) {
    this.stageLocation = stageLocation
    this.renderLocation = renderLocation
  }

  rotate() {
    // TODO: Change direction
  }

  move() {
    // TODO: Change both stageLocation & renderLocation here
  }
}
