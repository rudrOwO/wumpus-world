import { Navbar } from "./components/Navbar"
import { Center } from "@chakra-ui/react"

const App = () => {
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
