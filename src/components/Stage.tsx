import { useEffect, useRef } from "react"
import { chakra, Center } from "@chakra-ui/react"
import { initGameLoop } from "../lib/gameLoop"

interface StageProps {}

export const Stage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!
    const canvasDimension = Math.min(container.clientHeight, container.clientWidth)

    canvas.width = canvasDimension
    canvas.height = canvasDimension

    initGameLoop(canvas.getContext("2d")!, canvasDimension)
  }, [])

  return (
    <Center flex={3} h="100%" ref={containerRef}>
      <chakra.canvas ref={canvasRef}></chakra.canvas>
    </Center>
  )
}
