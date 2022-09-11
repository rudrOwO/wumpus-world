import { useEffect, useRef, useState } from "react"
import { Center, useDisclosure } from "@chakra-ui/react"
import { generateStage, initGame } from "../lib/game"
import { useSimulation } from "../contexts/Simulation"
import { UploadStageButton } from "./UploadStageButton"
import { UploadStageModal } from "./UploadStageModal"

export const Stage = () => {
  const [rawCSV, setRawCSV] = useState("")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { isPlaying } = useSimulation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    // Setting convas co-ordinate system to containing loyout element
    const canvas = canvasRef.current!
    const container = containerRef.current!
    const canvasDimension = Math.min(container.clientHeight, container.clientWidth)

    canvas.width = canvasDimension
    canvas.height = canvasDimension

    generateStage(rawCSV)
    initGame(canvas.getContext("2d")!, canvasDimension)
  }, [rawCSV])

  useEffect(() => {
    // TODO Call loopGame() here
  }, [isPlaying])

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
