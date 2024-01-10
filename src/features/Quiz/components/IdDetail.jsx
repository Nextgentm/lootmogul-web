import {
  Box,
  Text,
  Heading,
  Button,
  Image,
  useMediaQuery,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import moment from "moment";
const IdDetail = ({ roomData }) => {
  const [useIsMedium] = useMediaQuery("(min-width: 778px)");

  return (
    <>
      <Box
        px={{ base: "0", sm: "0", md: "5", lg: "5" }}
        mt={{ base: "0px", sm: "0px", md: "69px", lg: "70px" }}
        justifyContent="center"
        d="flex"
      >
        {useIsMedium ? (
          <Box
            backgroundColor="#223C63"
            pl="12px"
            py="2"
            borderRadius="10px"
            w="100%"
            d="flex"
            justifyContent="center"
          >
            <Table
              variant="unstyled"
              color="white"
              size="sm"
              fontSize="12px"
              height="180px"
            >
              <Tbody>
                <Tr>
                  <Th p="0" variant="idBoldText">
                    <Heading variant="trivial">Trivia Topic</Heading>
                  </Th>
                  <Td p="0" variant="idText">
                    <Button
                      variant="copyBtn"
                      size="sm"
                      mb="0px"
                      onClick={() => {
                        if (navigator?.clipboard?.writeText) {
                          navigator.clipboard.writeText(
                            "Game Id:" +
                              roomData?.id +
                              " - Joined Date &amp; Time:" +
                              roomData?.createdAt
                          );
                        }}
                      }
                    >
                      <Image
                        boxSize="15px"
                        objectFit="fill"
                        src="/assets/images/copyicon.png"
                        m={"0px 6px"}
                        alt=""
                      />
                      <Text fontSize="12px">Copy</Text>
                    </Button>
                  </Td>
                </Tr>

                <Tr>
                  <Th p="0" variant="idBoldText">
                    <Text variant="sideText">
                      {roomData?.contest?.data?.contestmaster?.data?.name}
                    </Text>
                  </Th>
                  <Td p="0" variant="idText"></Td>
                </Tr>
                <Tr>
                  <Th p="0" variant="idBoldText">
                    Total Questions
                  </Th>
                  <Td p="0" variant="idText">
                    :{" "}
                    {
                      roomData?.contest?.data?.contestmaster?.data.quizconfig
                        ?.data.questionCount
                    }
                  </Td>
                </Tr>
                <Tr>
                  <Th p="0" variant="idBoldText">
                    Game Id
                  </Th>
                  <Td p="0" variant="idText">
                    : {roomData?.id}
                  </Td>
                </Tr>
                <Tr>
                  <Th p="0" variant="idBoldText" letterSpacing="0">
                    Joined Date &amp; Time
                  </Th>
                  <Td p="0" variant="idText">
                    :{moment(roomData?.createdAt).format("DD-MM, HH:mm")}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box
            backgroundColor="#223C63"
            py="19px"
            px="8px"
            borderRadius="10px"
            w={["100%", "70%"]}
            d="flex"
            justifyContent="center"
          >
            <Box color="white">
              <Table
                variant="unstyled"
                color="white"
                size="sm"
                fontSize="12px"
                height="60px"
              >
                <Tbody>
                  <Tr>
                    <Th p="0" variant="idBoldText">
                      <Text variant="sideText" fontSize="12px" pl="1">
                        {roomData?.contest?.data?.contestmaster?.data?.name}
                      </Text>
                    </Th>
                    <Td pr="1" variant="idText">
                      <Button
                        variant="copyBtn"
                        size="sm"
                        mb="0px"
                        onClick={() => {
                          if (navigator?.clipboard?.writeText) {
                            navigator.clipboard.writeText(
                              "Game Id:" +
                                roomData?.id +
                                " - Joined Date &amp; Time:" +
                                roomData?.createdAt
                            );
                          }}
                        }
                      >
                        <Image
                          boxSize="15px"
                          objectFit="fill"
                          src="/assets/images/copyicon.png"
                          m={"0px 6px"}
                          alt=""
                        />
                        <Text fontSize="12px">Copy</Text>
                      </Button>
                    </Td>
                  </Tr>

                  <Tr>
                    <Th p="0" variant="idBoldText">
                      Game Id
                    </Th>
                    <Td pr="1" variant="idText">
                      : {roomData?.id}
                    </Td>
                  </Tr>
                  <Tr>
                    <Th p="0" variant="idBoldText" letterSpacing="0">
                      Joined Date &amp; Time
                    </Th>
                    <Td pr="1" variant="idText">
                      :{moment(roomData?.createdAt).format("DD-MM, HH:mm")}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default IdDetail;
