import { useRef } from "react"
import { chakra } from "@chakra-ui/react"

interface StageProps {}

export const Stage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  return <chakra.canvas w="100%" h="100%"></chakra.canvas>
}
