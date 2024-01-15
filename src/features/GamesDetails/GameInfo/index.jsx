import { Box, Flex, Text, Image } from "@chakra-ui/react";

import GameInfoActions from "./GameInfoActions";
import GameInfoGrid from "./GameInfoGrid";
import MultipleLoggedInUser from "/src/components/MultipleLoggedInUser/index.jsx";
import moment from "moment";



const GameInfo = ({ gameData, isTabletOrDesktop }) => {
  const startDate = moment(gameData?.contest?.startDate)
  const today = moment();

  const renderBanner = () => (
    <Flex
      w={["100%"]}
      h={["260px", "260px", "260px", "260px", "410px"]}
      position="relative"
      borderRadius={"md"}
      flexDir="column"
      overflow={"hidden"}
    >
      <Image
        src="/assets/designupdate1/gamecard_landscape.png"
        objectFit={"contain"}
        h={["260px", "260px", "260px", "260px", "410px"]}
        pos="absolute"
      ></Image>
      <Flex
        w="100%"
        h={["120px", "120px", "150px", "180px", "230"]}
        pos="relative"
        top={["70px", "70px", "55px", "40px", "50px"]}
      >
        <Flex w={["50%","50%","50%","32%","40%","30%"]} justifyContent="center" pos="relative" bottom="-26px">
          <Image
            pos="relative"
            bottom="0px"
            boxSize={["100px", "100px", "120px", "150px", "200px"]}
            alt="game"
            src={
              gameData?.icon?.data?.url
                ? gameData.icon.data.url
                : "/assets/game-dtl-player.png"
            }
          />
        </Flex>
        <Flex
          direction="column"
          w={["50%","50%","50%","50%","45%","30%"]}
          justifyContent="space-between"
          h="100%"
          mr="35px"
        >
          <Text
            color="#FDFFE5"
            fontSize={["12px", "12px", "12px", "18px", "18px"]}
            fontWeight={"400"}
          >
            {gameData?.contest_section?.data?.name}
            {/* { gameData?.type == "leaderboard"
                    ? "Skill Games":
                    "Skill Games"} */}
          </Text>
          <Text
            color="#FFF"
            fontSize={["15px", "15px", "15px", "20px", "25px"]}
            fontWeight={"500"}
            flexWrap={"wrap"}
            fontFamily="Sora"
            textAlign={"center"}
          >
            {gameData.name}
          </Text>
          <Text
            color="#FFF"
            fontSize={["10px", "10px", "10px", "12px", "15px"]}
            fontWeight={"400"}
            flexWrap={"wrap"}
            fontFamily="Sora"
            textAlign={"center"}
          >
            {gameData?.contest?.startDate && (
              (startDate.isSame(today, 'day') && 'Starting Today') ||
              startDate.isAfter(today) && `Starting on ${startDate.format("DD MMM YYYY")}`
            )}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
  const rewardDescription = gameData?.reward?.data?.description;
  const modifiedDescription = rewardDescription ? rewardDescription.replace("$", "") : '';
  const chipStr = (!isNaN(+modifiedDescription)) ? 'CHIPS' : '';
  return (
    <>
      <Flex
        direction={["column", "column", "row"]}
        justifyContent="space-between"
      >
        <Flex
          direction="column"
          width={["80%", "100%", "55%", "45%"]}
          m={"auto"}
        >
          {renderBanner()}
          {isTabletOrDesktop && (
            <GameInfoActions
              gameData={gameData}
              isTabletOrDesktop={isTabletOrDesktop}
            />
          )}
        </Flex>

        <Box
          width={["80%", "100%", "50%", "50%"]}
          pl={["0px", "0px", "12px", "32px"]}
          m={"auto"}
        >
          {gameData?.reward?.data?.description ? (
            <Flex align={"center"}>
              <Text
                fontWeight={300}
                fontSize={["17px", "17px", "17px", "25px", "36px"]}
                color="white"
                fontFamily="Sora"
              >
                Current Contest Stats {/* Winning prize */}
              </Text>
              {chipStr && (
                <Image
                  alt="tag"
                  boxSize={["25px", "35px"]}
                  src="/assets/Icon.png"
                  mt="12px"
                  ml="10px"
                  marginBottom={"4px"}
                />
              )}

              <Text
                fontWeight={600}
                fontSize={["17px", "17px", "17px", "25px", "36px"]}
                ml="10px"
                color="#d63065"
              >
                {/* {modifiedDescription} {chipStr} */}
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Text
                fontWeight={600}
                fontSize={["17px", "24px", "28px", "36px"]}
                color="white"
              >
                Practice for Free
              </Text>
            </Flex>
          )}
          <Text
            mt="8px"
            color="white"
            fontWeight="200"
            fontSize={["12px", "12px", "12px", "16px", "16px"]}
            textAlign={"left"}
          >
            {gameData?.reward?.data?.description
              ? "Make your highest score & win cash rewards!"
              : "Make your highest score"}
          </Text>

          <GameInfoGrid gameData={gameData} />
        </Box>
        <Box>
          {!isTabletOrDesktop && (
            <GameInfoActions
              gameData={gameData}
              isTabletOrDesktop={isTabletOrDesktop}
            />
          )}
        </Box>

      </Flex>
    </>
  );
};

export default GameInfo;
