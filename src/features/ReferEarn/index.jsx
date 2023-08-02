import { useContext } from "react";
import { Box, Flex, Text, Button, useToast } from "@chakra-ui/react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { AppContext } from "../../utils/AppContext";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    WhatsappIcon,
    RedditShareButton,
    RedditIcon
} from "next-share";
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
const ReferEarn = () => {
    const { user, toggleLoginModal } =
        useContext(AppContext);
    const toast = useToast();
    const referralMsg =
        "Join me on LootMogul Quiz and get a chance to win real money!";

    const arrayPlayProtectionImgs = [
        {
            img: "refer1.png",
            text1: "Friend Register",
            text2: "Both You & Friend Get Bonus"
        },
        {
            img: "refer2.png",
            text1: "Friend first adds chips",
            text2: "You Get Bonus"
        },
        {
            img: "refer3.png",
            text1: "Friend plays 10 chips games",
            text2: "You Get Bonus"
        }
    ];
    const markupData = `## <h2 style="font-size: 55px;line-height: 60px;margin-bottom: 0;">Here’s How it works</h2> <br> <span style="color:white;  font-size:20px; font-family:sora;line-height: 38px;"><ul><li> Copy the Code, share with your friends</li><li> You can also do this - share your link directly by clicking relevant social media icon right below your code.It will take you to the social media direct message section.You can simply search your contact and send.</li><li>Now your friend visits LootMogul and Sign Up</li><li>You get Bonus added to your wallet</li><li>Friend deposits for first time. You get more Bonus</li><li> Friend plays 10 cash games, you get even more Bonus</li><li style=" font-size: 14px; list-style: none; "> "*" for Terms & Conditions apply. <a href="/terms-conditions/">Click here for T&C </a></li></ul><br><style> table { border-spacing: 0px;table-layout: fixed; margin-left: auto;margin-right: auto; width: 310px;font-color:white; } td { border: 0px solid #666;word-break: break-all;height: 100%;} thead tr{background: transparent linear-gradient(180deg, #481A7F 0%, #481A7F00 100%) 0% 0% no-repeat padding-box;box-shadow: inset 0px 3px 18px #481A7F73;} tbody tr:nth-child(even) {background: #0C1333} tbody tr:nth-child(odd) {background: #301e40 } td {border: 0 !important;} h2{font-size: 55px !important;line-height: 50px !important;    margin-bottom: 0 !important;}</style> <h2>Bonus Distribution</h2> <table style="color:white;width: 85%;margin-top: 25px;margin-left: 1px;margin-right: 1px;margin-bottom: 40px;"><thead><tr><td><span style="font-size:16px; font-family;"><b>Steps</span></td><td><span style="font-size:14px; font-family:sora;">Bonus</span></td></tr></thead><tr><td><span style="font-size:14px; font-family:sora;">Friend Signs Up</span> </td><td><span style="font-size:14px; font-family:sora;">7 Chips</span> </td></tr><tr><td><span style="font-size:14px; font-family:sora;">Friend Deposits for first time</span> </td><td><span style="font-size:14px; font-family:sora;">14 Chips</span> </td></tr><tr><td><span style="font-size:14px; font-family:sora;">Friend Plays 10 games from Deposits</span></td><td><span style="font-size:14px; font-family:sora;">21 Chips</span></td></tr></table><span>`;
    return (
        <Box mt={["15px", "30px"]}>
            <Flex
                direction={["column", "column", "column", "row", "row"]}
                width="90%"
                borderRadius={"md"}
                border="2px solid #481A7F"
                m="auto"
            >
                <Box width={["100%","100%","100%","50%", "50%"]} textAlign={["center", "left"]}>
                    <Box
                        pos="relative"
                        m="auto"
                        h={["20vh","20vh","35vh","62vh","55vh","55vh"]}
                        w="100%"
                    >
                        <Image
                            alt="refer"
                            src="/assets/earn_banner.jpg"
                            layout="fill"
                        />
                    </Box>
                </Box>
                <Box
                    width={["100%","100%","100%","50%", "50%"]}
                    textAlign={["center", "left"]}
                    p={["20px", "20px", "20px", "25px"]}
                    background="#481A7F5C 0% 0% no-repeat padding-box;"
                >
                    <Text 
                        variant="referHead"
                        fontSize={["40px", "40px", "40px", "34px", "55px"]}
                        lineHeight={["40px", "40px", "40px", "30px","50px"]}
                        fontWeight="normal"
                        fontFamily="Blanch">
                         Make it more Exciting! Challenge <br/>your friends & family
                    </Text>
                    <Text mt="15px" variant="referDesc" fontSize={["15px", "17px"]} lineHeight={["18px","23px"]} w={["100%","100%","100%","100%","80%"]}>
                        Lootmogul.com brings you the best incentive that
                        friendship can offer. Bond over your love for Online
                        Sports Trivia along with your friends. Earn cash, Refer
                        your Friends NOW.
                    </Text>
                    <Box
                        pl={["15px", "25px"]}
                        pr={["15px", "25px"]}
                        mt={["30px", "10px"]}
                        border="2px dashed #E8E8E8"
                        borderRadius="4px"
                    >
                        <Text
                            mt={["10px", "10px"]}
                            fontFamily="Sora"
                            fontSize={["14px", "17px"]}
                            color="#E8E8E8"
                            
                        >
                            {" "}
                            Your Referal Code
                        </Text>
                        <Flex
                            mt={"10px"}
                            mb={"20px"}
                            borderRadius="4px"
                            justifyContent={"space-between"}
                            backgroundColor="#fff"
                            width="100%"
                            direction={["column", "column", "row", "row", "row"]}
                        >
                            <Text
                                px={["15px", "15px", "15px", "15px", "50px"]}
                                py={"10px"}
                                color="#481A7F"
                                fontSize={["15px", "20px", "20px", "20px", "26px"]}
                                fontWeight="700"
                            >
                                {user
                                    ? user.referral_code?.code
                                    : "Log in for referal code"}
                            </Text>
                            <Button
                                borderRadius="4px"
                                textTransform="uppercase"
                                fontSize={["15px", "15px", "15px", "15px", "23px"]}
                                onClick={() => {
                                    if (!user) toggleLoginModal();
                                    else {
                                        navigator.clipboard.writeText(
                                            user.referral_code?.code
                                        );
                                        toast({
                                            title: "Copied to clipboard",
                                            status: "success",
                                            duration: 3000,
                                            isClosable: true
                                        });
                                    }
                                }}
                            >
                                {user ? "Copy your code" : "Login"}{" "}
                            </Button>
                        </Flex>
                        {user && (
                            <>
                                {" "}
                                <Text
                                    mt={["15px", "0px"]}
                                    textTransform="capitalize"
                                    variant="textualVal"
                                    color="white"
                                    fontSize={["14px", "17px"]}
                                >
                                    Share your link
                                </Text>
                                <Flex
                                    my="15px"
                                    justify={"space-evenly"}
                                    width={["100%", "80%", "80%", "30%"]}
                                    
                                >
                                    <RedditShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <RedditIcon size={40} round />
                                    </RedditShareButton>

                                    <TwitterShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <TwitterIcon size={40} round />
                                    </TwitterShareButton>

                                    <WhatsappShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <WhatsappIcon size={40} round />
                                    </WhatsappShareButton>

                                    <FacebookShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        quote={referralMsg}
                                    >
                                        <FacebookIcon size={40} round />
                                    </FacebookShareButton>

                                    {/*<FacebookMessengerShareButton
                                        url={
                                            process.env.NEXT_PUBLIC_SITE_URL + "/games?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <FacebookMessengerIcon
                                            size={40}
                                            round
                                        />
                                    </FacebookMessengerShareButton>*/}
                                    
                                    
                                </Flex>
                            </>
                        )}
                    </Box>
                </Box>
            </Flex>

            <Flex
                m="auto"
                padding="25px"
                width="90%"
                minH="300px"
                mt="5%"
                background="#481A7F5C 0% 0% no-repeat padding-box;"
                borderRadius={"md"}
                border="2px solid #481A7F"
            >
                <Flex
                    width="100%"
                    m="auto"
                    textAlign={"center"}
                    direction={["column", "row"]}
                >
                    {arrayPlayProtectionImgs.map((item, index) => (
                        <Flex
                            m={["0px", "auto"]}
                            key={item.img}
                            textAlign={"flex-start"}
                        >
                            <Flex direction={["row", "column"]} mt="2%" mb="2%">
                                <Box
                                    m="auto"
                                    mb="20px"
                                    width={["100px", "100px"]}
                                    height={["100px", "85px"]}
                                    pos="relative"
                                >
                                    <Image
                                        alt={item.img}
                                        layout="fill"
                                        src={`/assets/${item.img}`}
                                    />
                                </Box>
                                <Box
                                    mt={"5px important"}
                                    m="auto"
                                    textAlign={["left", "center"]}
                                >
                                    <Text
                                        letterSpacing="0em"
                                        fontSize={["14px", "20px"]}
                                        lineHeight={["20px", "25px"]}
                                        color="white"
                                        variant="hint"
                                        fontFamily="Sora"
                                        w={"75%"}
                                        m="auto"
                                    >
                                        {item.text1}{" "}
                                    </Text>
                                    <Text
                                        letterSpacing="0em"
                                        m="auto"
                                        w={"100%"}
                                        mt="5%"
                                        ml="5%"
                                        fontSize={["14px", "17px"]}
                                        lineHeight={["15px", "18px"]}
                                        color="#E90A63"
                                        variant="hint"
                                    >
                                        {item.text2}{" "}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Box
                mt={["15px", "30px"]}
                color="white!important"
                px={["20px", "20px", "20px", "60px", "60px"]}
            >
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    components={ChakraUIRenderer(newMarkDownTheme)}
                    remarkPlugins={[remarkGfm]}
                    skipHtml
                >
                    {markupData}
                </ReactMarkdown>
            </Box>
        </Box>
    );
};
export default ReferEarn;
