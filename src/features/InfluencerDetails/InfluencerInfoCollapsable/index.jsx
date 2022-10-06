import { Box, Text } from "@chakra-ui/react";
import { YouTubeIcon, ReviewStarsIcon } from "../../../components/Icons";
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
        <Box
            color="white"
            border="solid 2px"
            borderColor={"#421d7a"}
            borderRadius={["4px", "8px"]}
            mt={[10,10,0]}
        >
            <CollapsableRow title="About" isOpen={true}>
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

            {influencer.Video && (
                <CollapsableRow
                    title="Videos"
                    icon={<YouTubeIcon color="#CFBF8A" mt="6px" />}
                >
                    <Text fontWeight={600} color="#C7C7C7" fontSize="10px">
                        Videos
                    </Text>
                </CollapsableRow>
            )}

            {influencer.reviews && (
                <CollapsableRow
                    title="Reviewes"
                    icon={<ReviewStarsIcon color="#CFBF8A" mt="6px" />}
                >
                    <Text fontWeight={600} color="#C7C7C7" fontSize="10px">
                        Reviews
                    </Text>
                </CollapsableRow>
            )}
        </Box>
    );
};

export default InfluencerInfoCollapsable;
