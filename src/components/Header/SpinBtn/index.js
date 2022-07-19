import React, { useContext, useEffect, useState } from "react";
import {
    Spacer,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    useMediaQuery,
    ModalBody,
    ModalCloseButton,
    Box, Text,
    Image
} from "@chakra-ui/react";
import strapi from "../../../utils/strapi";
import moment from "moment";
import dynamic from "next/dynamic";
const Spin = dynamic(() => import("./Spin"));
import LMNonCloseALert from "../../LMNonCloseALert";
import AppContext from "../../../utils/AppContext";

const SpinBtn = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(AppContext);

    const [segments, setSegments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(null);

    const [MobileDevice] = useMediaQuery("(min-width: 768px)");
    const [resultingSpinIndex, setresultingSpinIndex] = useState(-1);
    const [spinTimeRemaining, setSpinTimeRemaining] = useState(0);
    const [spinTimeRemainingFormat, setSpinTimeRemainingFormat] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [rewardType, setRewardType] = useState(null);
    const [resultingMessage, setResultingMessage] = useState(null);

    const handleClaimClick = async () => {
        // const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
        // setPrizeNumber(newPrizeNumber);
        // //console.log(newPrizeNumber, data);
        try {
            await strapi
                .find("bucketgame/custom-bucketgame/claim", {})
                .then((response) => {
                    if (response) {
                        setShowAlert(true);
                        if (rewardType == "currency") {
                            updateUser();
                        }
                    }
                });
        } catch (error) {
            window.location.replace("/");
            return;
        }
    };

    async function fetchData() {
        // fetch user stats
        let segs = [];
        setLoading(true);

        const nextspinTime = await strapi.find(
            "bucketgame/custom-bucketgame/nextfreespin?userId=" + user?.id,
            {}
        ).catch((resp)=>{if(resp.error &&( resp?.error?.status === 401 || resp?.error?.status === 403)){
            {
                updateUser();
                onClose();

            }}
        });
        let dur = moment.duration(nextspinTime?.time);

        let inDays = Math.trunc(moment.duration(dur,'milliseconds').asDays());
       
        setSpinTimeRemainingFormat(
            inDays>0?`Next free spin in ${inDays} day${inDays>1?'s':''}  `: `Next free spin in ${new Date(dur).toISOString().slice(11, 19)}  `
        );
     

        let mySpinData = null;
        if (nextspinTime?.time == 0) {
            mySpinData = await strapi.find(
                "bucketgame/custom-bucketgame/spin?userId=" + user?.id,
                {}
            );
            // //console.log(mySpinData);
        }
        const data = await strapi.find("bucketgamemasters", {
            filters: { status: "active", type: "spin" },
            populate: ["reward.currency"]
        });
        // //console.log("data", data);

        data?.data?.length &&
            data.data?.[0].reward?.map((seg, index) => {
                if (nextspinTime?.time == 0 && seg.id == mySpinData?.id) {
                    setresultingSpinIndex(index);
                    setRewardType(seg.type);
                    setResultingMessage(seg.message);
                }
                seg.name
                    ? segs.push(seg.name)
                    : seg.amount
                    ? segs.push(seg.amount + " - " + seg.currency?.data?.name)
                    : segs.push(seg.name);
            });
        // //console.log("segs", segs);
        setSegments(segs);
        setLoading(false);
        setTimer(null);
        setSpinTimeRemaining(nextspinTime?.time);
    }

    useEffect(() => {
        if (!timer && spinTimeRemaining > 0) {
            let localTime = 0;
            const localTimer = setInterval(() => {
                let dur = moment.duration(spinTimeRemaining - localTime);
                // let days = end.diff(start, 'days');
                let inDays = Math.trunc(moment.duration(spinTimeRemaining - localTime,'milliseconds').asDays());
                if (dur <= 0) {
                    clearInterval(localTimer);
                    fetchData();
                }
                setSpinTimeRemainingFormat(
                    inDays>0?`Next free spin in ${inDays} day${inDays>1?'s':''}  `: `Next free spin in ${new Date(dur).toISOString().slice(11, 19)}  `
                );
                localTime += 1000;
            }, 1000);
            setTimer(localTimer);
        } else {
        }
    }, [spinTimeRemaining]);

    useEffect(() => {
        if (loading) fetchData();
    }, []);

    return (
        <>
            {/* {MobileDevice ? (
                <Button ml={["7%", "25%"]} w="100px" h="35px" onClick={onOpen}>
                    Spin
                </Button>
            ) : (
                <Button
                    ml={["7%", "25%"]}
                    mt={["7%", "25%"]}
                    w="100px"
                    h="35px"
                    onClick={onOpen}
                >
                    Spin
                </Button>
            )} */}

            <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />              
               
                    <ModalContent
                        bgColor={"#3A3845"}
                        my="2%!important"
                        borderRadius="14"
                    >
                        {/* <ModalCloseButton>
                            <Image
                                boxSize="30px"
                                objectFit="cover"
                                src="/assets/close.png"
                                alt="close"
                                m="10px"
                                onClick={onClose}
                            />
                        </ModalCloseButton> */}
                        <ModalBody maxW="100%" maxH="100%" p="0px !important">
                        {!loading && segments && (    <Spin
                                data={segments}
                                rewardType={rewardType}
                                handleClaimClick={handleClaimClick}
                                prizeNumber={resultingSpinIndex}
                                spinTimeRemaining={spinTimeRemaining}
                                spinTimeRemainingFormat={
                                    spinTimeRemainingFormat
                                }
                                modalClose={onClose}
                            >
                                {" "}
                            </Spin>)}
                            {loading &&    <Box
                            w="100%"
                            minH="500px"
                            textAlign={"center"}
                            m="auto"
                           
                            color="secondary"
                        >
                         <Box w="100%" h="100%" pt="50%" textAlign={"center"}>Loading....</Box>   
                        </Box>}
                        </ModalBody>
                    </ModalContent>
            
            </Modal>

            <LMNonCloseALert
                header={"SpinWheel Rewards"}
                canClose={true}
                data={resultingMessage}
                isOpen={showAlert}
                onClose={() => {
                    setShowAlert(false);
                    setLoading(true);
                    setSegments([]);
                    fetchData();
                }}
            />
        </>
    );
};
export default SpinBtn;
