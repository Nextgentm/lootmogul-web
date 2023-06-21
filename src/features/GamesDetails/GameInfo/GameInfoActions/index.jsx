import {
    Flex,
    Box,
    Button,
    Text,
    Image,
    Popover,
    PopoverTrigger,
    Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  } from "@chakra-ui/react";
  import { ChevronRightIcon  } from "@chakra-ui/icons";
  import { useRouter } from "next/router";
  import { useContext, useEffect, useState } from "react";
  import AppContext from "../../../../utils/AppContext";
  import strapi from "../../../../utils/strapi";
  
  import { setCountForCaptcha } from "../../../../services/dataService";
  import CountDownTimer from "../../../../components/CountDownTimer";
  import dynamic from "next/dynamic";

  import { breabCrumbStyle } from "../../../../components/Header/styles";

  const NextShare = dynamic(() => import("../../../../utils/socialbuttons"));
  const PaidGameConfirmation = dynamic(() =>
    import("../../../Games/PaidGameConfirmation")
  );
  const LMNonCloseALert = dynamic(() =>
    import("../../../../components/LMNonCloseALert")
  );
  const CaptchaPopup = dynamic(() =>
    import("../../../../components/LMModal/CaptchaPopup")
  );
  
  const iconStyles = {
    width: "30px",
    height: "40px",
    border: "1px",
    borderRadius: "4px",
    color: "grey",
    align: "center",
    justify: "center",
    ml: "10px",
    cursor: "pointer",
  };
  
  const GameInfoActions = ({ gameData }) => {
    const router = useRouter();
    const { toggleLoginModal, user, influencerLikes, FetchLikes } =
      useContext(AppContext);
    const {
      showPaidGameConfirmation,
      CheckAndStartGame,
      showCaptcha,
      setShowCaptcha,
      showLoading,
      setShowLoading,
    } = useContext(AppContext);
  
    const [isHeartClick, setHeartClick] = useState(false);
    const [contestStatus, setContestStatus] = useState(false);
  
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
    
    const breadcumbData = [
      { text: "Home", url: process.env.NEXT_PUBLIC_WORDPRESS_URL, isCurrentPage: false },
      {
        text: 'Games',
        url: "/games/",
        isCurrentPage: false,
      },
      { text: gameData.name, url: "", isCurrentPage: true },
    ];

    return (
      <Box>
      <Flex
        px={["0", "0", "0", "2", "6"]}
        mt="20px"
        mb={["20px", "20px", "0px"]}
        ml={["16px", 0]}
        justifyContent="space-between"
        alignItems="center"
        w={["90%", "90%", "100%"]}
        key={`GameDetail-${gameData?.id}`}
      >
        <Flex>
        <Image
            alt="tag"
            boxSize={["15px", "25px"]}
            src="/assets/Icon.png"
            mt="5px"
            mr="5px"
        />
          <Text fontWeight={500} fontSize="19px" color="white">
            Entry Fee -
          </Text>
          <Text fontWeight={700} fontSize="19px" ml="5px" color="#d63065">
            {gameData?.entryFee ? gameData?.entryFee + " CHIPS" : " Free"}
          </Text>
        </Flex>
  
        <Flex mt={["12px", 0]} ml={["10px", "10px", "0px"]}>
          {gameData &&
            gameData.contest &&
            (gameData?.contest?.status === "active" || contestStatus) && (
              <Button
                variant="solid"
                h={"30px"}
                px={["10px !important", "10px !important", "20px !important"]}
                py="20px"
                // mr="8px"
                fontWeight="300"
                fontSize={["10px"]}
                onClick={() => {
                  setShowLoading({
                    key: `GameDetail-${gameData?.id}`,
                    show: true,
                  });
                  CheckAndStartGame(`GameDetail-${gameData?.id}`, gameData);
                }}
              >
                Join Contest
              </Button>
            )}
          {gameData &&
            gameData.contest &&
            gameData?.contest?.status === "upcoming" &&
            !contestStatus && (
              <Button
                m="auto"
                opacity="1!important"
                variant="outline"
                mr="8px"
                h={"40px"}
                disabled
                color="primary"
              >
                <CountDownTimer
                  onZero={() => setContestStatus(true)}
                  startDate={gameData.contest.startDate}
                />{" "}
              </Button>
            )}
          {gameData &&
            gameData.contest &&
            gameData?.contest?.status === "closed" && (
              <Button m="auto" variant="outline" mr="8px" h={"40px"} disabled>
                Completed{" "}
              </Button>
            )}
          {gameData &&
            showCaptcha &&
            showCaptcha?.callerKey == `GameDetail-${gameData?.id}` && (
              <LMNonCloseALert
                header={"Clear Captcha!"}
                canClose={false}
                isOpen={showCaptcha}
              >
                <CaptchaPopup
                  onChange={() => {
                    setShowCaptcha({});
                    setCountForCaptcha(0);
                    CheckAndStartGame(`GameDetail-${gameData?.id}`, gameData);
                  }}
                />
              </LMNonCloseALert>
            )}
          {gameData &&
            showPaidGameConfirmation?.callerKey == `GameInfo-${gameData?.id}` && (
              <PaidGameConfirmation contestmaster={gameData} />
            )}
  
          <LMNonCloseALert
            header={"Please Wait....."}
            canClose={false}
            isOpen={
              showLoading.show && showLoading.key === `GameDetail-${gameData?.id}`
            }
          ></LMNonCloseALert>
  
          {/* <Flex
                      {...iconStyles}  w={["30px","30px","30px","40px"]} 
                      cursor="pointer"
                      style={animate ? style1 : null}
                  >
                      <Image
                      boxSize="20px"
                          alt="fav"
                          src={
                              isHeartClick
                                  ? "/assets/designupdate1/games_like_icon1.svg"
                                  : "/assets/designupdate1/games_like_icon.svg"
                          }
                          onClick={animateEffect}
                          {...imgSize}
                      />
                      
                      <ExportedImage alt="fav" {...imgSize} src="/assets/fav.svg" />
                  </Flex> */}
          {/* <Flex {...iconStyles}>
                      <AiOutlineHeart color="white" />
                  </Flex> */}
  
          <Flex {...iconStyles} w={["30px", "30px", "30px", "40px"]}>
            <Popover>
              <PopoverTrigger>
                <Image
                  boxSize="20px"
                  alt="share"
                  // {...imgSize}
                  src="/assets/designupdate1/games_share_icon.svg"
                />
              </PopoverTrigger>
              <NextShare
                link={process.env.NEXT_BASE_URL + "/" + gameData?.slug}
                caption={
                  "Join me on a quiz game - " +
                  gameData?.name +
                  " to win real prizes!"
                }
                hashtag="lootmogul"
                type="influencer"
                influencer={gameData?.influencer?.data}
                user={user}
              ></NextShare>
            </Popover>
          </Flex>
                
          {/* <Flex {...iconStyles} w={["30px","30px","30px","40px"]}  >
                          <Image
                          boxSize="20px"
                                  alt="share"
                                  // {...imgSize}
                                  src="/assets/designupdate1/games_question_icon.svg"
                              />
                      <AiOutlineQuestionCircle color="white" />
                  </Flex> */}
        </Flex>
      </Flex>
      <Box mt={5}  fontWeight={"bold"}>
            <Flex mt={10}>
                <Breadcrumb
                    spacing="3px"
                    fontSize={"20px"}
                    color={"white"}
                    separator={<ChevronRightIcon color="gray.500" />}
                >
                    {breadcumbData?.map((route) => (
                        <BreadcrumbItem>
                            <BreadcrumbLink
                                href={route.url}
                                {...breabCrumbStyle(route.isCurrentPage)}
                               
                            >
                                {route.text}
                                {route.isCurrentPage}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    ))}
                </Breadcrumb>
            </Flex>
        </Box>            
      </Box>
    );
  };
  
  export default GameInfoActions;
  