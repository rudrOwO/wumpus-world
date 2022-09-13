import { Dispatch, SetStateAction, useCallback } from "react"
import { useDisclosure } from "@chakra-ui/react"
import { GenerateStageModal } from "./GenerateStageModal"
import { GenerateStageButton } from "./GenerateStageButton"

import { useSimulation } from "../contexts/Simulation"

interface ModalProps {
  setEnvironment: Dispatch<SetStateAction<string>>
}

export const GenerateStage = ({ setEnvironment }: ModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { setIsPlaying } = useSimulation()

  const handleClick = useCallback(() => {
    setIsPlaying(false)
    onOpen()
  }, [])

  return (
    <>
      <GenerateStageModal isOpen={isOpen} onClose={onClose} setEnvironment={setEnvironment} />
      <GenerateStageButton onClick={handleClick} />
    </>
  )
}
