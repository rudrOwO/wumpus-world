import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

interface Props {
  children: ReactNode
}

interface SimulationContextProps {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

const SimulationContext = createContext<SimulationContextProps | null>(null)

export const SimulationProvider = ({ children }: Props) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <SimulationContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => useContext(SimulationContext)
