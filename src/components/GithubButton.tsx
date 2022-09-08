import { NavButton } from "./NavButton"
import { useSimulation } from "../contexts/Simulation"
import { VscGithub } from "react-icons/vsc"
import { Center, Link } from "@chakra-ui/react"

export const GithubButton = () => {
  const { isPlaying: isPlaying } = useSimulation()!

  return (
    <NavButton toolTip="Source">
      <Link
        href="https://github.com/rudrowo"
        height="inherit"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <VscGithub size="80%" />
      </Link>
    </NavButton>
  )
}
