import { MdPostAdd } from "react-icons/md"
import { Button, Text } from "@chakra-ui/react"

interface Props {
  onOpen: () => void
}

export const UploadStageButton = ({ onOpen }: Props) => (
  <Button
    position="absolute"
    left={["75%", "75%", "85%"]}
    top="90vh"
    colorScheme="unstyled"
    bg="gray.600"
    borderRadius="xl"
    size="lg"
    onClick={onOpen}
    _hover={{
      background: "gray.700",
    }}
  >
    <MdPostAdd fontSize="30px" />
    <Text display={["none", "none", "inline"]} fontSize="xl" ml="10px" mt="5px">
      CSV
    </Text>
  </Button>
)
