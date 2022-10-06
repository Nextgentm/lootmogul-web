import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React,{useRef} from 'react'
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import InfluencersCard from './InfluencersCategories/InfluencersCard'

const NewInfluencers = ({newInfluencers,LeftArrow,RightArrow}) => {
    const ref = useRef();

    const lazyRoot = useRef(null);
  return (<>
    {newInfluencers?.length && (
        <>
                  <Heading mx={[5, 10]} my={10}
                    variant="sectionTitle">
                    NEW IN INFLUENCERS
                </Heading>
            <Box px={7} mt={10}>
                <ScrollMenu
                    className="no-scrollbar"
                    apiRef={ref}
                    ref={lazyRoot}
                    LeftArrow={LeftArrow}
                    RightArrow={RightArrow}
                >
                    {newInfluencers.map((item, index) => (
                        <InfluencersCard
                            itemId={`item-${index}`}
                            key={`item-${index}`}
                            slug={item.slug}
                            influencer={item}
                            lazyRoot={lazyRoot}
                            wid={["79vw","78vw","320px"]}
                            margin={["10px", "10px","20px"]}
                        />
                    ))}
                </ScrollMenu>
            </Box>
        </>
    )}
  </>)
}

export default NewInfluencers