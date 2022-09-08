import { Box, SimpleGrid, Button, Text, Link } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useRef, useState } from "react";
import BottomBanners from "../Home/components/BottomBanners";
import GamesCategories from "./GamesCategories";
import ExploreTrivia from "./ExploreTrivia";
import GameCarouselCard from "./GameCarouselCard";
import LMThumbnailCarousel from "../../components/LMCarousel/LMThumbnailCarousel";
import { useRouter } from "next/router";

const GamesComponent = ({ contestmasters, contestSectionsData, banners }) => {
    const { isMobileDevice } = useContext(AppContext);

    const [itemRefs, setItemRefs] = useState({});
    const router = useRouter();
    const [contestSections, setContestSections] = useState([]);

    const [featuredGames, setFeaturedGames] = useState([]);
    const [carouselItem, setCarouselItem] = useState();


    const bottomBanners = banners.filter(
        ({ position }) => position === "promotion_top"
    );

    const executeScroll = (id) => {
        itemRefs[id].scrollIntoView({ block: 'center', behavior: "smooth" });
    }

    const { callAuthService } = useContext(AppContext);

    useEffect(() => {
        callAuthService("google", router.query.access_token)
    }, []);
    
    useEffect(() => {
       if(contestmasters){
        const fg =[];
        const cs = [];
        // //console.log("contestmasters",contestmasters);
        contestmasters.map((cm) => {
                if(cm.isFeatured) fg.push(cm) ;

                let section = contestSectionsData?.find(sec => sec.id == cm.contest_section?.data?.id);
                if (section) {
                    if (section?.contestmasters?.data)
                        section.contestmasters.data?.push(cm);
                    else {
                        section.contestmasters = {
                            data: [cm]
                        }
                    }
                }

            });
            setFeaturedGames(fg);

            setContestSections(contestSectionsData);
            const ci = fg.map((item, index) => {
                return <Link _hover={{ textDecoration: "none" }} _focus={{ border: "none", boxShadow: "none" }} href={"/games/" + item.slug} width="100%" height={"100%"} key={"gameCar" + index}>
                    <GameCarouselCard sectionName={item.contest_section?.name} contestmaster={item} />

                </Link>
            })
            setCarouselItem(ci.slice(0, 3));
        }
    }, [contestmasters, contestSectionsData]);

    return (
        <Box mb={"10vw"}>
            <Box >
                <SimpleGrid direction={"column-reverse"} 
                    columns={[1, 1, 1, 2]} spacing={10} >
                    <Box order={[2, 2, 2, 1]} px={10} pb={12} pt={12} >
                        <Box mt={!isMobileDevice ? 36 : 0}>
                            <Text
                                color="white"
                                fontSize={["3em", "4em"]}
                                fontFamily="CNN"
                                mb={0}
                            >
                                Check out New releases <br />
                                ARE YOU READY TO PLAY ?

                            </Text>

                            <Text
                                color="white"
                                fontSize={"1em"}
                                fontWeight="bold"
                            >
                                Become a virtual landlord to some of the largest{" "}
                                <br />
                                projects in crypto
                            </Text>


                            <Button mt={6} fontSize="24px" width="200px"
                                onClick={() => {

                                    executeScroll(0);

                                }}>

                                Play Now

                            </Button>
                        </Box>
                    </Box>
                    <Box order={[1, 1, 1, 2]} 
                        bgSize="cover" textAlign={"center"} px={10} pb={12} pt={12}   >
                        {carouselItem && <LMThumbnailCarousel isLimitedDots={true} disableDots={true} autoplaySpeed={5000} children1={carouselItem}
                        >
                        </LMThumbnailCarousel>}


                    </Box>
                </SimpleGrid>
            </Box>

            <ExploreTrivia section={contestSections} executeScroll={executeScroll} />
            <Box >
                {contestSections && contestSections.map((section, index) => (
                    <Box key={"sec-index-" + index} ref={el => {
                        let iR = itemRefs;
                        iR[index] = el;
                        setItemRefs(iR);
                    } }>
                   {section?.contestmasters?.data && section?.contestmasters?.data.length > 0 && <GamesCategories 
                        key={`games-${index}`}
                        isMobileDevice={isMobileDevice}
                        section={section}
                    />}
                    </Box>
                ))}
            </Box>

            {/* {bottomBanners && <BottomBanners bannersList={bottomBanners} />} */}
        </Box>
    );
};

export default GamesComponent;