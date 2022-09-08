import { IconButton, Tooltip } from "@chakra-ui/react"
import { ReactNode } from "react"

interface NavButtonProps {
  handleClick?: () => void
  toolTip: string
  children: ReactNode
}

export const NavButton = (props: NavButtonProps) => {
  const { handleClick, toolTip: toolTipMessage, children } = props

  return (
    <Tooltip hasArrow label={toolTipMessage} fontSize="md">
      <IconButton
        size="md"
        marginX="1px"
        marginY={-1}
        colorScheme="unstyled"
        aria-label="Log Out"
        justifyContent="center"
        _hover={{
          background: "purple.500",
        }}
        onClick={handleClick}
      >
        {children}
      </IconButton>
    </Tooltip>
  )
}
