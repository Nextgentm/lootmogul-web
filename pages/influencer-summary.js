import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import strapi from "../src/utils/strapi";
import { AppContext } from "../src/utils/AppContext/index";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { DatePicker } from "chakra-ui-date-input";
import { useRouter } from "next/router";

function keyInsertSpaces(string) {
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2");
  if (string.toUpperCase() == "USERS ACQUIRED") {
    string = "users referred";
  }
  return string.toUpperCase();
}

const InfluencerSummary = () => {
  const [data, setData] = useState(null);
  const { user, callAuthService } = useContext(AppContext);
  const router = useRouter();

  useEffect(async () => {
    const resp = await strapi.request(
      "get",
      "influencersummarries/getSummary",
      {}
    );
    const objectOrder = {
      nftsRevenue: null,
      gamesRevenue: null,
      totalRevenue: resp.nftsRevenue + resp.gamesRevenue,
    };
    // const addObjectResource = Object.assign(objectOrder, resp);
    //   delete addObjectResource.id;
    //   setData(addObjectResource);
    if (resp && resp.length !== 0) {
      const addObjectResource = Object.assign(objectOrder, resp);
      delete addObjectResource.id;
      delete addObjectResource.autoComputation;
      setData(addObjectResource);
    } else {
      setData(resp);
    }

  }, [user]);

  useEffect(() => {
    if (!router.isReady) return;
    const access_token = router.query.access_token;
    const provider = router.query.provider;
    if (access_token) {
      if (provider == "facebook") {
        callAuthService("facebook", access_token);
      } else {
        callAuthService("google", access_token);
      }
    }
  }, [router.isReady]);

  return (
    <Box
      width="100%"
      m="auto"
      pb="40px"
      textAlign={"center"}
      bgImage="linear-gradient(to right, 
    #070623, rgba(31, 5, 44, .3)), url(/assets/bg-wave-1.png)"
      bgRepeat="no-repeat"
      bgPosition="right top"
    >
      {data && data.length !== 0 && (
        <>
          {" "}
          <Heading
            color="#fff"
            pt="60px"
            mb="30px"
            fontFamily="Open Sans"
            fontSize="31px"
            fontWeight="bold"
            textTransform="uppercase"
          >
            {" "}
            Influencer / Ambassador Revenue Summary
          </Heading>
          {/* <Box
          mx="30px"
          mb="30px"
          className="influencer-summary-date"
        >
          <Flex
            width="70%"
            margin="0 auto"
            justifyContent="center"
            alignItems="center">
            <Box
              mr="25px"
            >
              <DatePicker
                placeholder='Date Range From'
                name='form_date'
                onChange={(date) => console.log(date)}
                _placeholder={{ color: "#fff", opacity: "1" }}
                color="#fff"
                fontSize="20px"
                fontWeight="500"
                bgColor="rgba(12, 19, 51, .5)"
                bgImage="url('./assets/Calender-icon.svg')"
                bgSize="26px"
                bgRepeat="no-repeat"
                bgPosition="10px center"
                borderColor="#707070"
                borderWidth="2px"
                borderRadius="0"
                p="23px 25px 23px 50px"
              />
            </Box>

            <Box
              mr="25px"
            >
              <DatePicker
                placeholder='Date Range To'
                name='to_date'
                onChange={(date) => console.log(date)}
                _placeholder={{ color: "#fff", opacity: "1" }}
                color="#fff"
                fontSize="20px"
                fontWeight="500"
                bgColor="rgba(12, 19, 51, .5)"
                bgImage="url('./assets/Calender-icon.svg')"
                bgSize="26px"
                bgRepeat="no-repeat"
                bgPosition="10px center"
                borderColor="#707070"
                borderWidth="2px"
                borderRadius="0"
                p="23px 25px 23px 50px"
              />
            </Box>

            <Button
              bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
              filter="drop-shadow(0 0 20px #FF0080)"
              boxShadow="inset 0 0 3px -10px #481A7F"
              width="155px"
              fontSize="21px"
              fontWeight="500"
              p="23px"
            >
              Search
            </Button>
          </Flex>
        </Box> */}
          {
            <TableContainer mx="30px" className="influencer-table-date">
              <Table variant="simple" colorScheme="teal">
                {/* <TableCaption>Influencer Summary</TableCaption> */}
                <Thead bgColor="#250d47">
                  <Tr>
                    {Object.keys(data).map((key, i) => (
                      <Th
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontSize: "17px",
                          fontWeight: "500",
                          borderBottomWidth: "0",
                        }}
                        py="25px"
                        className={key}
                      >
                        {keyInsertSpaces(key)}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody bgColor="#291f3d">
                  <Tr>
                    {Object.keys(data).map((key, i) => (
                      <Td
                        style={{
                          color: "white",
                          textAlign: "center",
                          borderBottomWidth: "0",
                        }}
                        py="20px"
                        className={key}
                      >
                        {data[key]}
                      </Td>
                    ))}
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          }
        </>
      )}
      {!data ||
        (data.length === 0 && (
          <Heading color="primary" my="2%">
            {" "}
            Please Login or Check for relating your account with influencer
          </Heading>
        ))}
    </Box>
  );
};

export default InfluencerSummary;
