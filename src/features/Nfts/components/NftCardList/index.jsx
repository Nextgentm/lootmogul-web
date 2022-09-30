import { Box, Text, WrapItem, Wrap } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import NftCard from "../NftCard";
import { useContext } from "react";
import { AppContext } from "../../../../utils/AppContext/index";
import {
  LeftArrow,
  RightArrow,
} from "../../../../components/ContentNavigator/arrows";

const NftCardList = ({ data, isSale = true }) => {
  const ref = useRef();
  const lazyRoot = useRef(null);
  const [showAll, setShowAll] = useState(true);

  const { isMobileDevice } = useContext(AppContext);
  return (
    <Box width="100%">
      {data.length === 0 ? (
        <Text fontFamily="Blanch" fontSize={["28px", "58px"]} color="white">
          No Nfts to display..........
        </Text>
      ) : (
        <Box>
          {showAll ? (
            <Wrap m="auto !important">
              {data
                .filter((item) => (isSale ? item.isSale : true))
                .sort((a, b) => a.priority - b.priority)
                .map((item, index) => (
                  <WrapItem m="auto !important" mb="2%!important">
                    <NftCard
                      nft={item}
                      itemId={`nftcard-${index}`}
                      key={`nftcard-${index}`}
                      showInfo={true}
                      lazyRoot={lazyRoot}
                      defaultInView={isMobileDevice ? index < 2 : index < 5}
                    />
                  </WrapItem>
                ))}
            </Wrap>
          ) : (
            <ScrollMenu
              className="no-scrollbar"
              ref={lazyRoot}
              apiRef={ref}
              LeftArrow={LeftArrow}
              RightArrow={RightArrow}
            >
              {data
                .filter((item) => (isSale ? item.isSale : true))
                .sort((a, b) => a.priority - b.priority)
                .map((item, index) => (
                  <NftCard
                    nft={item}
                    itemId={`nftcard-${index}`}
                    key={`nftcard-${index}`}
                    showInfo={true}
                    lazyRoot={lazyRoot}
                    defaultInView={isMobileDevice ? index < 2 : index < 5}
                  />
                ))}
            </ScrollMenu>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NftCardList;
