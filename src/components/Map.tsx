import { Flex, Box, Center } from "@chakra-ui/react"
import { InfoPanel } from "./InfoPanel"
import { BsPinMapFill } from "react-icons/bs"

export const Map = () => {
  return <InfoPanel title="Environment" icon={BsPinMapFill} flex={1}></InfoPanel>
}
