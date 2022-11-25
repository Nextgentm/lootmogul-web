import { Box, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import CollapsableRow from "./CollapsableRow";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const newMarkDownTheme = {
    p: (props) => {
        const { children } = props;
        return (
            <Text mb={2} fontSize={"14px"}>
                {children}
            </Text>
        );
    }
};

const InfluencerInfoCollapsable = ({ influencer }) => {
    return (
        <><Box
            color="white"
            border="solid 2px"
            borderColor={"#421d7a"}
            borderRadius={["4px", "8px"]}
            mt={[0, 10, 0]}
        >
            <CollapsableRow title="About" isOpen={true} icon={"/assets/About.svg"} mt={"10px"}>
                <Box maxH="390px" overflowY={"auto"} textAlign="left">
                    <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={ChakraUIRenderer(newMarkDownTheme)}
                        remarkPlugins={[remarkGfm]}
                        skipHtml
                    >
                        {influencer.about}
                    </ReactMarkdown>
                </Box>
            </CollapsableRow>




        </Box><Box
            color="white"
            border="solid 2px"
            borderColor={"#421d7a"}
            borderRadius={["4px", "8px"]}
            mt={"25px"}
        >
                {influencer.Video && (
                    <CollapsableRow title="Videos" isOpen={true} icon={"/assets/Video.svg"} mt={"10px"}>
                        <Box maxH="390px" overflowY={"auto"} textAlign="left">
                        <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={ChakraUIRenderer(newMarkDownTheme)}
                        remarkPlugins={[remarkGfm]}
                        skipHtml
                    >
                        {influencer.Video}
                    </ReactMarkdown>
                        </Box>
                    </CollapsableRow>
                )}</Box>
                <Box
            color="white"
            border="solid 2px"
            borderColor={"#421d7a"}
            borderRadius={["4px", "8px"]}
            mt={"25px"}
        >
                {influencer.reviews && (
                    <CollapsableRow title="Reviews" isOpen={true} icon={"/assets/Reviews.svg"} mt={"10px"}>
                        <Box maxH="390px" overflowY={"auto"} textAlign="left">
                        <ReactMarkdown
                        rehypePlugins={[rehypeRaw]}
                        components={ChakraUIRenderer(newMarkDownTheme)}
                        remarkPlugins={[remarkGfm]}
                        skipHtml
                    >
                        {influencer.reviews}
                    </ReactMarkdown>
                        </Box>
                    </CollapsableRow>
                )}</Box></>
        
    );
};

export default InfluencerInfoCollapsable;
