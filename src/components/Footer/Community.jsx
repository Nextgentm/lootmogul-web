import React from 'react'
import { Flex, Box, Text, Link,  Image, Icon} from "@chakra-ui/react";
import { FaDiscord, FaTelegramPlane,FaTwitter,FaInstagram,FaFacebookF,FaYoutube } from 'react-icons/fa'
import { SiMedium } from "react-icons/si";

const socialLinks = [
    {
        Image: FaDiscord,
        link: "https://discord.gg/mHUqAm8fsh"
    },
    {
        Image: FaTelegramPlane,
        link: "https://t.me/LootMogulcommunitychat"
    },
    {
        Image: FaTwitter,
        link: "https://twitter.com/LootMogul"
    },
    {
        Image: FaInstagram,
        link: "https://www.instagram.com/lootmogul/?hl=en"
    },
    {
        Image: FaFacebookF,
        link: "https://www.facebook.com/LootMogul/"
    },
    {
        Image: FaYoutube,
        link: "https://www.youtube.com/@lootmogul"
    },
    {
        Image: SiMedium,
        link: "https://lootmogul.medium.com/"
    }
];


const Community = () => {
  return (
    <Box py="20px">
        
    <Text
         variant="BoldWhiteText"
       
         textAlign="center"
         fontSize="40px"
         mt="0"
         mb="10px"
         lineHeight="1"
     >
         Community
     </Text>
     <Flex
         mt="6px"
         justify="center"
         width={["100%", "100%"]}
         flexWrap={"wrap"}
         py="1rem"
     >
         {socialLinks.map((img, index) => (
             <Box key={`cimg-${index}`} mt={["5px", 0, 0, 0]} mr={["15px", "25px", "25px", "25px"]}>
             <Link
                 _focus={{
                     border: "none",
                     boxShadow: "none"
                 }}
                 href={img.link}
                 target="_blank"
                 _hover={{ color: "#F60C67" }}
                 className='twitter_icon_patch'
             >

              { img.Image.name == 'FaTwitter' ? <>
              <svg className='twitter' height="19" display={"flex"} fill='#fff' width="19px" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <path d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"></path>
                </svg>
              </>
              :
                <Icon as={img.Image} w={[5,6,6,6]} h={[5,6,6,6]} color='#fff' _hover={{ color: "#F60C67" }} />  
              }
             </Link>
         </Box>
         ))}
     </Flex>
    </Box>
  )
}

export default Community