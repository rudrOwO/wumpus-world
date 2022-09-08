import { useState } from "react"
import { Navbar } from "./components/Navbar"
import { Center } from "@chakra-ui/react"

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <Navbar />
      <Center w="100vw" h="100vh" bgGradient="linear-gradient(#404040, #a3a3a3)">
        Hola Amigos
      </Center>
    </>
  )
}

export default App
