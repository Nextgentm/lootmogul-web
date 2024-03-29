import {
    Box,
    Flex,
    Grid,
    Text,
    GridItem,
    Center,
    Image
} from "@chakra-ui/react";
import { nFormatter } from "../../../../utils/utils";

const GameInfoGrid = ({ gameData }) => {
    
    const gameInfo = [
        {
            label: gameData?.type == "leaderboard"
                    ? "Leaderboard Skill Game"
                    :"Battle Skill Game",
            icon: "games_apt_icon.svg"
        },
        {
            label:
                gameData?.game?.data?.config?.game == "marketjs"
                    ? nFormatter(gameData?.playCount, 1) + " Plays"
                    : gameData?.type == "leaderboard"
                    ? nFormatter(gameData?.roomsCount, 1)  + " Plays"
                    : nFormatter(gameData?.roomsCount, 1, 'roomsCount')  + " Plays",
            icon: "games_players_icon.svg"
        },
        {
            label:
                (gameData?.reward?.data?.totalWinners || "1") +
                (gameData?.reward?.data?.totalWinners > 1
                    ? " winners"
                    : " winner"),
            icon: "games_winners_icon.svg"
        },
        {
            label:
                gameData?.game?.data?.config?.game == "marketjs"
                    ? nFormatter(gameData?.playerCount, 1) + " Players"
                    : nFormatter(gameData?.ticketsCount, 1) + " Players",
            icon: "games_plays_icon.svg"
        }
    ];

    return (
        <Grid
            pl={["0", "5"]}
            ml={["0px", "0px", "10px"]}
            gridColumnGap={"50px"}
            gridRowGap={"35px"}
            mt="30px"
            w="100%"
            templateRows={`repeat(2, 1fr)`}
            templateColumns={`repeat(2, 1fr)`}
        >
            {gameInfo.map((item, index) => (
                <GridItem key={`info-${index}`} colSpan={1}>
                    <Flex
                        align="center"
                        flexDirection={["column", "column", "row", "row"]}
                    >
                        <Box
                            pos="relative"
                            width={["48px", "48px", "50px", "50px", "60px"]}
                            height={["48px", "48px", "50px", "50px", "60px"]}
                            bg="#260e46"
                        >
                            <Image
                                mx={"auto"}
                                alt={item.icon}
                                src={`/assets/designupdate1/${item.icon}`}
                                BoxSize="auto"
                                mt={["10px"]}
                            />
                        </Box>
                        <Text
                            ml={["0px", "0px", "12px", "12px"]}
                            fontWeight="200"
                            color="#FFF"
                            fontSize={[12, 12, 14, 15]}
                            textAlign={["center", "center", "left", "left"]}
                        >
                            {item.label}
                        </Text>
                    </Flex>
                </GridItem>
            ))}
        </Grid>
    );
};

export default GameInfoGrid;
