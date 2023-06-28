import { Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import CountDownTimer from "../../../components/CountDownTimer";
import CaptchaPopup from "../../../components/LMModal/CaptchaPopup";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import SocialActions from "../../InfluencerDetails/SocialActions";
import PaidGameConfirmation from "../PaidGameConfirmation";
export const MarketJs = ({ sectionName, imgUrl, author, key, style, gameUrl, }) => {
    return (
        <Link
            href={gameUrl}
            passhref="true"
            _hover={{ border: "none", textDecoration: "none" }}
            _focus={{ border: "none", textDecoration: "none" }}
            key={`igc-${key}`}
            isExternal
        >

            <VStack {...style} >
                <Flex flexDir={"column"} textAlign="center"
                    bgImage={
                        "/assets/designupdate1/gamecard_portrait.png"
                    }
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    cursor="pointer"
                    width={"100%"}
                    height={["360px", "500px", "400px"]}

                >
                    <Text
                        mt={10}
                        color="#FDFFE5"
                        fontSize="19px"
                        fontWeight={"600"}
                        textAlign="center"
                        mx="10"
                        noOfLines={2}
                        overflow="visible"
                    >
                        {"Marketjs Tournament"}
                    </Text>

                    {imgUrl && (
                        <Flex
                            m="auto"
                            w="50%"
                            height={["260px", "400px", "300px"]}
                            className="influencerdiv"
                        >
                            <Image
                                objectFit="contain"
                                alt={imgUrl}
                                layout="fill"
                                src={imgUrl}
                            />
                        </Flex>
                    )}

                    <Text
                        mb={10}
                        color="#FDFFE5"
                        fontSize={["1.2rem"]}
                        fontWeight={"600"}
                        align={"center"}
                        mx={10}
                        textOverflow="ellipsis"
                        overflow="visible"
                    >
                        {author}
                    </Text>
                </Flex>
                <Button
                    variant="solid"
                    h={["40px", "40px"]}
                    fontSize={["20px"]}
                    mt="12px"
                    textTransform="uppercase"
                    _hover={{ textDecoration: "none !important" }}
                    w="90%"
                    onClick={(e) => {
                        "https://d3vhkc3gcq7ogm.cloudfront.net/en/flick-soccer-lootmogul/index.html?tournament_id=3&game_id=4"
                        CheckAndStartGame(
                            `igc-${contestmaster?.id}`,
                            contestmaster
                        );
                    }}
                >
                    Play Now
                </Button>
            </VStack>

        </Link >
    )
}
export const GamePixCard = ({ sectionName, imgUrl, author, key, style, gameUrl, gameid }) => {
    return (
        <Link
            href={'/games/' + gameid + '/' + gameUrl}
            passhref="true"
            _hover={{ border: "none", textDecoration: "none" }}
            _focus={{ border: "none", textDecoration: "none" }}
            key={`igc-${key}`}
        >

            <VStack {...style} >
                <Flex flexDir={"column"} textAlign="center"
                    bgImage={
                        "/assets/designupdate1/gamecard_portrait.png"
                    }
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    cursor="pointer"
                    width={"100%"}
                    height={["360px", "500px", "400px"]}

                >
                    <Text
                        mt={10}
                        color="#FDFFE5"
                        fontSize="19px"
                        fontWeight={"600"}
                        textAlign="center"
                        mx="10"
                        noOfLines={2}
                        overflow="visible"
                    >
                        {"Gamepix Tournament"}
                    </Text>

                    {imgUrl && (
                        <Flex
                            m="auto"
                            w="50%"
                            height={["260px", "400px", "300px"]}
                            className="influencerdiv"
                        >
                            <Image
                                objectFit="contain"
                                alt={imgUrl}
                                layout="fill"
                                src={imgUrl}
                            />
                        </Flex>
                    )}

                    <Text
                        mb={10}
                        color="#FDFFE5"
                        fontSize={["1.2rem"]}
                        fontWeight={"600"}
                        align={"center"}
                        mx={10}
                        textOverflow="ellipsis"
                        overflow="visible"
                    >
                        {author}
                    </Text>
                </Flex>

                <Button
                    variant="solid"
                    h={["40px", "40px"]}
                    fontSize={["20px"]}
                    mt="12px"
                    textTransform="uppercase"
                    _hover={{ textDecoration: "none !important" }}
                    w="90%"
                    onClick={(e) => {
                        e.preventDefault();

                    }}
                >
                    Play Now
                </Button>
            </VStack>

        </Link >
    )
}