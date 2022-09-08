import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { SimulationProvider } from "./contexts/Simulation"
import { ChakraProvider } from "@chakra-ui/react"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <SimulationProvider>
        <App />
      </SimulationProvider>
    </ChakraProvider>
  </React.StrictMode>
)
