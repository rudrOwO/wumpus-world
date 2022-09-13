import { Center, Flex, Image, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { IconType } from "react-icons"

interface InferenceProps {
  flex: number
  title: string
  icon: IconType
  children?: ReactNode
}

export const InfoPanel = (props: InferenceProps) => {
  const { flex, title, icon: Icon, children } = props

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
          <Image h="45px" src="/android0.svg" />
          <Text color="#eeeeee" mx="5%" mt="5%" fontSize="2xl" fontWeight="bold">
            {title}
          </Text>
        </Center>
        <Center mr="20px">
          <Icon size="30px" color="#eeeeee" />
        </Center>
      </Flex>
      <Flex
        borderBottomRightRadius="lg"
        borderBottomLeftRadius="lg"
        flexDirection="column"
        bg="#1C1C1C"
      >
        {children}
      </Flex>
    </Flex>
  )
}
