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
  step: number
  signalStep: Dispatch<SetStateAction<number>>
}

const SimulationContext = createContext<SimulationContextProps | null>(null)

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [step, signalStep] = useState(0)

  return (
    <SimulationContext.Provider value={{ isPlaying, setIsPlaying, step, signalStep }}>
      {children}
    </SimulationContext.Provider>
  )
}

export const useSimulation = () => useContext(SimulationContext)!
