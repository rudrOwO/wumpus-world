import { Flex, Box } from "@chakra-ui/react"
import { ControlPanel } from "./components/ControlPanel"
import { Stage } from "./components/Stage"
import { Inference } from "./components/Inference"

const App = () => {
  return (
    <Flex flexDirection="column" w="100vw" h="100vh">
      <ControlPanel />
      <Flex flexGrow={1} bgGradient="linear-gradient(#404040, #a3a3a3)">
        <Stage flex={4} />
        <Inference flex={1} />
      </Flex>
    </Flex>
  )
}

export default App
