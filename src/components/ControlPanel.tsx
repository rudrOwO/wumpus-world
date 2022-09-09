import { chakra, Image, Center, Text } from "@chakra-ui/react"
import { PlayPauseButton } from "./PlayPauseButton"
import { StepForwardButton } from "./StepForwardButton"
import { GithubButton } from "./GithubButton"

export const ControlPanel = () => {
  return (
    <chakra.nav
      shadow="xl"
      padding="5px"
      fontSize="lg"
      color="white"
      fontFamily="Discoteque St"
      width="100%"
      bg="gray.600"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Center>
        <Image src="wumpus.png" h="5vh" mr="3" />
        <Text display={["none", "none", "block"]}>Wumpus World</Text>
      </Center>
      <Center h="inherit" zIndex={1} w="100vw" position="fixed">
        <PlayPauseButton />
        <StepForwardButton />
      </Center>
      <GithubButton />
    </chakra.nav>
  )
}
