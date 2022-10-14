import { Image, Center, Text, Box } from "@chakra-ui/react"
import { PlayPauseButton } from "./PlayPauseButton"
import { StepForwardButton } from "./StepForwardButton"
import { GithubButton } from "./GithubButton"

export const ControlPanel = () => {
  return (
    <Box
      shadow="xl"
      fontSize="lg"
      color="white"
      fontFamily="Discoteque St"
      width="100%"
      bg="purple.600"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      borderWidth="1px"
      borderColor="purple.700"
    >
      <Center>
        <Image src="wumpus.png" h="5vh" mr="4" ml="2" />
        <Text display={["none", "none", "block"]}>Wumpus World</Text>
      </Center>
      <Center h="inherit" zIndex={1} w="100vw" position="fixed">
        <PlayPauseButton />
        <StepForwardButton />
      </Center>
      <GithubButton />
    </Box>
  )
}
