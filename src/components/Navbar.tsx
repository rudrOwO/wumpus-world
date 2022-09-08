import { chakra, Image, Center } from "@chakra-ui/react"
import { PlayPauseButton } from "./PlayPauseButton"
import { StepForwardButton } from "./StepForwardButton"
import { GithubButton } from "./GithubButton"

export const Navbar = () => {
  return (
    <chakra.nav
      shadow="xl"
      padding="10px"
      fontSize="lg"
      color="white"
      fontFamily="Discoteque St"
      width="100%"
      height="6vh"
      bg="gray.600"
      position="fixed"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Center>
        <Image src="wumpus.png" h="5vh" mr="3" />
        Wumpus World
      </Center>
      <Center h="inherit" zIndex={1} w="100vw" position="fixed">
        <PlayPauseButton />
        <StepForwardButton />
      </Center>
      <GithubButton />
    </chakra.nav>
  )
}
