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
            text1: " Friend Sign Up",
            text2: "Both You & Friend Get Bonus"
        },
        {
            img: "refer2.png",
            text1: "Friend Deposits for First Time",
            text2: "You Get Bonus"
        },
        {
            img: "refer3.png",
            text1: "Friend Plays 10 Cash Games",
            text2: "You Get Bonus"
        }
    ];
    const markupData = `## Here’s How it works <br> <span style="color:white;  font-size:14px; font-family:sora;"> <ol type={1}><li> Copy the Code, share with your friends</li><li> You can also do this - share your link directly by clicking relevant social media icon right below your code.It will take you to the social media direct message section.You can simply search your contact and send.</li><li>Now your friend visits LootMogul and Sign Up</li><li>You get Bonus added to your wallet</li><li>Friend deposits for first time. You get more Bonus</li><li> Friend plays 10 cash games, you get even more Bonus</li><li> "*" for Terms & Conditions apply. Click here for T&C (This will be linked to T&C of Refer a Friend)</li></ol><br><style> table { border-spacing: 0px;table-layout: fixed; margin-left: auto;margin-right: auto; width: 310px;font-color:white; } td { border: 1px solid #666;word-break: break-all;height: 100%;}</style> <table style="color:white"><tr><td><span style="font-size:16px; font-family;"><b>Steps</span></td><td><span style="font-size:14px; font-family:sora;">Bonus</span></td></tr><tr><td><span style="font-size:14px; font-family:sora;">Friend Signs Up</span> </td><td><span style="font-size:14px; font-family:sora;">$1</span> </td></tr><tr><td><span style="font-size:14px; font-family:sora;">Friend Deposits for first time</span> </td><td><span style="font-size:14px; font-family:sora;">$2</span> </td></tr><tr><td><span style="font-size:14px; font-family:sora;">Friend Plays 10 games from Deposits</span></td><td><span style="font-size:14px; font-family:sora;">$3</span></td></tr></table><span>`;
    return (
        <Box mt={["15px", "30px"]}>
            <Flex
                direction={["column", "row"]}
                width="100%"
                borderRadius={"md"}
                px={["20px", "20px", "20px", "60px", "60px"]}
            >
                <Box width={["100%", "50%"]} textAlign={["center", "left"]}>
                    <Text
                        color="#F8ED1D"
                        fontSize={["40px", "54px"]}
                        fontFamily="Blanch"
                        mb={0}
                    >
                        REFER AND EARN
                    </Text>

                    <Text
                        color="white"
                        fontSize={["64px", "98px"]}
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontFamily="Blanch"
                        lineHeight="52px"
                    >
                        up to $100*
                    </Text>
                    <Box
                        pos="relative"
                        m="auto"
                        h={["210px", "310px", "310px", "410px"]}
                        width={["224px", "324px", "324px", "436px"]}
                    >
                        <Image
                            alt="refer"
                            src="/assets/referafriend.png"
                            layout="fill"
                        />
                    </Box>
                </Box>
                <Box
                    width={["100%", "50%"]}
                    mt={["30px", "30px", "30px", "96px"]}
                    textAlign={["center", "left"]}
                >
                    <Text variant="referHead">
                        Make it more Exciting! Challenge your friends & family
                    </Text>
                    <Text mt="15px" variant="referDesc">
                        Lootmogul.com brings you the best incentive that
                        friendship can offer. Bond over your love for Online
                        Sports Trivia along with your friends. Earn cash, Refer
                        your Friends NOW.
                    </Text>
                    <Box
                        pl={["15px", "25px"]}
                        pr={["15px", "25px"]}
                        mt={["30px", "70px"]}
                        border="2.7033px dashed #515151"
                    >
                        <Text
                            mt={["10px", "25px"]}
                            fontFamily="Sora"
                            fontSize={["14px", "18px"]}
                            color="#F8ED1D"
                            fontWeight={600}
                        >
                            {" "}
                            Your Referal Code
                        </Text>
                        <Flex
                            mt={"10px"}
                            mb={"10px"}
                            borderRadius="30px"
                            justifyContent={"space-between"}
                            backgroundColor="#1C1C1C"
                            width="100%"
                        >
                            <Text
                                px={["15px", "15px", "15px", "70px"]}
                                py={"10px"}
                                color="white"
                            >
                                {user
                                    ? user.referral_code?.code
                                    : "Log in for referal code"}
                            </Text>
                            <Button
                                borderRadius="30px"
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
                                    mt={["15px", "40px"]}
                                    textTransform="capitalize"
                                    variant="textualVal"
                                    color="white"
                                >
                                    Share your link
                                </Text>
                                <Flex
                                    my="15px"
                                    justify={"space-evenly"}
                                    width={["100%", "80%", "80%", "60%"]}
                                >
                                    <FacebookShareButton
                                        url={
                                            "http://lootmogul.com?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        quote={referralMsg}
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton
                                        url={
                                            "http://lootmogul.com?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <TwitterIcon size={32} round />
                                    </TwitterShareButton>

                                    <FacebookMessengerShareButton
                                        url={
                                            "http://lootmogul.com?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <FacebookMessengerIcon
                                            size={32}
                                            round
                                        />
                                    </FacebookMessengerShareButton>
                                    <WhatsappShareButton
                                        url={
                                            "http://lootmogul.com?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <RedditShareButton
                                        url={
                                            "http://lootmogul.com?referral_code=" +
                                                user.referral_code?.code || ""
                                        }
                                        title={referralMsg}
                                    >
                                        <RedditIcon size={32} round />
                                    </RedditShareButton>
                                </Flex>
                            </>
                        )}
                    </Box>
                </Box>
            </Flex>

            <Flex
                m="auto"
                background="#1c1c1c"
                padding="25px"
                width="100%"
                minH="200px"
                mt="5%"
                backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)"
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
                                    width={["50px", "80px"]}
                                    height={["50px", "80px"]}
                                    pos="relative"
                                >
                                    <Image
                                        alt={item.img}
                                        layout="fill"
                                        src={`/assets/${item.img}`}
                                    />
                                </Box>
                                <Box
                                    mt={"5px!important"}
                                    m="auto"
                                    textAlign={["left", "center"]}
                                >
                                    <Text
                                        letterSpacing="0em"
                                        fontSize={["14px", "20px"]}
                                        color="white"
                                        variant="hint"
                                    >
                                        {item.text1}{" "}
                                    </Text>
                                    <Text
                                        letterSpacing="0em"
                                        mt="2%"
                                        fontSize={["12px", "14px"]}
                                        color="#F8ED1D"
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
