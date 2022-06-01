import { Box, Link, Heading, Avatar, Text, Grid, Image, UnorderedList } from "@chakra-ui/react";
import ScrollToTop from "react-scroll-to-top";
import { ChevronUpIcon } from "@chakra-ui/icons"
import { useContext, useState,useEffect } from "react";
import { AppContext } from "../../utils/AppContext";
import dynamic from 'next/dynamic'
import MyPageLoader from "../../components/MyPageLoader";
import UnOrderedLMLists from "../../components/LMLists/UnOrderedLMLists";
import { useRouter } from "next/router";


import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const LMAlertDialog = dynamic(() => import("../../components/LMAlertDialog"), {
    loading: () =>
        <MyPageLoader />
})
const newMarkDownTheme = {
    p: props => {
        const { children } = props;
        return (
            <Text mb={2} fontFamily="Sora!important" color="white!important" fontSize={'16px'}>
                {children}
            </Text>
        );
    },
};
const AboutUs = ({data, aboutUsData}) => {
    const { isMobileDevice } = useContext(AppContext);
    const mediaURL = process.env.NEXT_PUBLIC_MEDIA_URL;
    const router = useRouter();
    const nerds = [
        { rname: "Raj Rajkotia", nname: "King of all nerds", desg: "Founder, CEO", image: mediaURL+"/aboutus/nerds/Raj.png", link: "https://www.linkedin.com/in/rajkotia/" },
        { rname: "Kuntal Sampat", nname: "Game Shark", desg: "Co-Founder, COO", image: mediaURL+"/aboutus/nerds/Kuntal.png", link: "https://www.linkedin.com/in/kuntalsampat/" },
        { rname: "Harshit Kashiv", nname: "Mr. Get Shit Done", desg: "Growth Marketing", image: mediaURL+"/aboutus/nerds/Harshit.png", link: "https://www.linkedin.com/in/harshitkashiv/" },
        { rname: "Corsley Edwards", nname: "Meta Talent", desg: "Influencer Management", image: mediaURL+"/aboutus/nerds/Corsley-Edwards.png", link: "https://www.linkedin.com/in/corsley-edwards-12925b2a/" },
        { rname: "Vibhu Srivastava", nname: "Mind Crusader", desg: "Community Management", image: mediaURL+"/aboutus/nerds/Vibhu.png", link: "https://www.linkedin.com/in/vibhu-srivastava-a577a127/" }
    ];
    const partners = [
        { name: "Deborah Sawaf", image: mediaURL+"/aboutus/metaverse/deborah.png",logo:mediaURL+"/aboutus/metaverse/Thale-Blanc.png",list:["CEO of Thale Blanc & Power of Words","Worked with legends including Valentino, Gianfranco Ferre and Roberto Cavalli", "Long distance driver of Porsches, Aston Martins and Bentleys","LootMogul NFT sports designer wearables"]},
        { name: "Troy Brazell", image: mediaURL+"/aboutus/metaverse/troy.png",logo:mediaURL+"/aboutus/metaverse/optima-sports-group.png",list:["1.5M+ High-School & College Athletes ","Predictive analytics to increase winning percentage for sports athletes","Partnered with top eSports League / Team incl. Cloud 9 and 350+ USA Colleges","LootMogul NFT sports trading cards"] },
        { name: "Thomas E. Doyle", image: mediaURL+"/aboutus/metaverse/thomas.png",logo:mediaURL+"/aboutus/metaverse/Hoop-Culture.png",list:["USA Top 100 Trail Lawyers","Co-Founder and Commissioner of Premier Basketball League (PBL)","CEO of Hoop Culture Media with 105 Million average monthly social impressions","LootMogul NFT merchandise partner "]},
    ];
    const investors = [
        { name: "Harmony", image: mediaURL+"/aboutus/investors/Harmony.png" , link: "https://www.harmony.one/"},
        { name: "Powerhouse Ventures", image: mediaURL+"/aboutus/investors/Powerhouse-ventures.png" ,link: "https://powerhouseventures.com/"},
        { name: "Bahwan Cybertek", image: mediaURL+"/aboutus/investors/Bahwan-Cybertek.png", link: "https://bahwancybertek.com/home/"},
        { name: "Utopia Mobile", image: mediaURL+"/aboutus/investors/utopia.png" , link: "https://www.u2opiamobile.com/"},
        { name: "Woodstock", image: mediaURL+"/aboutus/investors/woodstock-.png" , link: "https://woodstockfund.com/"},
        { name: "SL2 Capital", image: mediaURL+"/aboutus/investors/SL2.png" , link: "https://sl2.capital/"},
];
   

    const [openAlert, setopenAlert] = useState();
    return (
        <>
            <ScrollToTop smooth viewBox="20px" style={{ backgroundColor: "black" }} component={<ChevronUpIcon boxSize="20px" color="primary" />} />
            <Box
                m="4%"
                mt="2%"
                paddingLeft={["4%", "6%"]}
                paddingRight={["4%", "6%"]}

                color="white"
                background={"#1c1c1c"}
                fontFamily={"Sora"}
                textAlign="justify"
                pb="4%"
            >
                <Heading mt="2%" pt="4%" mb="2%">ABOUT US</Heading>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}  components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{aboutUsData[0]?.details}</ReactMarkdown>
                 <br />
                <br />
                <Heading>Web 3.0 Nerds</Heading>
                <Grid
                    ml="10px"
                    gridRowGap={5}
                    mt="30px"
                    mb="30px"
                    w="100%"
                    templateRows={`repeat(${isMobileDevice ? "3" : "1"}, 1fr)`}
                    templateColumns={`repeat(${isMobileDevice ? "2" : "6"}, 1fr)`}
                >
                    {data?.length>0  && data[0].about_us_profiles.data.map((item, index) => {
                         
                   return     <Link target= "_blank" key={"nerd"+index} _focus={{border:"none", boxShadow:"none"}}href = {item.redirectURL}><Box mt={["5%", "3%"]} href={item.redirectURL} textAlign="center" key={"nerds" + index}>
                            <Avatar background={"#1c1c1c"} borderRadius={0} src={item.profilePic?.data.url} boxSize={["60px", "120px"]} />
                            <Text color="#FFC533" mt={["5%", "3%"]}>{item.tagLine}</Text>
                            <Text mt={["5%", "3%"]}>{item.name}</Text>
                            <Text variant="staticText" mt={["5%", "3%"]}>{item.role}</Text>
                        </Box>
                        </Link>
                    })}
                </Grid>

                <Heading>Current Backers - Brand Ambassadors</Heading>
                <Grid
                    ml="10px"
                    gridRowGap={5}
                    mt="30px"
                    mb="30px"
                    w="100%"
                    templateRows={`repeat(${isMobileDevice ? "6" : "2"}, 1fr)`}
                    templateColumns={`repeat(${isMobileDevice ? "2" : "6"}, 1fr)`}
                >
                    { data?.length>1  && data[1].about_us_profiles.data.map((item, index) => {
                        return <Link _focus={{border:"none", boxShadow:"none"}} target= "_blank" mt={["5%", "3%"]} className="influencerdiv" href={item.slug?"/about-us/ambassadors/"+item.slug:"/"} textAlign="center" key={"backers" + index}>
                            <Avatar  cursor="pointer" src={item.profilePic?.data.url} boxSize={["60px", "120px"]} />
                            <Text mt={["5%", "3%"]}>{item.name}</Text>
                        </Link>
                    })}


                </Grid>
                <Heading>NFT and Metaverse Strategic Business Partners</Heading>
                <Grid
                    ml="10px"
                    gridRowGap={5}
                    mt="30px"
                    mb="30px"
                    w="100%"
                    templateRows={`repeat(${isMobileDevice ? "3" : "1"}, 1fr)`}
                    templateColumns={`repeat(${isMobileDevice ? "1" : "3"}, 1fr)`}
                >
                    {data?.length>2  && data[2].about_us_profiles.data.map((item, index) => {
                        return <Link _hover={{textDecoration:"none"}} _focus={{border:"none", boxShadow:"none"}}href={item.slug?"/about-us/partners/"+item.slug:"/"} target= "_blank" mt={["5%", "3%"]}> <Box className="influencerdiv"  textAlign="center"  key={"partners" + index}>
                            <Avatar src={item.profilePic?.data.url} boxSize={["60px", "120px"]} />
                            <Text mt={["5%", "3%"]}>{item.name}</Text>
                            <Box
       
       display="inline-block"
       mt={["16px",0,0, 0]}
       w="150px"
       h="50px"
       position="relative"
       borderRadius="5px"
       cursor="pointer"
       
       target="_blank"
     >
       <Image alt={`action`} 
                 layout='fill'
                 className="borderRadius" src={item.logo?.data?.url}  objectFit="cover" />
     </Box>
     </Box>
    <UnOrderedLMLists listItems={item.Intro?.map(data=>data.item)}/>

                        </Link>
                    })}


                </Grid>
                <Heading>Investors</Heading>
                <Grid
                    ml="10px"
                    
                    gridRowGap={5}
                    mt="30px"
                    mb="30px"
                    py="3%"
                    px="2%"
                    overflow={"auto"}
                    borderRadius={"10px"}
                    
                    bg="black" 
                    templateRows={`repeat(${isMobileDevice ? "3" : "1"}, 1fr)`}
                    templateColumns={`repeat(${isMobileDevice ? "1" : "6"}, 1fr)`}
                >
                    {data?.length>3  && data[3].about_us_profiles.data.map((item, index) => {
                        return <Link target= "_blank" key={"investor"+index} cursor="pointer"   _focus={{border:"none", boxShadow:"none"}}href = {item.redirectURL}>
                        <Box mt={["5%", "3%"]} className="influencerdiv" textAlign="center" key={"partners" + index}>
                         <Box
       
       display="inline-block"
       mt={["16px",0,0, 0]}
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
                 className="borderRadius" src={item.logo?.data?.url}  objectFit="cover" />
     </Box>
                        </Box> 
                        </Link>
                    })}


                </Grid>

            </Box>
            <LMAlertDialog isOpen={openAlert} onClose={() => setopenAlert(false)} />
        </>
    );
}
export default AboutUs;

