import { IconButton, Tooltip } from "@chakra-ui/react"
import { ReactNode } from "react"

interface NavButtonProps {
  onClick?: () => void
  disabled?: boolean
  toolTip: string
  children: ReactNode
}

export const PanelButton = (props: NavButtonProps) => {
  const { onClick: handleClick, disabled = false, toolTip: toolTipMessage, children } = props

  return (
    <Tooltip hasArrow label={toolTipMessage} fontSize="md">
      <IconButton
        disabled={disabled}
        size="lg"
        marginX="1px"
        marginY={-1}
        colorScheme="unstyled"
        aria-label="Log Out"
        justifyContent="center"
        _hover={{
          background: "gray.700",
        }}
        onClick={handleClick}
      >
        {children}
      </IconButton>
    </Tooltip>
  )
}
