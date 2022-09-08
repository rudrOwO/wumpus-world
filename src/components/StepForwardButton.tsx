import { NavButton } from "./NavButton"
import { useCallback } from "react"
import { useSimulation } from "../contexts/Simulation"
import { RiArrowGoForwardLine } from "react-icons/ri"

export const StepForwardButton = () => {
  const { isPlaying: isPlaying } = useSimulation()!

  //   const handleClick = useCallback(() => {}, [])

  return (
    <NavButton toolTip="Step Forward">
      <RiArrowGoForwardLine size="80%" />
    </NavButton>
  )
}
