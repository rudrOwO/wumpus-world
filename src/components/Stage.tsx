import { useEffect, useRef, useState } from "react"
import { Center, useDisclosure } from "@chakra-ui/react"
import { generateStage, loadGameAssets, runGameLoop } from "../lib/game"
import { useSimulation } from "../contexts/Simulation"
import { UploadStageButton } from "./UploadStageButton"
import { UploadStageModal } from "./UploadStageModal"

export const Stage = () => {
  const { isPlaying } = useSimulation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [rawCSV, setRawCSV] = useState(`
    S,S,S,S,S,S,S,S,S,S,
    P,S,S,S,S,S,S,S,P,S,
    S,S,S,S,W,S,S,S,S,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,S,S,S,G,S,S,S,S,
    S,S,S,S,S,S,S,S,W,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,W,S,S,S,
    S,S,S,S,S,S,S,S,S,S, 
  `)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const canvasDimension = useRef<number>(-1)

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!

    canvasDimension.current = Math.min(container.clientHeight, container.clientWidth)
    canvasContext.current = canvas.getContext("2d")!

    canvas.width = canvasDimension.current
    canvas.height = canvasDimension.current

    loadGameAssets(canvasContext.current, canvasDimension.current).then(_ => {
      // * Run the loop once to draw stuff on the screen
      runGameLoop(canvasContext.current!, canvasDimension.current)
    })
  }, [])

  useEffect(() => {
    generateStage(rawCSV, canvasDimension.current)
    runGameLoop(canvasContext.current!, canvasDimension.current)

    // TODO Cleanup Animation Frame
  }, [isPlaying, rawCSV])

  return (
    <>
      <UploadStageButton onOpen={onOpen} />
      <UploadStageModal isOpen={isOpen} onClose={onClose} setRawCSV={setRawCSV} />

      <Center flex={3} h="100%" ref={containerRef}>
        <canvas ref={canvasRef} />
      </Center>
    </>
  )
}
