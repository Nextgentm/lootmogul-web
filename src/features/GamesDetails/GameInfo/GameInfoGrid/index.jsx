import { Box, Flex, Grid, Text, GridItem} from "@chakra-ui/react";
import { nFormatter } from "../../../../utils/utils";
import Image from "next/image";

const GameInfoGrid = ({gameData}) => {
    const gameInfo = [
        {
            label: gameData?.contest_section?.data?.name,
            icon: "influencer-tournament.png"
        },
        {
            label:  nFormatter(gameData?.ticketsCount, 1) +" players",
            icon: "players-count.png"
        },
        {
            label: (gameData?.reward?.data?.totalWinners || "1") + ((gameData?.reward?.data?.totalWinners> 1) ? " winners" : " winner"),
            icon: "winner.png"
        },
        {
            label: nFormatter(gameData?.roomsCount, 1) + " Plays"
            ,
            icon: "plays.png"
        }
    ];

    return (
        <Grid
            ml="10px"
            gridColumnGap={"50px"}
            gridRowGap={"35px"}
            mt="30px"
            w="100%"
            templateRows={`repeat(2, 1fr)`}
            templateColumns={`repeat(2, 1fr)`}
        >
            {gameInfo.map((item, index) => (
                <GridItem key={`info-${index}`} colSpan={1}>
                    <Flex align="center">
                        <Box pos="relative" width={["48px","48px","60px","70px"]}
                            height={["40px","48px","60px","70px"]}>
                        <Image
                           
                            alt={item.icon}
                            src={`/assets/${item.icon}`}
                            layout='fill'

                        />
                        </Box>
                        <Text ml="12px" color="#C7C7C7" fontSize={[12,12,14,18]} textAlign={"left"}>
                            {item.label}
                        </Text>
                    </Flex>
                </GridItem>
            ))}
        </Grid>
    );
};

export default GameInfoGrid;
