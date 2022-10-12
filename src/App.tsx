import { useState } from "react"
import { Center, Flex } from "@chakra-ui/react"
import { ControlPanel } from "./components/ControlPanel"
import { GenerateStage } from "./components/GenerateStage"
import { Stage } from "./components/Stage"
import { Brain } from "./components/Brain"
import { Map } from "./components/Map"
import { Actuators } from "./components/Actuators"
import { Sensors } from "./components/Sensors"

const App = () => {
  const [environment, setEnvironment] = useState(
    `
    S,S,P,S,S,S,S,S,S,S,
    S,P,S,S,S,S,S,S,P,S,
    P,S,S,S,W,S,S,S,S,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,S,S,S,G,S,S,S,S,
    S,S,S,S,S,S,S,S,W,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,P,S,S,S,W,S,S,S,
    A,S,S,S,S,S,S,S,P,P, 
  `.replace(/[^SWAPG]/g, "") // Sanitized input to remove unwanted characters
  )
  return (
    <Flex flexDirection="column" w="100vw" h="100vh" bgGradient="linear-gradient(#686688, #555555)">
      <ControlPanel />
      <Flex flexGrow={1} mb="0.5%">
        <Stage flex={5} environment={environment} />
        <Center flex={2} mr="8px">
          <Flex flexDirection="column" w="100%" style={{ aspectRatio: "1 / 1.1" }}>
            <Map />
            <GenerateStage setEnvironment={setEnvironment} />
          </Flex>
        </Center>
      </Flex>
    </Flex>
  )
}

export default App
