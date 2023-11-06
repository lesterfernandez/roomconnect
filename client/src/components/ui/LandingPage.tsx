import { ChakraProvider, extendTheme, VStack, Text, CSSReset } from "@chakra-ui/react";
import "css/LandingPage.css";

const theme = extendTheme({
  fonts: {
    heading: `'Michroma'`,
    body: `'Michroma'`,
  },
  colors: {
    primary: {
      100: "#D3DEE1",
      900: "#00293F",
    },
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
        margin: 0,
        padding: 3,
      },
      body: {
        bgGradient: "linear(to-b, primary.900, 55%, primary.100)",
      },
    },
  },
});

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <VStack
        height="100%"
        align="start"
        justify="left"
        paddingLeft="2em"
        position="relative"
        top="60px"
      >
        <Text fontFamily="heading" fontSize="2.5em" textAlign="left" lineHeight="1.2" color="white">
          Find your <br />
          <Text as="span" color="white">
            roommates in
          </Text>
          <br />
          Miami
        </Text>
      </VStack>
    </ChakraProvider>
  );
}
