import { useEffect, useState } from "react"
import { Flex, useToast } from "@chakra-ui/react"
import { ControlPanel } from "./components/ControlPanel"
import { GenerateStage } from "./components/GenerateStage"
import { Stage } from "./components/Stage"
import { Brain } from "./components/Brain"
import { Map } from "./components/Map"
import { Actuators } from "./components/Actuators"
import { Sensors } from "./components/Sensors"

const App = () => {
  const toast = useToast()
  const [environment, setEnvironment] = useState(
    `
    S,S,S,S,S,S,S,S,S,S,
    S,S,S,S,S,S,S,S,P,S,
    S,S,S,S,W,S,S,S,S,S,
    S,S,S,S,S,S,S,S,S,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,S,S,S,G,S,S,S,S,
    S,S,S,S,S,S,S,S,W,S,
    S,S,P,S,S,S,S,S,S,S,
    S,S,P,S,S,S,W,S,S,S,
    G,S,S,S,S,S,S,S,P,P, 
  `.replace(/[^SWAPG]/g, "") // Sanitized input to remove unwanted characters
  )

  useEffect(() => {
    toast({
      title: "Note",
      position: "bottom",
      description: "This project is under active development",
      status: "warning",
      duration: 4000,
      isClosable: true,
      containerStyle: {
        fontSize: "lg",
      },
    })
  }, [])

  return (
    <Flex flexDirection="column" w="100vw" h="100vh" bgGradient="linear-gradient(#303030, #666666)">
      <ControlPanel />
      <Flex flexGrow={1} mb="0.5%">
        <Flex flex={1} flexDirection="column">
          <Map />
          <Sensors />
          <GenerateStage setEnvironment={setEnvironment} />
        </Flex>
        <Stage flex={3} environment={environment} />
        <Flex flex={1} flexDirection="column">
          <Actuators />
          <Brain />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
