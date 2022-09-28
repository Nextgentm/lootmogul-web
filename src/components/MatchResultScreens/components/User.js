import { Box, Flex, Text, Avatar, Image } from "@chakra-ui/react";
import { ScoreIcon } from "../../Icons";

const User = ({ userResult }) => {
    return (
        <>
            <Box>
                <Flex alignItems="center" flexDirection="column">
                    <Text
                        color="#F8ED1D"
                        fontFamily="Blanch"
                        fontSize="54px"
                        lineHeight={"59px"}
                    >
                        MATCH RESULT
                    </Text>

                    <Flex
                        alignItems="center"
                        flexDirection="column"
                        pos="relative"
                        my="16px"
                    >
                        <Avatar
                            size="lg"
                            name={userResult.name}
                            src={userResult.profilePic}
                            pos="relative"
                            border="3px solid #ffff"
                            backgroundImage="linear-gradient(to left, #743ad5, #d53a9d)"
                            zIndex="1"
                        >
                            <ScoreIcon
                                mt="2px"
                                viewBox="0 0 48 48"
                                boxSize={"50px"}
                                score={userResult.score}
                                pos="absolute"
                                bottom={{
                                    base: "-25px",
                                    sm: "-25px",
                                    md: "-24px",
                                    lg: "-24px"
                                }}
                                left={{
                                    base: "2px",
                                    sm: "2px",
                                    md: "2px",
                                    lg: "2px"
                                }}
                            />
                        </Avatar>

                        <Flex
                            flexDirection={{
                                base: "column",
                                sm: "column",
                                md: "column",
                                lg: "column"
                            }}
                            pos="relative"
                            my="16px"
                            textAlign="center"
                            zIndex="1"
                            justifyContent="space-between"
                        >
                            <Text
                                my="5%"
                                variant="playerName"
                                fontSize="15px"
                                fontFamily="Sora"
                                fontWeight="600"
                            >
                                You
                            </Text>
                            <Box pos="relative">
                                <Text
                                    variant="winText"
                                    fontSize={{
                                        base: "36px",
                                        sm: "36px",
                                        md: "54px",
                                        lg: "54px"
                                    }}
                                >
                                    {userResult?.reward}
                                </Text>
                            </Box>
                        </Flex>
                    </Flex>
                    {userResult?.rank == 1 ? (
                        <Image
                            src="/assets/crownwin.png"
                            layout="fill"
                            alt="win"
                            width="auto"
                            pos="relative"
                            boxSize="140px"
                            bottom={["188px", "188px", "216px"]}
                        />
                    ) : (
                        ""
                    )}
                </Flex>
            </Box>
        </>
    );
};
export default User;
