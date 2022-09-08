import { useSimulation } from "../contexts/Simulation"
import { chakra, Flex, Tooltip } from "@chakra-ui/react"
import { RiArrowGoForwardLine, RiPlayCircleLine, RiPauseCircleLine } from "react-icons/ri"
import { VscGithub } from "react-icons/vsc"

export const Navbar = () => {
  const { isPlaying: isPlaying } = useSimulation()!

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
      justifyContent={"space-between"}
    >
      Wumpus World
      <Flex>
        <RiPlayCircleLine />
        <RiPauseCircleLine />
        <RiArrowGoForwardLine />
      </Flex>
      <VscGithub />
    </chakra.nav>
  )
}
