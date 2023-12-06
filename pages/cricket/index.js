import strapi from "../../src/utils/strapi";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import Banner from "../../src/components/Web3Games/Banner";

import BlockChainGame from "../../src/components/Web3Games/BlockChainGame";
import { Box, Flex, Image, Text, Button, VStack, Link} from '@chakra-ui/react'

import Slider from "react-slick";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../src/utils/AppContext";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../../src/features/Login"));
const LoginForm = dynamic(() => import("../../src/features/LoginForm"));
import { useRouter } from "next/router";

import Slider from "react-slick";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../src/utils/AppContext";
import dynamic from "next/dynamic";
const Login = dynamic(() => import("../../src/features/Login"));
const LoginForm = dynamic(() => import("../../src/features/LoginForm"));
import { useRouter } from "next/router";
const defaultSEOData = {
    metaTitle:"Lootmogul | Join LootMogul Skill Sports Gaming",
    metaDescription:"Immerse yourself in LootMogul's captivating blockchain games, where you'll not only earn valuable in-game rewards but also unlock real-world benefits!",
    canonicalURL:process.env.NEXT_PUBLIC_SITE_URL+"/games"
};

export default function GamesPage({
  data,
  contestSectionsData,
  campaignsSectionsResData,
}) {
  const content =  campaignsSectionsResData?.data[2].trending_contestHighlights;
  const trending_subheader = campaignsSectionsResData?.data[2].trending_subheader;
  return (
    <>
      
      <SEOContainer seoData={defaultSEOData}/> 

         {/*<Banner bannerData={campaignsSectionsResData?.data[2] || []}/>*/}
         <BannerVideo bannerData={campaignsSectionsResData?.data[2] || []} />
         <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            backgroundImage={ "/assets/Banner-2.png" }
            height={["100px", "100px", "300px", "420px"]}
            p="2% 5%"
            backgroundSize="contain"
            backgroundRepeat={"no-repeat"}
            mt={["30px","30px","10px","0px"]}
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "100%"]}
            >
                
            </Box>
        </Flex>
        <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
            pb="0"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "70%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "62px",
                    ]}
                >
                     {campaignsSectionsResData?.data[2].trending_header}
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "28px"]}
                    width={["100%", "100%", "80%"]}
                    className="desc_subheader"
                >
                   <p dangerouslySetInnerHTML={{ __html: trending_subheader }}></p>
                </Text>
                
                
                <Link
                    href={'/wallet'}
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                    
                >
                    <Button
                        bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        filter="drop-shadow(0 0 20px #FF0080)"
                        boxShadow="inset 0 0 0px 0px #481A7F"
                        width="180px"
                        fontSize="21px"
                        fontWeight="500"
                        p="28px"
                        mt="30px"
                        mb="30px"
                        >
                        Deposit Now
                    </Button>
                </Link>
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["90%", "90%", "30%", "30%"]}
            >
                <Link
                    href={'/wallet'}
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                >
                    <VStack>
                        <Flex
                            flexDir={"column"}
                            textAlign="center"
                            bgImage={"/assets/designupdate1/gamecard_portrait.png"}
                            bgPosition="center"
                            bgRepeat="no-repeat"
                            bgSize="100% 100%"
                            cursor="pointer"
                            width={"100%"}
                            height={["330px", "300px", "400px"]}
                        >
                            <Flex
                                m="auto"
                                w="60%"
                                height={["260px", "400px", "300px"]}
                                className="influencerdiv"
                            >
                                <Image
                                    objectFit="contain"
                                    alt="Image"
                                    layout="fill"
                                    w="350px"
                                    src={campaignsSectionsResData?.data[2].trending_gameLogo.data[0].url}
                                />
                            </Flex>
                            
                        </Flex>
                    </VStack>
                </Link>
            </Box>
        </Flex>
        

        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="5%"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "90%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "85px",
                    ]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight="62px"
                >
                   Ready for the India VS South Africa Series?
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "21",
                        "21"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "35px"]}
                    width={["100%", "100%", "100%"]}
                >
                    <p dangerouslySetInnerHTML={{ __html: content }}></p>            
                </Text>
            </Box>
        </Flex>
       
    </Box>
      <BlockChainGame 
          contestSectionsData={contestSectionsData?.data || []}
          contestmasters={data || []}
          blockChainCardData={campaignsSectionsResData?.data[2] || []}
      />
      <Merchandise/>
    </>
  );
}

