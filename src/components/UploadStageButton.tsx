import { MdPostAdd } from "react-icons/md"
import { Button, Flex, Text } from "@chakra-ui/react"

interface Props {
  onOpen: () => void
}

export const UploadStageButton = ({ onOpen }: Props) => (
  <Button
    position="absolute"
    left="3vw"
    top="88vh"
    colorScheme="unstyled"
    bg="purple.600"
    borderRadius="xl"
    size="lg"
    p="35px"
    onClick={onOpen}
    _hover={{
      background: "purple.700",
    }}
  >
    <Flex alignItems={"center"}>
      <MdPostAdd fontSize="32px" />
      <Text display={["none", "none", "inline"]} fontSize="2xl" ml="10px" mt="6px">
        CSV
      </Text>
    </Flex>
  </Button>
)
