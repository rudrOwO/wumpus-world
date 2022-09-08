import { NavButton } from "./NavButton"
import { useCallback, useState } from "react"
import { useSimulation } from "../contexts/Simulation"
import { RiArrowGoForwardLine } from "react-icons/ri"

export const StepForwardButton = () => {
  const { isPlaying: isPlaying } = useSimulation()!
  const [isTipped, setISTipped] = useState(false)

  const handleClick = useCallback(() => {
    setISTipped(true)
  }, [isTipped])

  return (
    <NavButton onClick={handleClick} toolTip={isTipped ? "" : "Step Forward"} disabled={isPlaying}>
      <RiArrowGoForwardLine size="80%" />
    </NavButton>
  )
}
