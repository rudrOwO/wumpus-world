import { NavButton } from "./NavButton"
import { useCallback } from "react"
import { useSimulation } from "../contexts/Simulation"
import { RiPlayCircleLine, RiPauseCircleLine } from "react-icons/ri"

export const PlayPauseButton = () => {
  const { isPlaying, setIsPlaying } = useSimulation()!

  const handleToggle = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  return (
    <NavButton handleClick={handleToggle} toolTip="Play/Pause AI">
      {isPlaying ? <RiPlayCircleLine size="90%" /> : <RiPauseCircleLine size="90%" />}
    </NavButton>
  )
}
