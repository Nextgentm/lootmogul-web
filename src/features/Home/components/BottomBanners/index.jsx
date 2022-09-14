import { useContext } from "react";
import { Text, Flex, Box, Link } from "@chakra-ui/react";
import Image from "next/image";
import { AppContext } from "../../../../utils/AppContext/index";
import { getStrapiMedia } from "../../../../utils/medias";
import { useRouter } from "next/router";
import LMMultipleCarousel from "../../../../components/LMCarousel/LMMultipleCarousel"


const BottomBanners = ({ bannersList }) => {
  const { isMobileDevice } = useContext(AppContext);

  const router = useRouter();
  const slides = bannersList.map(
    (
      {
        bannerImage: { data }
      },
      index
    ) => {
      return <Box width="100%" key={`bottom-banner-${index}`}><Link pos="relative" onClick={() => {

        router.push("/promotions/" + bannersList[index].slug)
      }
      }


        display="inline-block"
        mt={["16px", 0, 0, 0]}
        w={"870px"}
        h="225px"
        position="relative"
        marginRight={["16px", "30px"]}
        cursor={"pointer"}
        borderRadius="8px"
      >
        <Image
          alt={`action`} layout="fill" className="borderRadius"
          src={getStrapiMedia(data[0].url)} />
        {bannersList[index]?.overlay === "live" && (
          <Image
            pos="absolute"
            alt={`action`}
            width={"870px"}
            height="225px"
            src={"/assets/livebanner.webp"}
          />
        )}
        {bannersList[index]?.overlay === "expired" && (
          <Image
            pos="absolute"
            alt={`action`}
            width={"870px"}
            height="225px"
            src={"/assets/completedbanner.webp"}
          />
        )}
      </Link>

      </Box>
    }
  )

  return (
    <Box
      // direction={["column", "row"]}
      // h={["fit-content", "fit-content"]}
      // background={["transparent", "#1c1c1c"]}
      // backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
      // m={0}
      // mt={["20px", "35px"]}
      // // align={["flext-start", "center"]}
      // pt={[0, "20px", "20px", "20px"]}
      // pb={[0, "20px", "20px", "20px"]}
      // pl={["20px", "20px", "20px", "60px"]}
      // pr={["20px", "20px", "20px", "60px"]}
    >
    
       <Text
                    variant="secHeadText"
                    fontSize={["25px", "35px"]}
                    my="50px"
         
          >  NEW OFFERS & PROMOTIONS</Text>

      <Box w="100%" px="29px">
      <div style={{ whiteSpace: "nowrap", overflow: "auto", width: "100%" }}>

<LMMultipleCarousel disableDots={true} type={"featured"} slides={slides} />
</div>
      </Box>
    </Box>
  );
};

export default BottomBanners;
