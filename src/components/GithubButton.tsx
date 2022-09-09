import { PanelButton } from "./PanelButton"
import { useSimulation } from "../contexts/Simulation"
import { VscGithub } from "react-icons/vsc"
import { Center, Link } from "@chakra-ui/react"

export const GithubButton = () => (
  <PanelButton toolTip="View Source">
    <Link
      zIndex={2}
      href="https://github.com/rudrowo"
      height="inherit"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <VscGithub size="80%" />
    </Link>
  </PanelButton>
)
