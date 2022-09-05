import { createBreakpoints } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";
import { BtnStyle } from "./BtnStyle";
import { HeadingStyle } from "./HeadingStyle";
import { TextStyle } from "./TextStyle";
import {TabStyle} from "./TabStyle";

const breakpoints =  {
    base:'320px',
    sm: '420px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  }
const override = {
    styles: {
        global: {
          // styles for the `body`
          body: {
            bgImage: "/assets/designupdate1/sitebg.webp",
            bgPosition:"center center",
            bgRepeat:"no-repeat",
            bgSize:"100% 100%",
            bgAttachment: "fixed"
          },
        },
    },
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
            50: "#240e45",
            100: "#150627",
            // ...
            900: "#150627"
        }
    },
    breakpoints,
    fonts: {
        Blanch: "Blanch",
        Sora: "Sora",
        Quantico: "Quantico",
        CNN: "CNN"
    }
};
export default extendTheme(override);
