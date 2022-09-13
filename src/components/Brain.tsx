import { Flex, Box } from "@chakra-ui/react"
import { InfoPanel } from "./InfoPanel"
import { GiBrain } from "react-icons/gi"

export const Brain = () => {
  return (
    <InfoPanel title="Brain" icon={GiBrain} flex={1}>
      <Box h="300px">Hello</Box>
    </InfoPanel>
  )
}
