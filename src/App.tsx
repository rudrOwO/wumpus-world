import { ChakraProvider, Center } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Center w="100vw" h="100vh" bgGradient="linear-gradient(#404040, #a3a3a3)">
        Hola Amigos
      </Center>
    </ChakraProvider>
  );
};

export default App;
