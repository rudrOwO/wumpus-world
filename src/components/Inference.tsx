import { Center, Flex, Image, Box, Text } from "@chakra-ui/react"
import { FaBrain } from "react-icons/fa"

interface InferenceProps {
  flex: number
}

export const Inference = ({ flex }: InferenceProps) => {
  return (
    <Flex
      mt="10px"
      mr="10px"
      display={["none", "none", "block"]}
      flex={flex}
      flexDirection="column"
    >
      <Flex
        bg="purple.600"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Center ml="20px">
          <Image h="35px" src="/android0.svg" />
          <Text color="#eeeeee" mx="5%" mt="1%" fontSize="xl" fontWeight="extrabold">
            Brain
          </Text>
        </Center>
        <Center mr="20px">
          <FaBrain color="#eeeeee" fontSize="25px" />
        </Center>
      </Flex>
      <Flex
        borderBottomRightRadius="lg"
        borderBottomLeftRadius="lg"
        flexDirection="column"
        bg="#1C1C1C"
      >
        Data
      </Flex>
    </Flex>
  )
}