function BannerVideo({
  bannerData,
  autoplaySpeed = 2000,
  slider_type,
  executeScroll
}){
  const router = useRouter();
  const { isMobileDevice } = useContext(AppContext);
  const [currentSlideIndex, setcurrentSlideIndex] = useState(0);
  const { user } = useContext(AppContext);
  const [isLoginModalActive, setLoginModalActive] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalActive(!isLoginModalActive);
  };

  const OnLoginClose = async () => {
      toggleLoginModal();
  };

  useEffect(() => {
    if(user?.id){
          router.push(bannerData.trending_redirectionUrl );
          setLoginModalActive(false);
      }
  },[user]);
console.log(bannerData.othertrending_redirectionUrl);
console.log('Mobile',isMobileDevice);
  const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
          <Box
              _before={{ content: `""` }}
              className={className}
              onClick={onClick}
          >
              <img
                  src="/assets/designupdate1/arrow-left-selected.png"
                  alt="Left"
              />
          </Box>
      );
  };
  const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
          <Box
              _before={{ content: `""` }}
              className={className}
              onClick={onClick}
          >
              <img
                  src="/assets/designupdate1/arrow-right-selected.png"
                  alt="Right"
              />
          </Box>
      );
  };
  const horizontalSettings = {
      dots: false,
      infinite: true,
      arrows: true,
      cssEase: "linear",
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: autoplaySpeed,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dotsClass: "slick-dots slick-thumb customSlide limited-dots",
      beforeChange: (prev, next) => {
          // here to detect slide change
          setcurrentSlideIndex(next);
      },

      customPaging: (pagi, i) => (
          <Box
              height="5px"
              width={["40px", "90px"]}
              _before={{ width: "100%" }}
              bg={
                  pagi === currentSlideIndex
                      ? "linear-gradient(180deg, #43C8FF 0%, #45E470 100%), #FFFFFF"
                      : "#8E8E8E"
              }
              borderRadius="20px"
              cursor="pointer"
          />
      )
  };


      const imagestyle = {
          margin: "auto",
          width: "100%",
      };

      const cricketImageStyle = {
          margin: "auto",
          width: "100%"
      };

      return <Slider {...horizontalSettings}>
      <div className="gameslide">
      {!isMobileDevice &&
          <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
          poster="/assets/product/CricketBanner_CSA_mobile.jpg">
              <source
              src={bannerData.othertrending_header}
              type="video/mp4"
              />
          </video>
      }
      {isMobileDevice &&
           <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
          poster="/assets/product/CricketBanner_CSA_mobile.jpg">
              <source
              src={bannerData.othertrending_redirectionUrl}
              type="video/mp4"
              />
          </video>
      }

          <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            height={["auto","auto","700px"]}
            p="2% 5%"
            backgroundSize="cover"
            className="banner-read-thumb-lg"
        >
          <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "75%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    width={["100%", "100%", "100%", "60%"]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "65px",
                    ]}
                >
                    {bannerData.banner_header}
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "15",
                        "15",
                        "15",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["20px", "20px", "28px"]}
                    width={["100%", "100%", "60%"]}
                >
                    {bannerData.banner_subheader}
                </Text>
                {!user && isMobileDevice && (
                    <>
                        <Button
                            mt="18px"
                            fontFamily="Sora !important "
                            fontWeight="500"
                            onClick={() => toggleLoginModal()}
                            padding={[
                                "0px 30px",
                                "0px 36px",
                                "20px 50px"
                            ]}
                            boxShadow="inset 0 0 0px 0px #481A7F"
                            fontSize="15px"
                            height={["39px", "39px", "35px", "35px"]}
                            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            filter="drop-shadow(0 0 20px #FF0080)"
                            p="28px"
                            width="180px"
                        >
                            Signup
                        </Button>
                    </>
                )}
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["100%", "100%", "100%", "30%"]}
            >
                <Box> 
                    {!isMobileDevice ?
                    <>
                    {!user?.id && <LoginForm
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> :
                    <>
                    {!user?.id && <Login
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> }                

                </Box>
            </Box>
          </Flex>
      </div>

  </Slider>;
};

function Merchandise(){

    const horizontalSettings = {
      dots: true,
      infinite: true,
      arrows: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
          {
              breakpoint: 1024,
              settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
              }
          },
          {
              breakpoint: 600,
              settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
              }
          },
          {
              breakpoint: 480,
              settings: {
              slidesToShow: 1,
              slidesToScroll: 1
              }
          }
      ]
  };
  return(
    <>
      <Box>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p={[
                "2% 2%",
                "2% 2%",
                "2% 5%",
            ]}
        >
          <Box
              px={[5,5,10]}
              width={["100%", "100%", "100%", "100%"]}
          >
                <Text
                  variant="headText"
                  fontSize={[
                      "52px",
                      "52px",
                      "85px",
                  ]}
                  textShadow="0px 0px 10px #00034E94;"
                  fontFamily="var(--chakra-fonts-Blanch)"
                  lineHeight={[
                      "42px",
                      "42px",
                      "65px",
                  ]}
                  textAlign="center"
                  mb="1%"
                  pb="0"
              >
                  Explore Exclusive Merchandise
              </Text>
          </Box>
        </Flex>
        <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            p="2% 5%"
            pb="0"
        >
            <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "40%"]}
            >
                
                <Text
                    color="white"
                    fontSize={[
                        "18",
                        "18",
                        "18",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["28px", "28px", "28px"]}
                    width={["100%", "100%", "80%"]}
                    className="desc_subheader"
                >
                   Shop from the authentic range of your favorite Cricket Merchandise. We offer worldwide shipping on all orders. 
                </Text>
                {/**<Link
                    href={'/'}
                    _hover={{ border: "none", textDecoration: "none" }}
                    _focus={{ border: "none", textDecoration: "none" }}
                    key={`igc-1`}
                    
                >
                    <Button
                        bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        filter="drop-shadow(0 0 20px #FF0080)"
                        boxShadow="inset 0 0 0px 0px #481A7F"
                        width="180px"
                        fontSize="21px"
                        fontWeight="500"
                        p="28px"
                        mt="30px"
                        mb="30px"
                        >
                        Explore Now
                    </Button>
                </Link> */}
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["90%", "90%", "70%", "60%"]}
                className="productcsa"
            >
                 <Slider {...horizontalSettings}>
                 <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/"}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                        >
                            <VStack>
                                <Flex
                                    flexDir={"column"}
                                    textAlign="center"
                                    bgImage={"/assets/related_bg.png"}
                                    bgPosition="center"
                                    bgRepeat="no-repeat"
                                    bgSize="100% 100%"
                                    cursor="pointer"
                                    width={"100%"}
                                    height={["250px", "250px", "300px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "150px"]}
                                            src={"/assets/product/CG.webp"}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack>
                            {/*
                            <Flex>
                                <Text
                                    mt={"5px"}
                                    ml={"5px"}
                                    color="#FDFFE5"
                                    fontSize={["15px"]}
                                    fontWeight={"600"}
                                    align={"left"}
                                    textOverflow="ellipsis"
                                    overflow="visible"
                                    height={["45px","45px","45px","45px","45px","auto"]}
                                    lineHeight={["24px"]}
                                >
                                    Images
                                </Text>
                            </Flex> */}
                            
                            <Flex>
                           
                                <Button
                                    variant="solid"
                                    h={["45px", "40px"]}
                                    fontSize={["12px","12px","14px"]}
                                    lineHeight={["10px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="5px"
                                    fontWeight="400"
                                    m={"auto"}
                                >
                                    Coming Soon
                                </Button>
                            </Flex>
                        </Link>
                    </Box>
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/"}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                        >
                            <VStack>
                                <Flex
                                    flexDir={"column"}
                                    textAlign="center"
                                    bgImage={"/assets/related_bg.png"}
                                    bgPosition="center"
                                    bgRepeat="no-repeat"
                                    bgSize="100% 100%"
                                    cursor="pointer"
                                    width={"100%"}
                                    height={["250px", "250px", "300px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "300px"]}
                                            src={"/assets/product/Bat.webp"}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack>                           
                            <Flex>
                           
                                <Button
                                    variant="solid"
                                    h={["45px", "40px"]}
                                    fontSize={["12px","12px","14px"]}
                                    lineHeight={["10px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="5px"
                                    fontWeight="400"
                                    m={"auto"}
                                >
                                    Coming Soon
                                </Button>
                            </Flex>
                        </Link>
                    </Box>
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/"}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                        >
                            <VStack>
                                <Flex
                                    flexDir={"column"}
                                    textAlign="center"
                                    bgImage={"/assets/related_bg.png"}
                                    bgPosition="center"
                                    bgRepeat="no-repeat"
                                    bgSize="100% 100%"
                                    cursor="pointer"
                                    width={"100%"}
                                    height={["250px", "250px", "300px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "150px"]}
                                            src={"/assets/product/Glov.png"}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack>
                            <Flex>
                           
                                <Button
                                    variant="solid"
                                    h={["45px", "40px"]}
                                    fontSize={["12px","12px","14px"]}
                                    lineHeight={["10px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="5px"
                                    fontWeight="400"
                                    m={"auto"}
                                >
                                    Coming Soon
                                </Button>
                            </Flex>
                        </Link>
                    </Box>
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/"}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                        >
                            <VStack>
                                <Flex
                                    flexDir={"column"}
                                    textAlign="center"
                                    bgImage={"/assets/related_bg.png"}
                                    bgPosition="center"
                                    bgRepeat="no-repeat"
                                    bgSize="100% 100%"
                                    cursor="pointer"
                                    width={"100%"}
                                    height={["250px", "250px", "300px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "150px"]}
                                            src={"/assets/product/Shoes.png"}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack>
                            <Flex>
                           
                                <Button
                                    variant="solid"
                                    h={["45px", "40px"]}
                                    fontSize={["12px","12px","14px"]}
                                    lineHeight={["10px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="5px"
                                    fontWeight="400"
                                    m={"auto"}
                                >
                                    Coming Soon
                                </Button>
                            </Flex>
                        </Link>
                    </Box>
                    <Box
                        bgSize="cover"
                        textAlign={"center"}
                        px={[5, 5, 5, 5]}
                        pb={[5, 5, 5, 12]}
                        mt={[10, 10, 5, 0]}
                    >
                        <Link
                           href={"/games/"}
                            _hover={{ border: "none", textDecoration: "none" }}
                            _focus={{ border: "none", textDecoration: "none" }}
                        >
                            <VStack>
                                <Flex
                                    flexDir={"column"}
                                    textAlign="center"
                                    bgImage={"/assets/related_bg.png"}
                                    bgPosition="center"
                                    bgRepeat="no-repeat"
                                    bgSize="100% 100%"
                                    cursor="pointer"
                                    width={"100%"}
                                    height={["250px", "250px", "300px"]}
                                >
                                    <Flex
                                        m="auto"
                                        w="60%"
                                        height={["250px", "250px", "150px"]}
                                        className="influencerdiv"
                                    >
                                        <Image
                                            objectFit="contain"
                                            alt="Image"
                                            layout="fill"
                                            w={["250px", "250px", "150px"]}
                                            src={"/assets/product/2.png"}
                                        />
                                        
                                    </Flex>
                                    
                                </Flex>
                            </VStack> 
                            <Flex>
                           
                                <Button
                                    variant="solid"
                                    h={["45px", "40px"]}
                                    fontSize={["12px","12px","14px"]}
                                    lineHeight={["10px"]}
                                    mt="12px"
                                    textTransform="uppercase"
                                    _hover={{ textDecoration: "none !important" }}
                                    w="95%"
                                    p="5px"
                                    fontWeight="400"
                                    m={"auto"}
                                >
                                    Coming Soon
                                </Button>
                            </Flex>
                        </Link>
                    </Box>
                  </Slider>
            </Box>
        </Flex>
      </Box>
    </>
  );
}

function BannerVideo({
  bannerData,
  autoplaySpeed = 2000,
  slider_type,
  executeScroll
}){
  const router = useRouter();
  const { isMobileDevice } = useContext(AppContext);
  const [currentSlideIndex, setcurrentSlideIndex] = useState(0);
  const { user } = useContext(AppContext);
  const [isLoginModalActive, setLoginModalActive] = useState(false);
  
  const toggleLoginModal = () => {
    setLoginModalActive(!isLoginModalActive);
  };

  const OnLoginClose = async () => {
      toggleLoginModal();
  };

  useEffect(() => {
    if(user?.id){
          router.push(bannerData.trending_redirectionUrl );
          setLoginModalActive(false);
      }
  },[user]);

  const PrevArrow = (props) => {
      const { className, style, onClick } = props;
      return (
          <Box
              _before={{ content: `""` }}
              className={className}
              onClick={onClick}
          >
              <img
                  src="/assets/designupdate1/arrow-left-selected.png"
                  alt="Left"
              />
          </Box>
      );
  };
  const NextArrow = (props) => {
      const { className, style, onClick } = props;
      return (
          <Box
              _before={{ content: `""` }}
              className={className}
              onClick={onClick}
          >
              <img
                  src="/assets/designupdate1/arrow-right-selected.png"
                  alt="Right"
              />
          </Box>
      );
  };
  const horizontalSettings = {
      dots: false,
      infinite: true,
      arrows: true,
      cssEase: "linear",
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: autoplaySpeed,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      dotsClass: "slick-dots slick-thumb customSlide limited-dots",
      beforeChange: (prev, next) => {
          // here to detect slide change
          setcurrentSlideIndex(next);
      },

      customPaging: (pagi, i) => (
          <Box
              height="5px"
              width={["40px", "90px"]}
              _before={{ width: "100%" }}
              bg={
                  pagi === currentSlideIndex
                      ? "linear-gradient(180deg, #43C8FF 0%, #45E470 100%), #FFFFFF"
                      : "#8E8E8E"
              }
              borderRadius="20px"
              cursor="pointer"
          />
      )
  };


      const imagestyle = {
          margin: "auto",
          width: "100%",
      };
    
      const cricketImageStyle = {
          margin: "auto",
          width: "100%"
      };

      return <Slider {...horizontalSettings}>
      <div className="gameslide">
      {!isMobileDevice ?
          <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
          poster="/assets/videos/GamePosterImage.png">
              <source
              src={bannerData.othertrending_header}
              type="video/mp4"
              />
          </video>
          : <video style={{ "width": "100%" }} autoPlay muted loop controlsList="nofullscreen nodownload noremoteplayback noplaybackrate foobar" 
          poster="/assets/videos/GamePosterImageMobile.png">
              <source
              src={bannerData.othertrending_redirectionUrl}
              type="video/mp4"
              />
          </video>
      }
          
          <Flex
            flexDir={["column", "column", "column", "row"]}
            w="100%"
            alignItems={"center"}
            height="700px"
            p="2% 5%"
            backgroundSize="cover"
            className="banner-read-thumb-lg"
        >
          <Box
                px={[5,5,10]}
                width={["100%", "100%", "100%", "75%"]}
            >
                <Text
                    variant="headText"
                    fontSize={[
                        "52px",
                        "52px",
                        "80px",
                    ]}
                    width={["100%", "100%", "100%", "60%"]}
                    textShadow="0px 0px 10px #00034E94;"
                    fontFamily="var(--chakra-fonts-Blanch)"
                    lineHeight={[
                        "42px",
                        "42px",
                        "65px",
                    ]}
                >
                    {bannerData.banner_header}
                </Text>

                <Text
                    color="white"
                    fontSize={[
                        "15",
                        "15",
                        "15",
                        "18",
                        "18"
                    ]}
                    mt="20px"
                    fontFamily="Sora"
                    fontWeight="normal"
                    lineHeight={["20px", "20px", "28px"]}
                    width={["100%", "100%", "60%"]}
                >
                    {bannerData.banner_subheader}
                </Text>
                {!user && isMobileDevice && (
                    <>
                        <Button
                            mt="18px"
                            fontFamily="Sora !important "
                            fontWeight="500"
                            onClick={() => toggleLoginModal()}
                            padding={[
                                "0px 30px",
                                "0px 36px",
                                "20px 50px"
                            ]}
                            boxShadow="inset 0 0 0px 0px #481A7F"
                            fontSize="15px"
                            height={["39px", "39px", "35px", "35px"]}
                            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                            filter="drop-shadow(0 0 20px #FF0080)"
                            p="28px"
                            width="180px"
                        >
                            Signup
                        </Button>
                    </>
                )}
            </Box>
            <Box
                bgSize="cover"
                textAlign={"center"}
                px={[0, 0, 0, 10]}
                pb={[0, 0, 0, 12]}
                width={["100%", "100%", "100%", "30%"]}
            >
                <Box> 
                    {!isMobileDevice ?
                    <>
                    {!user?.id && <LoginForm
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> :
                    <>
                    {!user?.id && <Login
                        isOpen={isLoginModalActive}
                        OnLoginClose={OnLoginClose}
                        redirectUrl={bannerData.trending_redirectionUrl}
                    />
                    }
                    </> }                
                    
                </Box>
            </Box>
          </Flex>
      </div>
     
  </Slider>;
};

export async function getStaticProps() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("contestmasters", {
      fields: ["name", "slug", "priority", "gamecampaignpriority", "entryFee", "isFeatured", "retries"],
      sort: "priority",
      populate: {
        contest_section: {
          fields: ["name", "slug"],
        },
        icon: {
          fields: ["name", "url"],
        },
        feeWallet: {
          populate: {
            currency: {
              fields: ["type"],
            },
          },
        },
        reward: {},
        game:{
          fields:"*"
        }
      },

      pagination: {
        page: pageNo,
        pageSize: 25,
      },
    });
    if (res?.meta) {
      data.push(res.data);
      if (pageCount == 1) {
        pageCount = res.meta.pagination.pageCount;
      }
    }
    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  data = data.flat();

  try {
    const contestSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/contest-sections?populate=image&sort=priority"
    );

    
    const campaignsSectionsRes = await fetch(
      process.env.NEXT_PUBLIC_STRAPI_API_URL +
        "/api/game-campaigns?populate=*&sort=id"
    );
    const contestSectionsData = await contestSectionsRes.json();
    const campaignsSectionsResData = await campaignsSectionsRes.json();

    return {
      props: { data, contestSectionsData, campaignsSectionsResData },
      revalidate: 300,
    };
  } catch (error) {}
  return {
    props: { data },
    revalidate: 300, // In seconds
  };
}
