import { PanelButton } from "./PanelButton"
import { useCallback, useState } from "react"
import { useSimulation } from "../contexts/Simulation"
import { RiArrowGoForwardLine } from "react-icons/ri"

export const StepForwardButton = () => {
  const { isPlaying, signalStep } = useSimulation()
  const [isTipped, setISTipped] = useState(false)

  const handleClick = useCallback(() => {
    setISTipped(true)
    signalStep(step => step + 1)
  }, [isTipped])

  return (
    <PanelButton
      onClick={handleClick}
      toolTip={isTipped ? "" : "Step Forward"}
      disabled={isPlaying}
    >
      <RiArrowGoForwardLine size="80%" />
    </PanelButton>
  )
}
