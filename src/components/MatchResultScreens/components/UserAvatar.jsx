import { Box, Avatar, Text } from "@chakra-ui/react";
import { ScoreIcon } from "../../Icons";
const UserAvatar = ({ userResult }) => {
    return (
        <>
            {userResult?.rank === 1 ? (
                <Box
                    pos="relative"
                    m="auto"
                    textAlign={"center"}
                    bgRepeat="no-repeat"
                    bgPosition="center"
                    bgSize="contain"
                    width={["180px", "250px"]}
                    height="150px"
                    backgroundImage={"/assets/crownwin.png"}
                >
                    <Box
                        pos="relative"
                        m="auto"
                        mb="5%"
                        textAlign={"center"}
                        width="100%"
                     >
                        <Avatar
                            boxSize={["60px", "80px"]}
                            name={userResult?.name}
                            src={userResult.profilePic}
                            pos="relative"
                            padding="5px"
                            mt={["30%", "18%"]}
                            border="1px solid #9A9A9A"
                            zIndex="1"
                        ></Avatar>
                        <Box
                            pos="absolute"
                            bottom={["-15%", "-25%"]}
                            left={["40%", "37%"]}
                            zIndex="9"
                        >
                            <ScoreIcon
                                mt="2px"
                                score={userResult?.score}
                                viewBox="0 0 48 48"
                                boxSize={["40px", "60px"]}
                            />
                        </Box>
                    </Box>
                    <Text
                        mt={["12%", "15%"]}
                        fontFamily="Sora"
                        color="white"
                        fontWeight={600}
                        textTransform={"uppercase"}
                        fontSize={["14px!important", "16px!important"]}
                        lineHeight={["18px", "20px"]}
                    >
                        {" "}
                        {userResult?.name}
                    </Text>
                </Box>
            ) : (
                <Box
                    pos="relative"
                    m="auto"
                    textAlign={"center"}
                    width={"120px"}
                    height="150px"
                >
                    <Box
                        pos="relative"
                        m="auto"
                        mb="5%"
                        textAlign={"center"}
                        width="100%"
                    >
                        <Avatar
                            boxSize={["60px", "80px"]}
                            name={userResult?.name}
                            src={userResult.profilePic}
                            pos="relative"
                            padding="5px"
                            border="1px solid #9A9A9A"
                            zIndex="1"
                        ></Avatar>
                        <Box
                            pos="absolute"
                            bottom={["-25%", "-35%"]}
                            left={["35%", "25%"]}
                            zIndex="9"
                        >
                            <ScoreIcon
                                mt="2px"
                                score={userResult?.score}
                                viewBox="0 0 48 48"
                                boxSize={["40px", "60px"]}
                            />
                        </Box>
                    </Box>
                    <Text
                        mt={["15%", "30%"]}
                        fontFamily="Sora"
                        color="white"
                        fontWeight={600}
                        textTransform={"uppercase"}
                        fontSize={["14px!important", "16px!important"]}
                        lineHeight={["18px", "20px"]}
                    >
                        {" "}
                        {userResult?.name}
                    </Text>
                </Box>
            )}
        </>
    );
};
export default UserAvatar;
