import { useEffect, useRef } from "react"
import { Center } from "@chakra-ui/react"
import { initGame } from "../lib/game"
import { useSimulation } from "../contexts/Simulation"

export const Stage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isPlaying } = useSimulation()

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!
    const canvasDimension = Math.min(container.clientHeight, container.clientWidth)

    canvas.width = canvasDimension
    canvas.height = canvasDimension

    initGame(canvas.getContext("2d")!, canvasDimension)
  }, [])

  useEffect(() => {
    // TODO Call loopGame() here
  }, [isPlaying])

  return (
    <Center flex={3} h="100%" ref={containerRef}>
      <canvas ref={canvasRef} />
    </Center>
  )
}
