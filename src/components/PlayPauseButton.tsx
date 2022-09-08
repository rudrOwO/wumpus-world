import { NavButton } from "./NavButton"
import { useCallback, useState } from "react"
import { useSimulation } from "../contexts/Simulation"
import { RiPlayCircleLine, RiPauseCircleLine } from "react-icons/ri"

export const PlayPauseButton = () => {
  const { isPlaying, setIsPlaying } = useSimulation()!
  const [isTipped, setISTipped] = useState(false)

  const handleClick = useCallback(() => {
    setIsPlaying(prev => !prev)
    setISTipped(true)
  }, [isTipped])

  return (
    <NavButton onClick={handleClick} toolTip={isTipped ? "" : "Play/Pause Simulation"}>
      {isPlaying ? <RiPauseCircleLine size="90%" /> : <RiPlayCircleLine size="90%" />}
    </NavButton>
  )
}
