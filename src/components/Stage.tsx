import { useEffect, useRef } from "react"
import { Center } from "@chakra-ui/react"
import { generateStage, loadGameAssets, gameTick } from "../lib/game"
import { useSimulation } from "../contexts/Simulation"

interface StageProps {
  flex: number
  environment: string
}

export const Stage = ({ flex, environment }: StageProps) => {
  const { isPlaying, step } = useSimulation()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const canvasUnit = useRef(-1)

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!

    canvasContext.current = canvas.getContext("2d")!

    // Setting 2:1 Aspect Ratio for the canvas
    canvas.width = Math.max(container.clientHeight, container.clientWidth)
    canvasUnit.current = canvas.width / 20
    canvas.height = canvas.width / 2 + canvasUnit.current

    loadGameAssets(canvasContext.current).then(_ => {
      gameTick(canvasContext.current!, canvasUnit.current)
    })
  }, [])

  useEffect(() => {
    //@ts-ignore
    generateStage(environment, canvasUnit.current)
  }, [environment])

  useEffect(() => {
    // TODO Change the Agent's operation mode (Auto / Stepped)
  }, [isPlaying])

  useEffect(() => {
    // Signal Agent to execute one Step
    gameTick(canvasContext.current!, canvasUnit.current)
  }, [step])

  return (
    <Center flex={flex} h="100%" mx="25px" ref={containerRef}>
      <canvas ref={canvasRef} />
    </Center>
  )
}
