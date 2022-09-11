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
  setRawCSV: Dispatch<SetStateAction<string>>
}

export const UploadStageModal = ({ isOpen, onClose, setRawCSV }: ModalProps) => {
  const formik = useFormik({
    initialValues: {
      csv: "",
    },

    onSubmit: values => {
      setRawCSV(values.csv)
    },
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload CSV for generating a Stage</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={formik.handleSubmit}>
          <ModalBody>
            <Box mb="10px">
              10 comma-separated rows of 10 letters each (for a 10X10 grid)
              <br />
              <strong>Legends: </strong>
              <code> A - Agent, G - Gold, W - Wumpus, P - Pit, S - Safe </code>
              <br />
              <strong>Co-Orginate System: </strong>
              Top left character denotes (0, 0)
            </Box>
            <chakra.textarea
              rows={10}
              borderRadius="lg"
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
            <Button type="submit" colorScheme="unstyled" bg="gray.600" onClick={onClose}>
              Upload
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
