import { Flex, Box } from "@chakra-ui/react"
import { ControlPanel } from "./components/ControlPanel"
import { Stage } from "./components/Stage"
import { AgentPanel } from "./components/AgentPanel"

const App = () => {
  return (
    <Flex flexDirection="column" w="100vw" h="100vh">
      <ControlPanel />
      <Flex flexGrow={100} bgGradient="linear-gradient(#404040, #a3a3a3)">
        <Box flex={3} h="100%">
          <Stage />
        </Box>
        <Box display={["none", "none", "block"]} flex={1} h="100%">
          <AgentPanel />
        </Box>
      </Flex>
    </Flex>
  )
}

export default App
