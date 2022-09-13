import {
    Box,
    Flex,
    Text,
    Spacer,
    SimpleGrid,
    Center
    

} from "@chakra-ui/react";
import Image from "next/image";
import GameInfoActions from "./GameInfoActions";
import GameInfoGrid from "./GameInfoGrid";

const GameInfo = ({ gameData, isTabletOrDesktop }) => {
    const renderBanner = () => (
        <Flex
        
            position="relative"
            bgImage={"/assets/designupdate1/gamecard_landscape.svg"}
            backgroundRepeat="no-repeat"
            borderRadius={"md"}
            flexDir="column"
            overflow={"hidden"}
            bgSize="cover"
            
        >
            <Flex
                pt={["45px", "45px"]}
                pr={["41px", "41px"]}
                flexDir="row-reverse"
                w="full"
            >
                <Text
                    color="#FDFFE5"
                    fontSize="18px"
                    fontWeight={"400"}
                    maxWidth={["140px", "140px", "400px"]}
                >
                    {gameData?.contest_section?.data?.name}
                </Text>
            </Flex>
            <Spacer></Spacer>
            <SimpleGrid columns={2} spacing={10}>
                <Center >
                        <Box bottom={0} pos="relative"
                    maxH={"200px"} width={"200px"} height={"260px"}>
                <Image  
                    layout="fill"
                    alt="dtl"
                    src={
                        gameData?.icon?.data?.url
                            ? gameData.icon.data.url
                            : "/assets/game-dtl-player.png"
                    }
                />
                </Box>
                </Center>
                <Center>
                <Text 
                    color="#FDFFE5"
                    fontSize={["25px","28px","34px"]}
                    fontWeight={"600"}
                    p={["25px","30px","40px"]}
                    flexWrap={"wrap"}
                    textAlign={"center"}
                >
                    {gameData.name}
                </Text>
                </Center>
            </SimpleGrid>
        </Flex>
    );

    return (
        <Flex direction={["column", "row"]} justifyContent="space-between">
            <Flex
                direction="column"
                width={["90%", "55%", "55%", "40%"]}
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
                width={["100%", "40%", "50%", "50%"]}
                ml={["12px", "32px"]}
                mt={["16px", 0]}
            >
                {gameData?.reward?.data?.description ? (
                    <Flex>
                        <Text
                            fontWeight={600}
                            fontSize={["20px", "36px"]}
                            color="white"
                        >
                            Winning prize
                        </Text>
                        <Text
                            fontWeight={600}
                            fontSize={["20px", "36px"]}
                            ml="10px"
                            color="#d63065"
                        >
                         {gameData?.reward?.data?.description}
                        </Text>
                    </Flex>
                ) : (
                    <Flex>
                        <Text
                            fontWeight={600}
                            fontSize={["20px", "24px", "28px", "36px"]}
                            color="white"
                        >
                            Practice for Free
                        </Text>
                    </Flex>
                )}
                <Text mt="8px" color="white" fontSize="16px" textAlign={"left"}>
                    {gameData?.reward?.data?.description
                        ? "Make your highest score & win cash rewards!"
                        : "Make your highest score"}
                </Text>

                <GameInfoGrid gameData={gameData} />
            </Box>

            {!isTabletOrDesktop && (
                <GameInfoActions
                    gameData={gameData}
                    isTabletOrDesktop={isTabletOrDesktop}
                />
            )}
        </Flex>
    );
};

export default GameInfo;
