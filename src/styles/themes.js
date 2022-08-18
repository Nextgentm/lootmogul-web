import { createBreakpoints } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import { BtnStyle } from "./BtnStyle";
import { HeadingStyle } from "./HeadingStyle";
import { TextStyle } from "./TextStyle";
import {TabStyle} from "./TabStyle";

const breakpoints = createBreakpoints({
    sm: "48em",
    md: "62em",
    lg: "80em",
    xl: "96em"
});
const override = {
    components: {
        Popover: {
            variants: {
                custom: {
                    width: "100px",
                    bg: "red"
                }
            }
        },
        ...BtnStyle,
        ...HeadingStyle,
        ...TextStyle,
        ...TabStyle
    },
    colors: {
        background: "#0D0D0D",
        primary: "#E90A63",
        secondary: "#FFFFFF",
        lightGrey: "#c0c0c0",
        tabLabel:"#9E9E9E",
        textual:"#C7C7C7",
        stripedTable: {
            50: "#1C1C1C",
            100: "#272727",
            // ...
            900: "#272727"
        }
    },
    breakpoints,
    fonts: {
        Blanch: "Blanch",
        Sora: "Sora",
        Quantico: "Quantico"
    }
};
export default extendTheme(override);
