import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"

interface SimulationContextProps {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>
}

const SimulationContext = createContext<SimulationContextProps | null>(null)

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <SimulationContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => useContext(SimulationContext)!
