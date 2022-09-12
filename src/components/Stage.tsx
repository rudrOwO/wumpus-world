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
    S,W,S,W,S,S,S,S,S,S,
    P,S,S,S,S,S,S,S,P,S,
    S,S,S,S,W,S,S,S,S,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,S,S,S,G,S,S,S,S,
    S,S,S,S,S,S,S,S,W,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,W,S,S,S,
    S,S,S,S,S,S,S,S,S,P, 
  `)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContext = useRef<CanvasRenderingContext2D | null>(null)
  const canvasUnit = useRef<number>(-1)

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!

    canvasContext.current = canvas.getContext("2d")!

    // Setting 2:1 Aspect Ratio for the canvas
    canvas.width = Math.max(container.clientHeight, container.clientWidth)
    canvas.height = canvas.width / 2

    canvasUnit.current = canvas.height / 10

    loadGameAssets(canvasContext.current).then(_ => {
      // * Run the loop once to draw stuff on the screen
      runGameLoop(canvasContext.current!, canvasUnit.current)
    })
  }, [])

  useEffect(() => {
    generateStage(rawCSV, canvasUnit.current)
    runGameLoop(canvasContext.current!, canvasUnit.current)

    // TODO Cleanup Animation Frame
    // TODO Clear Canvas on cleanup
  }, [isPlaying, rawCSV])

  return (
    <>
      <Center flex={5} h="100%" ml="10px" mr="20px" ref={containerRef}>
        <canvas ref={canvasRef} />
      </Center>
      <UploadStageButton onOpen={onOpen} />
      <UploadStageModal isOpen={isOpen} onClose={onClose} setRawCSV={setRawCSV} />
    </>
  )
}
