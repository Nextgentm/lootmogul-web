import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import Fonts from "./Fonts";
import override from "./themes";

export default function ChakraUIContainer({ children }) {
    const theme = extendTheme(override);

    return <ChakraProvider theme={theme}>
        <Fonts/>{children}</ChakraProvider>;
}