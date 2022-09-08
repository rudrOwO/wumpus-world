import { chakra, Center } from "@chakra-ui/react"
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
      bg="purple.600"
      position="sticky"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      Wumpus World
      <Center>
        <PlayPauseButton />
        <StepForwardButton />
      </Center>
      <GithubButton />
    </chakra.nav>
  )
}
