import SEOContainer from "../../src/features/SEOContainer";
import Banner from "../../src/components/Web3Games/Banner";
import { Box, Flex, Image, Text, Button, VStack, Link, useMediaQuery } from '@chakra-ui/react'


import React, { useRef, useContext, useState, useEffect } from "react";





const defaultSEOData = {
    metaTitle: "Lootmogul | DSG Durban Cricket Stadium",
    metaDescription: "Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL: process.env.NEXT_PUBLIC_SITE_URL + "/games"
};

export default function GamesPage({campaignsSectionsResData}) {
    
    const trending_subheader = campaignsSectionsResData?.data[3].trending_subheader;
    return (
        <>

            <SEOContainer seoData={defaultSEOData} />

            <Banner customClass="dsg_cricket" bannerData={campaignsSectionsResData?.data[3] || []}/>
            
            <Box>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p={["10% 0%", "10% 0%", "2% 5%"]}
                //pb="0"
                >
                    <Box
                        px={[5, 5, 10]}
                        width={["100%", "100%", "100%", "100%", "80%"]}
                        margin={"auto"}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "42px",
                                "42px",
                                "62px",
                            ]}
                            textAlign={"center"}
                        >
                             {campaignsSectionsResData?.data[3].trending_header}
                        </Text>

                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "18",
                                "18"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["22px","22px","22px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"center"}
                        >
                             <p dangerouslySetInnerHTML={{ __html: trending_subheader }}></p>
                        </Text>  
                    </Box>
                </Flex>
            </Box>
            

            <Box>
                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p={["10% 0%", "0% 0%", "2% 5%"]}
                    pb="0"
                >
                    <Box
                        px={[5, 5, 10]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "42px",
                                "42px",
                                "62px",
                            ]}
                            textAlign={"center"}
                        >
                            {campaignsSectionsResData?.data[3].trending_contestHighlights}
                        </Text>
                    </Box>
                </Flex>
                <Flex
                    flexDir={["column","column", "column", "row", "row"]}
                    w={["100%", "100%", "50%", "98%", "82%"]}
                    alignItems={"left"}
                    p={["10% 0%", "10% 0%", "0% 0%"]}
                    margin={"auto"}
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/04/19035332/game_section_thumbnail_2.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            META GAMING ARCADE
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            Meta Game Arcade allows sports fans and athletes to experience the future of gaming and sports. Members can play mini-ambassador blockchain games within the Meta stadium and also win exciting rewards
                        </Text>
                        <Link
                            href={'#'}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                                Coming Soon
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://metaverse.lootmogul.com/wp-content/uploads/2022/09/Hoopculture_outlet_2.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            META STADIUM SHOPS
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            Visitors and members can explore the web3 e-commerce stores and meta shops and purchase their favorite apparel from elite sports brands within the stadium. They can get their favorite items delivered In Real Life.
                        </Text>
                        <Link
                           href={campaignsSectionsResData?.data[3].othertrending_redirectionUrl}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                               Buy Now
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/12/11022506/Side_8-min-min-1.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            META EXTERNAL BRAND SPACE
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            The Meta External Brand Spaces are located outside, in exterior parts of the stadium. These spaces are highly effective in attracting global audiences to your brand, and making an overall appeal to your target audience.
                        </Text>
                        <Link
                            href={campaignsSectionsResData?.data[3].othertrending_header}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                               Buy Now
                            </Button>
                        </Link>
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://metaverse.lootmogul.com/wp-content/uploads/2022/09/STADIUM-SEAT-NFTs.png"
                            alt="Left"
                            width={300}
                            height={210}
                        />
                        <Text
                            variant="headText"
                            fontSize={[
                                "32px",
                                "40px",
                                "46px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight={[
                                "28px",
                                "30px",
                                "37px",
                            ]}
                            textAlign={"left"}
                            minHeight={["40px","40px","90px"]}
                            pt="15px"
                        >
                            META STADIUM SEATS
                        </Text>
                        <Text
                            color="white"
                            fontSize={[
                                "14",
                                "14",
                                "14",
                                "16",
                                "16"
                            ]}
                            mt="20px"
                            fontFamily="Sora"
                            fontWeight="normal"
                            lineHeight={["28px", "28px", "28px"]}
                            width={["100%", "100%", "100%"]}
                            className="desc_subheader"
                            textAlign={"left"}
                            minHeight={"170px"}
                        >
                            The community members can choose their preferred seats at the LootMogul Metaverse Stadium. One can also add a touch of personalization by customizing the chosen seat with their own avatar or picture.
                        </Text>
                        <Link
                            href={'https://www.ticketpros.co.za/portal/web/index.php/season?account_id=c6c9db44-9ab4-79bf-17f6-637688686b55'}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                            key={`igc-1`}
                            target="_blank"
                            
                        >
                            <Button
                                bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                                //filter="drop-shadow(0 0 20px #FF0080)"
                                boxShadow="inset 0 0 0px 0px #481A7F"
                                width="90%"
                                fontSize="18px"
                                fontWeight="400"
                                p="28px"
                                mt="30px"
                                mb="30px"
                                >
                                Buy Now
                            </Button>
                        </Link>
                    </Box>
                </Flex>

                <Flex
                    flexDir={["column", "column", "column", "row"]}
                    w="100%"
                    alignItems={"center"}
                    p="5% 0% 3% 0%"
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%", "100%"]}
                    >
                        <Text
                            variant="headText"
                            fontSize={[
                                "38px",
                                "38px",
                                "52px",
                                "80px",
                                "80px",
                            ]}
                            textShadow="0px 0px 10px #00034E94;"
                            fontFamily="var(--chakra-fonts-Blanch)"
                            lineHeight="62px"
                            textAlign={"center"}
                        >
                            METAVERSE STADIUM GALLERY
                        </Text>
                    </Box>
                </Flex>

                <Flex
                    flexDir={["column", "column", "row", "row"]}
                    w={["100%", "100%", "100%", "100%", "82%"]}
                    alignItems={"left"}
                    p={["10% 0%", "10% 0%", "0% 2%"]}
                    margin={"auto"}
                    mb="5%"
                >
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/12/11023334/Gallery_Image1-min.jpg"
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"20px 0 0 20px"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/12/11023345/Gallery_Image2-min.jpg"
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"20px"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                    <Box
                        px={[5, 5, 5]}
                        width={["100%", "100%", "100%", "100%"]}
                    >
                        <Image
                            src="https://lootmogul-wp-cdn-buckets.s3.us-west-2.amazonaws.com/wp-content/uploads/2023/12/11023347/Gallery_Image3-min.jpg"
                            alt="Left"
                            width={410}
                            height={480}
                            borderRadius={"0 20px 20px 0"}
                            boxShadow={"0px 4px 30px -4px #481a7f"}
                            mb={["5%","5%","5%","0%","0%"]}
                        />
                     
                    </Box>
                </Flex>
            </Box>

        </>
    );
}

export async function getStaticProps() {
    try {
        const campaignsSectionsRes = await fetch(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
            "/api/game-campaigns?populate=*&sort=id"
        );
        
        const campaignsSectionsResData = await campaignsSectionsRes.json();

        return {
            props: { campaignsSectionsResData },
            revalidate: 300,
        };
    } catch (error) { }
    return {
        props: { campaignsSectionsResData },
        revalidate: 300, // In seconds
    };
}
