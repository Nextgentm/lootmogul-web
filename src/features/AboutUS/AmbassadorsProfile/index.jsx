import {  useState } from "react";
import { Text, Avatar, Heading, Box } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SEOContainer from "../../SEOContainer";
import MyPageLoader from "../../../components/MyPageLoader";

const newMarkDownTheme = {
    p: (props) => {
        const { children } = props;
        return (
            <Text
                mb={2}
                fontFamily="Sora"
                textAlign="justify!important"
                color="white"
                fontSize={["14px", "18px"]}
            >
                {children}
            </Text>
        );
    }
};

const AmbassadorsProfile = ({  aboutUsData }) => {
    const [detailedData, setDetailedData] = useState(
        aboutUsData ? aboutUsData[0] : []
    );

    return (
        <Box
            mr={["18px!important", "60px!important"]}
            ml={["18px!important", "60px!important"]}
            my="5%!important"
            m="auto"
            h="auto"
            textAlign={["center", "center"]}
        >
            {!detailedData && <MyPageLoader />}
            {detailedData && (
                <>
                    {" "}
                    <Avatar
                        boxSize={["150px", "200px", "200px", "300px"]}
                        src={detailedData.profilePic?.data?.url}
                        name={detailedData.name}
                    />
                    <Heading color="primary">{detailedData.name} </Heading>
                    {detailedData && (
                        <SEOContainer
                            seoData={detailedData.sharedSeo}
                            content={detailedData}
                            pageName={"promotions"}
                        />
                    )}
                    <Box textAlign="left" color="White">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            components={ChakraUIRenderer(newMarkDownTheme)}
                            remarkPlugins={[remarkGfm]}
                            skipHtml
                        >
                            {detailedData?.details}
                        </ReactMarkdown>
                    </Box>
                </>
            )}
        </Box>
    );
};
export default AmbassadorsProfile;
