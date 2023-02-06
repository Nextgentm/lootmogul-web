import { Button, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import CountDownTimer from "../../../components/CountDownTimer";
import CaptchaPopup from "../../../components/LMModal/CaptchaPopup";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import SocialActions from "../../InfluencerDetails/SocialActions";
import PaidGameConfirmation from "../PaidGameConfirmation";
export const MarketJs = ({ sectionName, imgUrl, author, key, style, gameUrl }) => {
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
export const GamePixCard = ({ sectionName, imgUrl, author, key, style, gameUrl }) => {
    return (
        <Link
            href={'/games/' + gameid + '/' + gameUrl}
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

                {/* <Flex
                    w={"full"}
                    align="left"
                    justify={"space-between"}
                    px="1rem"
                    mt={1}
                >
                    <VStack style={{ "align-items": "flex-start" }}>


                        <Flex >
                            <Image
                                alt="tag"
                                boxSize={["25px", "30px"]}
                                src="/assets/Icon.png"
                            />
                            <Text
                                ml="6px"
                                color="#FFF"
                                fontSize={["15px", "17px"]}
                                fontWeight="400"
                            >
                                {contestmaster.entryFee != 0
                                    ? "Entry Fee - " +
                                    contestmaster.entryFee + " CHIPS"
                                    : "Free"}

                            </Text>

                        </Flex>
                        <Text
                            color="#FFF"
                            fontSize={["0.75rem", "0.9rem"]}
                            fontWeight="200"
                            mt={0}
                            pl="6px"
                        >
                            {nFormatter(
                                contestmaster.roomsCount,
                                1
                            )}{" "}
                            Plays
                        </Text>
                    </VStack>

                    <SocialActions
                        onHeartClick={onHeartClick}
                        isHeartClick={isHeartClick}
                        imgSize={{ width: "25px", height: "25px" }}
                        influencer={contestmaster.influencer}
                    />
                </Flex> */}

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