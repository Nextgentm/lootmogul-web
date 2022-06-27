import { Flex, Button, Text, Image, Popover, PopoverTrigger } from "@chakra-ui/react";
import {
    // AiOutlineHeart,
    // AiOutlineShareAlt,
    AiOutlineQuestionCircle
} from "react-icons/ai";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../../utils/AppContext";
import strapi from "../../../../utils/strapi";

import { setCountForCaptcha } from "../../../../services/dataService";
import CountDownTimer from "../../../../components/CountDownTimer";
import dynamic from "next/dynamic";
const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));
const PaidGameConfirmation = dynamic(() => import("../../../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../../../components/LMModal/CaptchaPopup"));

const iconStyles = {
    width: "40px",
    height: "40px",
    background: "#2D2D2D",
    borderRadius: "4px",
    align: "center",
    justify: "center",
    ml: "16px",
    cursor: "pointer"


};

const style1 = {
    transition: "scale(1.5) 1s  ease-in-out steps(28)"
};

const GameInfoActions = ({ gameData, isTabletOrDesktop }) => {
    const router = useRouter();
    const {
        setCurrentContest,
        toggleLoginModal,
        user,
        influencerLikes,
        FetchLikes
    } = useContext(AppContext);
    const { showPaidGameConfirmation, CheckAndStartGame, showCaptcha, setShowCaptcha, showLoading, setShowLoading } =
        useContext(AppContext);
    const imgSize = { width: 30, height: 30 };

    const [isHeartClick, setHeartClick] = useState(false);
    const [contestStatus,setContestStatus]= useState(false);

    const [animate, setAnimate] = useState(false);
    const animateEffect = () => {
        // Button begins to shake
        setAnimate(true);

        // // Buttons stops to shake after 2 seconds
        setTimeout(() => setAnimate(false), 2000);
        onHeartClick();
    };

    const onHeartClick = async () => {
        if (!user) {
            toggleLoginModal();
            return;
        }
        if (gameData?.influencer?.data?.id) {
            const resp = await strapi.request(
                "get",
                "connection/toggleInfluencerLike?influencer=" +
                gameData.influencer.data.id,
                {}
            );
            FetchLikes();
            setHeartClick(!isHeartClick);
        }
    };
    useEffect(() => {
        if (influencerLikes?.includes(gameData.influencer?.data?.id)) {
            setHeartClick(true);
        }
    }, [gameData, influencerLikes]);

    return (
        <Flex
            mt="20px"
            ml={["16px", 0]}
            direction={["column", "row"]}
            align={["flex-start", "center"]}
            w="100%"
            key={`GameDetail-${gameData?.id}`}
        >
            <Flex flex={1}>
                <Text fontWeight={600} fontSize="16px" color="white">
                    Entry
                </Text>
                <Text fontWeight={600} fontSize="16px" ml="5px" color="#F8ED1D">
                    {gameData?.entryFee ? "$ " + gameData?.entryFee : " Free"}
                </Text>
            </Flex>

            <Flex mt={["12px", 0]}>
                {gameData && gameData.contest && (gameData?.contest?.status === "active" ||contestStatus) && <Button
                    variant="solid"
                    h={"40px"}
                    mr="8px"
                    onClick={() => {
                        setShowLoading({ "key": `GameDetail-${gameData?.id}`, "show": true });
                        CheckAndStartGame(
                            `GameDetail-${gameData?.id}`,
                            gameData
                        );
                    }}
                >
                    Join Contest
                </Button>}
                {gameData && gameData.contest && (gameData?.contest?.status === "upcoming" && !contestStatus) && (
                    <Button m="auto" opacity="1!important" variant="outline" mr="8px"
                        h={"40px"} disabled color="primary" >

                        <CountDownTimer onZero={()=>setContestStatus(true)} startDate={gameData.contest.startDate} /> </Button>)}
                {gameData && gameData.contest && gameData?.contest?.status === "closed" && (<Button m="auto" variant="outline" mr="8px"
                    h={"40px"} disabled>

                    Completed </Button>)}
                {gameData && showCaptcha && showCaptcha?.callerKey ==
                    `GameDetail-${gameData?.id}` && <LMNonCloseALert
                        header={"Clear Captcha!"}
                        canClose={false}
                        isOpen={showCaptcha}
                    ><CaptchaPopup onChange={() => {
                        setShowCaptcha({});
                        setCountForCaptcha(0);
                        CheckAndStartGame(`GameDetail-${gameData?.id}`, gameData);
                    }} /></LMNonCloseALert>
                }
                {gameData &&
                    showPaidGameConfirmation?.callerKey ==
                    `GameInfo-${gameData?.id}` && (
                        <PaidGameConfirmation contestmaster={gameData} />
                    )}

                <LMNonCloseALert
                    header={"Please Wait....."}
                    canClose={false}
                    isOpen={showLoading.show && showLoading.key === `GameDetail-${gameData?.id}`}
                ></LMNonCloseALert>

                <Flex
                    {...iconStyles}
                    cursor="pointer"
                    style={animate ? style1 : null}
                >
                    <Image
                        alt="fav"
                        src={
                            isHeartClick
                                ? "/assets/favsel.svg"
                                : "/assets/fav.svg"
                        }
                        onClick={animateEffect}
                        {...imgSize}
                    />
                    ;
                    {/* <ExportedImage alt="fav" {...imgSize} src="/assets/fav.svg" /> */}
                </Flex>
                {/* <Flex {...iconStyles}>
                    <AiOutlineHeart color="white" />
                </Flex> */}

                <Flex {...iconStyles}>
                    <Popover>
                        <PopoverTrigger>
                            <Image
                                alt="share"
                                {...imgSize}
                                src="/assets/share.svg"
                            />
                        </PopoverTrigger>
                        <NextShare
                            link={
                                "https://lootmogul.com/games/" + gameData?.slug
                            }
                            caption={"Join me on a quiz game - " + gameData?.name + " to win real prizes!"}
                            hashtag="lootmogul"
                            type="influencer"
                            influencer={gameData?.influencer?.data}
                            user={user}
                        ></NextShare>
                    </Popover>
                </Flex>

                <Flex {...iconStyles}>
                    <AiOutlineQuestionCircle color="white" />
                </Flex>
            </Flex>
        </Flex>
    );
};

export default GameInfoActions;
