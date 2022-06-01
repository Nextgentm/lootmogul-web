import { Box, Flex, Text, Input, Button, Link } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { AppContext } from "../../utils/AppContext";
import Image from "next/Image";
import WhyBuyNft from "./WhyBuyNft";
import DroppingSoonNft from "./DroppingSoonNft";

const CricketerNft = () => {
    const { isTabletOrDesktop } = useContext(AppContext);
    const [email, setEmail] = useState("");

    return (
        <>
            <Link  _hover={{textDecoration:"none"}} _focus={{border:"none", boxShadow:"none"}} href="https://bit.ly/3LQlaLV">
                 <Box pos="relative" w="100%"
                h={["220px", "320px", "360px", "460px", "580px"]}>
                <Image

                    alt={`cricket`}
                    layout="fill"
                    src="/assets/Cricket_Nft_Banner.jpg"

                />
            </Box>
            </Link>
            <Box
                m="4%"
                mt="2%"
                paddingLeft={["2px", "20px"]}
                paddingRight={["2px", "20px"]}
                color="white"
                fontFamily={"Sora"}
                textAlign="justify"
            >

                <Text color="white" fontFamily="Blanch" fontSize={["28px", "28px", "28px", "58px"]}>
                    WHAT IS NFT?
                </Text>
                <Text variant="hint" mt="10px" fontSize="14px">
                    An NFT is a non-fungibletoken that essentially allows its buyer to own the original copy of digital art in the same way you might own the original copy of a place of physical art.

                    Simply, these are digital assets that are rare, and unique.

                    Their value appreciates with time as you sell, trade or auction.
                </Text>

                <WhyBuyNft />
                <DroppingSoonNft />
                < Flex alignItems={"center"} direction="column" mt="20px" mb="20px" ml={["20px", "20px", "20px", "60px"]} mr={["20px", "20px", "20px", "60px"]} >
                    <Text color="white" fontFamily="Blanch" fontSize={["28px", "38px", "38px", "58px"]}>STAY TUNED!</Text>
                    <Text color="white" fontFamily="Sora" fontSize={["14px", "16px", "16px", "20px"]}>Get Latest NFT Updates</Text>
                    <Text variant="hint" mt="2px" fontSize="14px">Subscribe Now!</Text>

                    {!isTabletOrDesktop ? (
                        <Box mt="1%">
                            <Flex mt="5%" >
                                <Input bgColor={"white"} borderRadius={"1px"} width="100%" textAlign="center" defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email Id" textColor={"black"} /></Flex>
                            <Flex mt="5%">
                                <Button borderRadius={"1px"} margin="auto" width="50%">Submit</Button>
                            </Flex>

                        </Box>
                    ) : (
                        <Flex mt="1%">
                            <Input bgColor={"white"} borderRadius={"1px"} width="75%" textAlign="center" defaultValue={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email Id" textColor={"black"} />
                            <Button borderRadius={"1px"} margin="auto" width="30%" >Submit</Button>
                        </Flex>
                    )}
                </Flex>
            </Box >
        </>
    );
};

export default CricketerNft;
