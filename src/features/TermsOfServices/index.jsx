import { useEffect, useState } from "react";
import {
    Box, Heading, Text,
} from "@chakra-ui/react";
import ScrollToTop from "react-scroll-to-top";
import { ChevronUpIcon } from "@chakra-ui/icons"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
const newMarkDownTheme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={2} color="white!important" fontSize={'14px'}>
                {children}
            </Text>
        );
    },
};

const TermsOfServices = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("/assets/terms.json").then(
            function (res) {
                return res.json();
                // return res.json();
            }).then(function (data) {
                // store Data in State Data Variable
                setData(data[0].data)
            }).catch(
                function (err) {
                    console.log(err, ' error')
                }
            )

    }, [data])
    return (

        <>
            <ScrollToTop smooth viewBox="20px" style={{ backgroundColor: "black" }} component={<ChevronUpIcon boxSize="20px" color="primary" />} />
            <Box m="4%"
                mt="2%"
                paddingLeft={["4%", "6%"]}
                paddingRight={["4%", "6%"]}

                color="white"
                background={"#1c1c1c"}
                fontFamily={"Sora"}
                textAlign="justify"
                pb="4%">
                <Heading as='h2' size='2xl' mt="2%" pt="4%" mb="2%">TERMS OF SERVICES</Heading><br></br>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>
                    {data}
                </ReactMarkdown >
            </Box>
        </>

    );
};
export default TermsOfServices;