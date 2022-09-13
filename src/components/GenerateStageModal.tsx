import {
  chakra,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from "@chakra-ui/react"

import { useFormik } from "formik"
import { Dispatch, SetStateAction } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  setEnvironment: Dispatch<SetStateAction<string>>
}

export const GenerateStageModal = ({ isOpen, onClose, setEnvironment }: ModalProps) => {
  const formik = useFormik({
    initialValues: {
      csv: "",
    },

    onSubmit: values => {
      setEnvironment(values.csv.replace(/[^SWAPG]/g, "")) // Sanitized with Regex
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent bg="#e3e3e3">
        <ModalHeader>Input a CSV configuration for generating a Stage</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Box mb="15px">
              10 comma-separated rows of 10 letters each (for a 10X10 grid)
              <br />
              <strong>Legends: </strong>
              <code> A - Agent, G - Gold, W - Wumpus, P - Pit, S - Safe </code>
            </Box>
            <chakra.textarea
              bg="#eeeeee"
              outline="none"
              rows={10}
              borderRadius="lg"
              _focus={{
                outlineColor: "purple.600",
              }}
              fontSize="lg"
              padding="10px"
              width="100%"
              id="csv"
              name="csv"
              value={formik.values.csv}
              onChange={formik.handleChange}
              autoFocus
            />
          </ModalBody>

          <ModalFooter justifyContent="space-between">
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              colorScheme="unstyled"
              bg="purple.600"
              _hover={{
                background: "purple.700",
              }}
              onClick={onClose}
            >
              Generate
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
