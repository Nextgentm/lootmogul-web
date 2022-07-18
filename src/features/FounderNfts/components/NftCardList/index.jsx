import { Flex, Box, Text } from "@chakra-ui/react"
import { useRef } from "react"
import ContentNavigator from "../../../../components/ContentNavigator";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "../NftCard";
import { useRouter } from 'next/router';
const NftCardList = ({ data, isSale = true }) => {
    const ref = useRef();
    const router = useRouter();
    return <Box width="100%">
        <Flex width="100%" justifyContent="space-between" alignItems="center" mb="2%">

            <Text fontFamily="Blanch" fontSize={["28px", "58px"]} color="white">
                Popular
            </Text>


            <ContentNavigator
                showArrows={true}
                handleLeftArrowClick={() => ref.current.scrollPrev()}
                handleRightArrowClick={() => ref.current.scrollNext()}
                // onViewAllClicked={() => router.push("/influencers")}
                onViewAllClicked={() => router.push("")}
                showViewAll={false}
            />
        </Flex>

        <Box mt={["5%", "1%"]} ml={["-5%", "1%"]} alignItems="center">
            <ScrollMenu className="no-scrollbar" apiRef={ref}>
                {data.map((item, index) => (

                    <NftCard nft={item} itemId={`nftcard-${index}`} key={`nftcard-${index}`} showInfo={true} />


                ))}
            </ScrollMenu>
        </Box></Box>;
}

export default NftCardList;