import { Box, Flex, Grid, Text, GridItem, Center} from "@chakra-ui/react";
import { nFormatter } from "../../../../utils/utils";
import Image from "next/image";

const GameInfoGrid = ({gameData}) => {
    const gameInfo = [
        {
            label: gameData?.contest_section?.data?.name,
            icon: "games_apt_icon.svg"
        },
        {
            label:  nFormatter(gameData?.ticketsCount, 1) +" players",
            icon: "games_players_icon.svg"
        },
        {
            label: (gameData?.reward?.data?.totalWinners || "1") + ((gameData?.reward?.data?.totalWinners> 1) ? " winners" : " winner"),
            icon: "games_winners_icon.svg"
        },
        {
            label: nFormatter(gameData?.roomsCount, 1) + " Plays"
            ,
            icon: "games_plays_icon.svg"
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
                        <Box pos="relative" width={["48px","48px","60px","60px"]}
                            height={["40px","48px","60px","60px"]}
                            bg="#260e46" 
                            
                            >
                        <Center width={"90%"} height={"90%"}>

                        <Image
                           
                            alt={item.icon}
                            src={`/assets/designupdate1/${item.icon}`}
                            layout='fill'
                        />
                        </Center>
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
