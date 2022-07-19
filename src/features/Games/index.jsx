import { Box, SimpleGrid, Button, Text, Link } from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext/index";
import { useContext, useEffect, useRef, useState } from "react";
import BottomBanners from "../Home/components/BottomBanners";
import GamesCategories from "./GamesCategories";
import ExploreTrivia from "./ExploreTrivia";
import GameCarouselCard from "./GameCarouselCard";
import LMThumbnailCarousel from "../../components/LMCarousel/LMThumbnailCarousel";

const GamesComponent = ({ contestmasters, contestSectionsData, banners }) => {
    const { isMobileDevice } = useContext(AppContext);

    const [itemRefs, setItemRefs] = useState({});
    // const router = useRouter();
    const [contestSections, setContestSections] = useState([]);

    const [featuredGames, setFeaturedGames] = useState([]);
    const [carouselItem, setCarouselItem] = useState();


    const bottomBanners = banners.filter(
        ({ position }) => position === "promotion_top"
    );

    const executeScroll = (id) => {
        itemRefs[id].scrollIntoView({ block: 'center', behavior: "smooth" });
    }


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
        <Box>
            <Box bg="#161F2D"  >
                <SimpleGrid direction={"column-reverse"} bg="linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.33) 50.79%, rgba(18, 50, 98, 0) 101.39%);"
                    columns={[1, 1, 1, 2]} spacing={10} >
                    <Box order={[2, 2, 2, 1]} px={10} pb={12} pt={12} >
                        <Box mt={!isMobileDevice ? 36 : 0}>
                            <Text
                                color="white"
                                fontSize="2em"
                                fontFamily="Blanch"
                                mb={0}
                            >
                                Check out  &nbsp;{""}
                                <span style={{ color: "#F8ED1D" }}>
                                    New releases
                                </span>
                            </Text>

                            <Text
                                color="white"
                                fontSize={isMobileDevice ? "3em" : "4em"}
                                fontWeight="bold"
                                textTransform="uppercase"
                                fontFamily="Blanch"
                                lineHeight="52px"
                            >
                                ARE YOU READY TO PLAY ?
                            </Text>



                            <Button mt={6} fontSize="24px" width="250px"
                                onClick={() => {

                                    executeScroll(0);

                                }}>

                                Play Now

                            </Button>
                        </Box>
                    </Box>
                    <Box order={[1, 1, 1, 2]} bg={"linear-gradient(90deg, #101721 0%, rgba(0, 0, 0, 0) 101.39%), url(/assets/gamecarouselbg.png)"}
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

            {bottomBanners && <BottomBanners bannersList={bottomBanners} />}
        </Box>
    );
};

export default GamesComponent;