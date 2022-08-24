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
} from '@chakra-ui/react'


const InfluencerSummary = () => {
  const [data, setData] = useState(null);
  const { user } = useContext(AppContext);
  useEffect(async () => {

    const resp = await strapi.request(
      "get",
      "influencersummarries/getSummary",
      {}
    );
    setData(resp)

  }, [user])


  return <Box width="100%" m="auto" textAlign={"center"}>
    {
      data && data.length !== 0 && <><Heading color="primary" my="2%"> Influencer Summary</Heading>
        {
          <TableContainer>
            <Table variant='simple' colorScheme='teal'>
              <TableCaption>Influencer Summary</TableCaption>
              <Thead>
                <Tr>
                  {
                    Object.keys(data).map((key, i) => (
                      <Th style={{color:'white',textAlign:'center'}}>{key.toUpperCase()}</Th>
                    ))
                  }
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  {
                    Object.keys(data).map((key, i) => (
                      <Td style={{color:'white',textAlign:'center'}}>{data[key]}</Td>
                    ))
                  }
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        }
      </>}
    {!data || data.length === 0 && <Heading color="primary" my="2%"> Please Login or Check for relating your account with influencer</Heading>}

  </Box>

};

export default InfluencerSummary;