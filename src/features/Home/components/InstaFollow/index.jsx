/* eslint-disable @next/next/no-sync-scripts */
import { useContext, useEffect, useState } from "react";
import { Text, Tag, TagLabel, Flex, Box, Link } from "@chakra-ui/react";

import { AppContext } from "../../../../utils/AppContext/index";


const InstaFollow = () => {
  const [showIframe, setShowIframe] = useState(false);
  useEffect(() => {
    let script = document?.createElement("script");
    script.src = "https://cdn.lightwidget.com/widgets/lightwidget.js";
    script.onload = setShowIframe(true);;
    document?.head.append(script);
  }, [showIframe]);


  return (
    <Box mt="40px" ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]}>
      <Text color="white" fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]} mt="20px">
        Follow us on Instagram
      </Text>
      <Box mt="40px" w="100%" h="auto" pos="relative"
      >
        {showIframe && <iframe id="instaFrame" src="//lightwidget.com/widgets/89785bea13d15b98be39d37751f44893.html"
          scrolling="no" allowtransparency="true"
          className="lightwidget-widget"
          style={{ width: "100%", border: 0, overflow: "hidden" }}
        ></iframe>}
      </Box>
    </Box>
  );
};

export default InstaFollow;
