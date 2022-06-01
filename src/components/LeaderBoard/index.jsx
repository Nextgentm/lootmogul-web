/* eslint-disable react/jsx-key */
import { Box, Text } from "@chakra-ui/layout";
import { Button } from '@chakra-ui/react'

const LeaderBoardScreen = () => {
    return (
        <Box direction={["column", "row"]} maxWidth="100%" minHeight="900px" bgImage="url('/assets/images/image 132.jpg')"
            bgPosition="center"
            bgRepeat="no-repeat">

            
            <Text fontWeight={"600"} textColor="#FFC533" m="auto" padding={"2px"} ml="35%" fontSize={"16px"} lineHeight="20px" letterSpacing={"0.04em"} mt="2%">Play again and improve your rank and win more prize</Text>
            <Button width={"600px"} height="46px" ml="28%" mt="20px" fontSize={"18px"}>REJOIN CONTEST</Button><br />
            <Button variant="outline" fontSize={"18px"} flex="none" order={"0"} width={"600px"} height="46px" ml="28%" mt="20px" flex-grow="0" >VIEW LEADERBOARD</Button>

        </Box >
    );
};
export default LeaderBoardScreen;