import { Button, Flex, Text } from "@chakra-ui/react"
import { MdPostAdd } from "react-icons/md"

interface Props {
  onClick: () => void
}

export const GenerateStageButton = ({ onClick: handleClick }: Props) => (
  <Button
    shadow="xl"
    mt="10px"
    mx="5px"
    colorScheme="unstyled"
    bg="purple.600"
    borderRadius="xl"
    borderWidth="1px"
    borderColor="purple.700"
    size="lg"
    onClick={handleClick}
    _hover={{
      background: "purple.700",
    }}
  >
    <Flex alignItems={"center"}>
      <MdPostAdd fontSize="32px" />
      <Text fontSize="2xl" ml="10px" mt="6px">
        CSV
      </Text>
    </Flex>
  </Button>
)
