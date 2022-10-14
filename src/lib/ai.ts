import { agent, Position } from "./game"
import { Slot } from "./slot"
import { Frontier } from "./frontier"

const knowledgeBase = new Map<Position, Slot>()
const currentPlan = new Map<Position, Frontier>()

// NOTE Update KB for any 100% certain observation / deduction
export const updateKnowledgeBase = (slot: Slot) => {
  knowledgeBase.set(slot.stageLocation, slot)
  slot.isResolved = true
}

export const updateCurrentPlan = (slot: Slot) => {
  // Add a new frontier to current plan
  if (!currentPlan.has(slot.stageLocation)) {
    currentPlan.set(slot.stageLocation, new Frontier(slot))
  }

  for (const frontier of currentPlan.values()) {
    frontier.probabilisticReasoning()
  }
}
