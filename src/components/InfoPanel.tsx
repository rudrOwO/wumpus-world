import { Center, Flex, Image, Text } from "@chakra-ui/react"
import { ReactNode } from "react"
import { IconType } from "react-icons"

interface InfoPanelProps {
  flex: number
  title: string
  icon: IconType
  children?: ReactNode
}

export const InfoPanel = (props: InfoPanelProps) => {
  const { flex, title, icon: Icon, children } = props

  return (
    <Flex
      borderRadius="xl"
      shadow="lg"
      mt="10px"
      mx="5px"
      flex={flex}
      flexDirection="column"
      bg="#333333"
    >
      <Center gap="5%" bg="purple.600" borderTopLeftRadius="xl" borderTopRightRadius="xl">
        <Image h="36px" src="/android0.svg" />
        <Text color="#eeeeee" mx="5%" mt="2%" fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Icon size="20px" color="#eeeeee" />
      </Center>
      {children}
    </Flex>
  )
}
