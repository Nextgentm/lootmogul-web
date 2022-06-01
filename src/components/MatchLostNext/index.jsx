/* eslint-disable react/jsx-key */
import { Flex, Button, Box, Text } from '@chakra-ui/react';
// import Back from "../MatchResultScreens/backIcon";
// import ResultDisplayTitle from "../MatchResultScreens/resultDisplayTitle";
import Profile from '../Profile/profileImage';
import ProfileName from '../Profile/profileName';
import Shapes from "../Polygon/shapes";
import ShapeScore from "../Polygon/shapeScore";

const MatchlostDisplayNext = () => {
    return (
        <Box bgImage="url('/assets/image 132.jpg')"
            bgPosition={["3%", "70%"]}
            bgRepeat="no-repeat" width="100vw">

            {/* <Back /> */}

            <Box m={["", "-2%"]}>
                {/* <ResultDisplayTitle name="MATCH RESULT" /> */}
                <Box mt={["", "-1%"]} ml={["15%", "4.3%"]}>
                    <Profile profileImage="/assets/unsplash_rriAI0nhcbc.jpg" />
                    <Flex ml={["33%", "45.9%"]} mt={["-23.5%", "-5%"]}>
                        <Shapes image="/assets/Polygon 5.png" />
                    </Flex>
                    <Flex ml={["38.3%", "47.1%"]} mt={["-17%", "-4%"]}>
                        <ShapeScore num="19" />
                    </Flex>
                    <Flex ml={["48%", "48.5%", "47%"]} mt={["5%", "-5%", "0.5%"]}>
                        <ProfileName profileName="YOU" />
                    </Flex>
                </Box>

                <Flex ml={["35%", "40%", "44.5%"]} mt={["-1%", "-0.3%", "0.5%"]}>
                    <Text fontFamily="Blanch" text align={"center"} width={["", "167px"]} height={["", "33px"]} fontSize={["20px", "30px"]} text-shadow="0px 4px 10px rgba(0, 0, 0, 0.55)" bgGradient='linear(to-l, #43C8FF, #45E470)'
                        bgClip='text' >Better luck next time! </Text>
                </Flex>
                <Flex justifyContent={"center"} mt={["", "3%"]}  >
                    <Box ml={["", "5%"]} mt={["", ""]}>
                        <Profile profileImage="/assets/unsplash_5aGUyCW_PJw.jpg" />
                        <Flex ml={["39%", "0%"]} mt={["-25%", "-60%"]}>
                            <Shapes image="/assets/Polygon 6.png" />
                        </Flex>
                        <Flex ml={["45%", "13%"]} mt={["-20%", "-45%"]}>
                            <ShapeScore num="37" />
                        </Flex>
                        <Flex ml={["48%", "48.5%", "5%"]} mt={["5%", "-5%", "5%"]}>
                            <ProfileName profileName="JAMES" />
                        </Flex>
                    </Box>

                    <Box ml="5%">
                        <Profile profileImage="/assets/unsplash_3TLl_97HNJo.jpg" />
                        <Flex ml={["39%", "5%"]} mt={["-25%", "-60%"]}>
                            <Shapes image="/assets/Polygon 9.png" />
                        </Flex>
                        <Flex ml={["45%", "19%"]} mt={["-20%", "-45%"]}>
                            <ShapeScore num="34" />
                        </Flex>
                        <Flex ml={["48%", "48.5%", "5%"]} mt={["5%", "-5%", "5%"]}>
                            <ProfileName profileName="CAROLIN" />
                        </Flex>
                    </Box>
                    <Box ml="5%">
                        <Profile profileImage="/assets/unsplash_Z_bTArFy6ks.jpg" />
                        <Flex ml={["39%", "5%"]} mt={["-25%", "-60%"]}>
                            <Shapes image="/assets/Polygon 8.png" />
                        </Flex>
                        <Flex ml={["45%", "19%"]} mt={["-20%", "-45%"]}>
                            <ShapeScore num="21" />
                        </Flex>
                        <Flex ml={["48%", "48.5%", "10%"]} mt={["5%", "-5%", "5%"]}>
                            <ProfileName profileName="EMILY" />
                        </Flex>
                    </Box>
                    <Box ml="5%">
                        <Profile profileImage="/assets/unsplash_mEZ3PoFGs_k.jpg" />
                        <Flex ml={["39%", "5%"]} mt={["-25%", "-60%"]}>
                            <Shapes image="/assets/Polygon 7.png" />
                        </Flex>
                        <Flex ml={["45%", "19%"]} mt={["-20%", "-45%"]}>
                            <ShapeScore num="15" />
                        </Flex>
                        <Flex ml={["48%", "48.5%", "15%"]} mt={["5%", "-5%", "5%"]}>
                            <ProfileName profileName="SARA" />
                        </Flex>
                    </Box>
                </Flex>
                <Flex width={["100%", "50%"]} direction={["column"]} m="auto" mt={["", "-1%"]} padding={"6%"}><Button width={["auto", "auto"]} height="46px" marginTop={["30%", "-5%"]} fontSize={"18px"} >PLAY AGAIN</Button>
                </Flex>
                <Flex>
                    <Text color={"#FFFFFF"} fontFamily="Blanch" fontSize={"22px"} m="auto" ml="48.5%" mt={["auto", "-1.9%", "-5%"]} direction="row">Cancel</Text>
                </Flex>

            </Box>

        </Box >
    );
};
export default MatchlostDisplayNext;