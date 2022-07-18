import { useContext } from "react";
import { Text, Tag, TagLabel, Flex, Box, Link } from "@chakra-ui/react";
import Image from "next/image";

import { AppContext } from "../../../../utils/AppContext/index";
import LMMultipleCarousel from "../../../../components/LMCarousel/LMMultipleCarousel"


const AsSeen = () => {
  const bannersList = [
    { url: 'https://www.morningstar.com/news/pr-newswire/20220114io31604/the-lootmogul-sandbox-partnership', Image: '/assets/featured/Morningstar.png' },
    { url: 'https://finance.yahoo.com/news/lootmogul-sandbox-partnership-150000457.html', Image: '/assets/featured/Yahoo Finance.png' },
    { url: 'https://fox8.com/news/business/press-releases/cision/20220114IO31604/the-lootmogul-sandbox-partnership/', Image: '/assets/featured/fox 8.png' },
    { url: 'https://smb.alexcityoutlook.com/article/The-LootMogul-andamp-Sandbox-Partnership?storyId=61e1a5651aadebde261bed9b', Image: '/assets/featured/The Outlook.png' },
    { url: 'https://smb.austindailyherald.com/article/The-LootMogul-andamp-Sandbox-Partnership?storyId=61e1a5651aadebde261bed9b', Image: '/assets/featured/Austin herald.png' },
    { url: 'https://www.marketwatch.com/press-release/the-lootmogul-sandbox-partnership-2022-01-14', Image: '/assets/featured/Market Watch.png' },
    { url: 'https://www.wfla.com/news/business/press-releases/cision/20220114IO31604/the-lootmogul-sandbox-partnership/', Image: '/assets/featured/News Channel 8.png' },
    { url: 'https://www.indiatoday.in/pr-newswire?rkey=20220114EN31604&filter=4315', Image: '/assets/featured/India Today.png' },
    { url: 'https://www.businesstoday.in/prnewswire/?rkey=20220114EN31604&filter=2418', Image: '/assets/featured/business today.png' },
    { url: 'https://www.dsij.in/login?returnurl=%2fnewswiredetails%2ffilename%2f202201140654pr_news_euro_nd__en31604', Image: '/assets/featured/Dalal Street Investmnt Journal.png' },
    { url: 'https://smb.americanpress.com/article/The-LootMogul-andamp-Sandbox-Partnership?storyId=61e1a5651aadebde261bed9b', Image: '/assets/featured/American Press.png' },
    { url: 'https://smb.irontontribune.com/article/The-LootMogul-andamp-Sandbox-Partnership?storyId=61e1a5651aadebde261bed9b', Image: '/assets/featured/Ironton Tribune.png' },
    { url: 'https://www.finanzen.net/nachricht/aktien/the-lootmogul-sandbox-partnership-10927033', Image: '/assets/featured/Finanzen.net.png' },
    { url: 'https://www.businesstoday.in/prnewswire/?rkey=20220114EN31604&filter=2418', Image: '/assets/featured/Business Chief.png' },

  ];
  const { isMobileDevice } = useContext(AppContext);
  const slides = bannersList.map(
    (
      item,
      index
    ) => {
      return <Box key={`bottom-banner-${index}`}>  <Link

        display="inline-block"
        mt={["16px", 0, 0, 0]}
        w="150px"
        h="50px"
        position="relative"
        marginRight={["16px", "30px"]}
        borderRadius="5px"
        cursor="pointer"
        href={item.url}
        target="_blank"
      >
        <Image alt={`action`}
          layout='fill'
          className="borderRadius" src={item.Image} objectFit="cover" />
      </Link>
      </Box>
    }
  )

  return (
    <Flex
      direction={["column", "row"]}
      h={["fit-content", "fit-content"]}
      background={["transparent", "#1c1c1c"]}
      backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
      m={0}
      mt={["40px", "60px"]}
      align={["flext-start", "center"]}
      pt={[0, "20px", "20px", "20px"]}
      pb={[0, "20px", "20px", "20px"]}
      pl={["20px", "20px", "20px", "60px"]}
      pr={["20px", "20px", "20px", "60px"]}
    >
      {isMobileDevice ? (
        <Text flex="0.2" color="white" fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]}>
          As Seen On
        </Text>
      ) : (
        <Text flex="0.2" color="white" lineHeight={"63px"} fontFamily="Blanch" fontSize={["28px", "", "28px", "58px"]}>
          As Seen On
        </Text>
      )}
      <div style={{ flex: isMobileDevice ? 1 : "0.8", whiteSpace: "nowrap", height: "auto", marginTop: "auto", overflowX: "auto", overflowY: "hidden" }}>
        <LMMultipleCarousel disableDots={true} type={"asseen"} slides={slides} />
      </div>


    </Flex>
  );
};

export default AsSeen;
