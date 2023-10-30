import React, { useContext, useState, useEffect } from "react";
import { Text, Flex, Box, VStack, Link, Button, Image, Tooltip } from "@chakra-ui/react";
import { getStrapiMedia } from "../../../../utils/medias";
import SocialActions from "../../SocialActions";
import { useRouter } from "next/router";
import { nFormatter } from "../../../../utils/utils";
import AppContext from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";
import { setCountForCaptcha } from "../../../../services/dataService";
import * as ct from '../../../../services/clevertapAnalytics';
import dynamic from "next/dynamic";
import CountDownTimer from "../../../../components/CountDownTimer";
import { InfoIcon } from "../../../../components/Icons";
import moment from "moment";
const PaidGameConfirmation = dynamic(() =>
    import("../../../Games/PaidGameConfirmation")
);
const LMNonCloseALert = dynamic(() =>
    import("../../../../components/LMNonCloseALert")
);
const CaptchaPopup = dynamic(() =>
    import("../../../../components/LMModal/CaptchaPopup")
);

const GamesCard = ({ contestmaster, style, sectionName }) => {
    const imgUrl = contestmaster?.icon?.data?.url;
    const router = useRouter();
    const [isHeartClick, setHeartClick] = useState(false);
    const [contestStatus, setContestStatus] = useState(false);
    const {
        showPaidGameConfirmation,
        CheckAndStartGame,
        showCaptcha,
        setShowCaptcha,
        user,
        influencerLikes,
        FetchLikes,
        toggleLoginModal,
        setShowLoading,
        showLoading,
        setIsFromNoLocationGame
    } = useContext(AppContext);
    const onHeartClick = async () => {
        if (!user) {
            toggleLoginModal();
            return;
        }
        if (contestmaster.influencer?.data?.id) {
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" +
                contestmaster.influencer.data.id,
                {}
            );
            FetchLikes();
            setHeartClick(!isHeartClick);
        }
    };
    useEffect(() => {
        if (influencerLikes?.includes(contestmaster.influencer?.data?.id)) {
            setHeartClick(true);
        }
    }, [contestmaster, influencerLikes]);
    //console.log(contestmaster.contest?.endDate);
    return (
        <Link
            href={"/games/" + contestmaster?.slug}
            passhref="true"
            _hover={{ border: "none", textDecoration: "none" }}
            _focus={{ border: "none", textDecoration: "none" }}
            key={`igc-${contestmaster?.id}`}
        >
            <VStack {...style}>
                <Flex
                    flexDir={"column"}
                    textAlign="center"
                    bgImage={"/assets/designupdate1/gamecard_portrait.png"}
                    bgPosition="center"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    cursor="pointer"
                    width={"100%"}
                    height={["360px", "500px", "400px"]}
                >


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
                                w="350px"
                                src={getStrapiMedia(imgUrl)}
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
                        {contestmaster.name}
                    </Text>
                </Flex>

                <Flex
                    w={"full"}
                    align="left"
                    justify={"space-between"}
                    px="1rem"
                    mt={1}
                >
                    <VStack style={{ "align-items": "flex-start" }}>
                        <Flex>
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
                                    contestmaster.entryFee +
                                    " CHIPS"
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

                            {(contestmaster?.game?.data?.config?.game == "marketjs" && contestmaster?.playCount > 50)
                                || (contestmaster?.game?.data?.config?.game !== "marketjs" && contestmaster?.roomsCount > 25)
                                ?
                                <>
                                    {contestmaster?.game?.data?.config?.game ==
                                        "marketjs"
                                        ? nFormatter(contestmaster?.playCount, 1)
                                        : nFormatter(contestmaster?.roomsCount, 1, 'roomsCount')
                                    }{" "}
                                    Players Played
                                </> : <Text p="3"></Text>}
                        </Text>
                    </VStack>
                    {sectionName === 'Blockchain Games' ? (
                        <Box w={["30%", "30%", "23%"]}>
                            <Tooltip
                                placement="top-end"
                                label={'Contest end at ' + moment(contestmaster.contest?.endDate).format("DD MMM, YYYY, HH:mm")}
                                bg="#383838"
                                borderRadius="10px"
                                color="white"
                                fontSize="sm"
                                p="10px"
                            >
                                <Text>
                                    <InfoIcon
                                        color="#ddd"
                                        float="right"
                                        boxSize={"29px"}
                                    />
                                </Text>
                            </Tooltip>

                            <SocialActions
                                onHeartClick={onHeartClick}
                                isHeartClick={isHeartClick}
                                imgSize={{ width: "25px", height: "25px" }}
                                influencer={contestmaster.influencer}
                            />
                        </Box>
                    ) :
                        <SocialActions
                            onHeartClick={onHeartClick}
                            isHeartClick={isHeartClick}
                            imgSize={{ width: "25px", height: "25px" }}
                            influencer={contestmaster.influencer}
                        />
                    }
                </Flex>

                {contestmaster &&
                    contestmaster.contest &&
                    (contestmaster?.contest?.status === "active" ||
                        contestStatus) && (
                        <Button
                            variant="solid"
                            h={["40px", "40px"]}
                            fontSize={["20px"]}
                            mt="12px"
                            textTransform="uppercase"
                            _hover={{ textDecoration: "none !important" }}
                            w="90%"
                            onClick={(e) => {
                                ct.onGamePlayNowButton({
                                    action: "", params: {
                                        "ButtonName": "Play Now",
                                        "CollectionName": contestmaster.name,
                                        "GameName": contestmaster.name,
                                        "Username": user?.username,
                                        "PlayerID": user?.id,
                                        "EmailID": user?.email,
                                        "MobileNo": user?.mobileNumber
                                    }
                                });

                                if (
                                    contestmaster?.game?.data
                                        ?.config?.game == "marketjs"
                                ) {
                                    setIsFromNoLocationGame(true);
                                }
                                e.preventDefault();
                                setShowLoading({
                                    key: `igc-${contestmaster?.id}`,
                                    show: true
                                });
                                CheckAndStartGame(
                                    `igc-${contestmaster?.id}`,
                                    contestmaster
                                );
                            }}
                        >
                            Play Now
                        </Button>
                    )}
                {contestmaster &&
                    contestmaster.contest &&
                    contestmaster?.contest?.status === "upcoming" &&
                    !contestStatus && (
                        <Button
                            m="auto"
                            h={["34px", "28px"]}
                            mt="12px"
                            opacity="1!important"
                            color="primary"
                            w="90%"
                            variant="outline"
                            disabled
                        >
                            <CountDownTimer
                                onZero={() => setContestStatus(true)}
                                startDate={contestmaster.contest.startDate}
                            />{" "}
                        </Button>
                    )}
                {contestmaster &&
                    contestmaster.contest &&
                    contestmaster?.contest?.status === "closed" && (
                        <Button
                            h={["34px", "28px"]}
                            mt="12px"
                            w="90%"
                            m="auto"
                            variant="outline"
                            disabled
                        >
                            Completed{" "}
                        </Button>
                    )}
                {contestmaster &&
                    showCaptcha &&
                    showCaptcha?.callerKey == `igc-${contestmaster?.id}` && (
                        <LMNonCloseALert
                            header={"Clear Captcha!"}
                            canClose={false}
                            isOpen={showCaptcha}
                        >
                            <CaptchaPopup
                                onChange={() => {
                                    setShowCaptcha({});
                                    setCountForCaptcha(0);
                                    CheckAndStartGame(
                                        `igc-${contestmaster?.id}`,
                                        contestmaster
                                    );
                                }}
                            />
                        </LMNonCloseALert>
                    )}
                {showPaidGameConfirmation?.callerKey ==
                    `igc-${contestmaster?.id}` && (
                        <PaidGameConfirmation contestmaster={contestmaster} />
                    )}

                <LMNonCloseALert
                    header={"Please Wait....."}
                    canClose={false}
                    isOpen={
                        showLoading.key == `igc-${contestmaster?.id}` &&
                        showLoading.show
                    }
                ></LMNonCloseALert>
            </VStack>
        </Link>
    );
};

export default GamesCard;
