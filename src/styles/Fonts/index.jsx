import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face{
        font-family: Blanch;
        font-display: block;
font-style: normal;
font-weight: 410;
        src:url("/fonts/Blanch/BLANCH_CAPS.otf") format("woff"),
        url("/fonts/Blanch/BLANCH_CAPS.otf") format("opentype"),
        url("/fonts/Blanch/BLANCH_CAPS.otf") format("truetype");

    }
    /* latin */
      @font-face {
        font-family: CNN;
        font-style: normal;
        font-weight: 400;
        font-display: block;
        src: url('./fonts/CNN/CNN.ttf') format('truetype');
        
      }
      `}
  />
)

export default Fonts;