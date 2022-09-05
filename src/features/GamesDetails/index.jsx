import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../utils/AppContext/index";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Breadcrumbs from "../../components/Breadcrumbs/index";
import { getCountForCaptcha, setCountForCaptcha } from "../../services/dataService";
import dynamic from "next/dynamic";
const PaidGameConfirmation = dynamic(() => import("../Games/PaidGameConfirmation"));
const LMNonCloseALert = dynamic(() => import("../../components/LMNonCloseALert"));
const CaptchaPopup = dynamic(() => import("../../components/LMModal/CaptchaPopup"));
import GameInfo from "./GameInfo";
import GameTabs from "./GameTabs";
import CountDownTimer from "../../components/CountDownTimer";



const GameDetails = ({ gameData }) => {
    const { isTabletOrDesktop } = useContext(AppContext);
    const router = useRouter();
    
    const { showPaidGameConfirmation, CheckAndStartGame, showCaptcha, setShowCaptcha} = useContext(AppContext);
    const [defaultTab, setDefaultTab] = useState(router.asPath.includes("#leaderboard")?1:0);
    const [contestStatus,setContestStatus]= useState(false);

    const [breadcrumbsPath, setBreadCrumbPath] = useState([
        {
            label: "Home",
            path: "/"
        },
        { label: "Games", path: "/games" }
    ]);

    useEffect(async () => {
        // fetch user stats
        if (gameData) {
            setBreadCrumbPath([
                {
                    label: "Home",
                    path: "/"
                },
                { label: "Games", path: "/games" },
                { label: gameData.name }
            ]);
        }

    }, [gameData]);
    return (
        <Box
            mr={["18px", "60px"]}
            ml={["18px", "60px"]}
            
            m="auto"
            textAlign={"center"}
            key={`GameDetail-${gameData?.id}`}
            mt={["20px","40px"]}
            mb={"10vw"}
        >

            {/* {isTabletOrDesktop && (
                <Breadcrumbs
                    routes={breadcrumbsPath}
                    style={{ mt: "14px", mb: "14px" }}
                />
            )} */}

            {gameData && <GameInfo isTabletOrDesktop={isTabletOrDesktop} gameData={gameData} />}
            {gameData && <GameTabs defaultTab={defaultTab} gameData={gameData} />}

            {gameData && gameData.contest && (gameData?.contest?.status === "active" ||contestStatus) &&
                <Button m="auto"
                    onClick={() => {
                        CheckAndStartGame(`GameDetail-${gameData?.id}`, gameData)
                    }
                    }
                >Join Contest</Button>
            }

            {gameData && gameData.contest && (gameData?.contest?.status === "upcoming" && !contestStatus) && (
                <Button m="auto" opacity="1!important" variant="outline" disabled mb="2%" color="primary">

                    <CountDownTimer onZero={()=>setContestStatus(true)} startDate={gameData.contest.startDate} /> </Button>)}
            {gameData && gameData.contest && gameData?.contest?.status === "closed" && (
                <Button m="auto" variant="outline" disabled mb="2%">

                    Completed </Button>)}
            {gameData && showCaptcha && showCaptcha?.callerKey == `GameDetail-${gameData?.id}` && <LMNonCloseALert
                header={"Clear Captcha!"}
                canClose={false}

                isOpen={showCaptcha}
            ><CaptchaPopup onChange={() => {
                setShowCaptcha({});
                if (getCountForCaptcha() && parseInt(getCountForCaptcha()) >= 5) setCountForCaptcha(0);
                CheckAndStartGame(`GameDetail-${gameData?.id}`, gameData);
            }} /></LMNonCloseALert>
            }

            {gameData && showPaidGameConfirmation?.callerKey == `GameDetail-${gameData?.id}` && <PaidGameConfirmation contestmaster={gameData} />}

        </Box>
    );
};

export default GameDetails;