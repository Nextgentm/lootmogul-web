import { Box, Flex, Text } from '@chakra-ui/react'
import React,{useRef} from 'react'
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import InfluencersCard from './InfluencersCategories/InfluencersCard'

const NewInfluencers = ({newInfluencers,LeftArrow,RightArrow}) => {
    const ref = useRef();

    const lazyRoot = useRef(null);
  return (<>
    {newInfluencers?.length && (
        <>
            <Flex
                justify="space-between"
                my={["20px", "40px"]}
                align="center"
                // mb="30px"
                ml={["20px", "20px", "20px", "60px"]}
                mr={["20px", "20px", "20px", "60px"]}
            >
                <Text
                  color="white"
                  fontFamily="Blanch"
                  fontSize={[
                      "4rem",
                      "4rem",
                      "4rem",
                      "5rem",
                      "5rem"
                  ]}
                >
                    NEW IN INFLUENCERS
                </Text>
            </Flex>
            <Box px="3rem">
                <ScrollMenu
                    className="no-scrollbar"
                    apiRef={ref}
                    ref={lazyRoot}
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                    mt={"10px"}
                >
                    {newInfluencers.map((item, index) => (
                        <InfluencersCard
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={item.slug}
                            influencer={item}
                            lazyRoot={lazyRoot}
                            wid={["240px", "320px"]}
                            marginR={["10px", "20px"]}
                        />
                    ))}
                </ScrollMenu>
            </Box>
        </>
    )}
  </>)
}

export default NewInfluencers