import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ScrollToTop from "react-scroll-to-top";
import { ChevronUpIcon } from "@chakra-ui/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
const newMarkDownTheme = {
    p: (props) => {
        const { children } = props;
        return (
            <Text mb={2} color="white!important" fontSize={"14px"}>
                {children}
            </Text>
        );
    }
};
const PrivacyPolicy = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("/privacy.json")
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                setData(data[0].privacydata);
            })
            .catch(function (err) {});
    }, [data]);
    return (
        <>
            <ScrollToTop
                smooth
                viewBox="20px"
                style={{ backgroundColor: "black" }}
                component={<ChevronUpIcon boxSize="20px" color="primary" />}
            />
            <Box
                m="4%"
                mt="2%"
                paddingLeft={["4%", "6%"]}
                paddingRight={["4%", "6%"]}
                color="white"
                background={"#1c1c1c"}
                fontFamily={"Sora"}
                textAlign="justify"
                pb="4%"
            >
                <Text
                    color="white"
                    fontFamily="Blanch"
                    fontSize={["28px", "28px", "58px", "58px"]}
                    mt="2%"
                    pt="4%"
                    mb="2%"
                >
                    PRIVACY POLICY
                </Text>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={ChakraUIRenderer(newMarkDownTheme)}
                    remarkPlugins={[remarkGfm]}
                    skipHtml
                >
                    {data}
                </ReactMarkdown>
            </Box>
        </>
    );
};

export default PrivacyPolicy;
