import React, { useContext } from "react";
import { Box, Text, Avatar,Image,Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AppContext from "../../../utils/AppContext";
const PlayersLoading = ({ users }) => {
  const { isTabletOrDesktop } = useContext(AppContext);
  return (
    <>
    {users?.map((user, index) => (
      <Box overflow="hidden">
        <Avatar
        overflow="hidden"
          backgroundColor="white"
          name={user.username}
          src={user.profile_pic}
          boxSize={{
            base: "60px",
            sm: "70px",
            md: "100px",
            lg: "100px",
          }}
          showBorder={true}
        >
        </Avatar>
      <Text
          mt="20px"
          variant="playerName"
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "16px",
            lg: "16px",
          }}
          lineHeight="20px"
        >
          
          { user.username }
        </Text>
      </Box>
      ))}

<Box overflow="hidden">
        <Avatar
        overflow="hidden"
          backgroundColor="white"
          boxSize={{
            base: "60px",
            sm: "70px",
            md: "100px",
            lg: "100px",
          }}
          showBorder={true}
        >
         
         
          <Flex flexDirection="column">

          <motion.Box
            animate={{ y: isTabletOrDesktop? -250 : -120 }}
            transition={{
              ease: "linear",
              duration: 0.9,
              repeat: Infinity,
            }}
          >
            
            <Image
             
              zIndex="1"
              transform={
                isTabletOrDesktop ? {
                base: "translate(-10px,50px)",
                sm: "translate(-12px,50px)",
                md: "translate(-25px,70px)",
                lg: "translate(-25px,100px)"
              } :
              { 
                base: "translate(-10px,40px)",
                sm: "translate(-12px,40px)",
                md: "translate(-25px,50px)",
                lg: "translate(-25px,70px)"
              }}
              alt="player"
              src="/assets/plyer.png"
            />
            
          </motion.Box>
          <motion.Box
            animate={{ y: isTabletOrDesktop? -250 : -120 }}
            transition={{
              ease: "linear",
              duration: 0.9,
              repeat: Infinity,
            }}
          >
            
            <Image
             
              zIndex="1"
              transform={
                isTabletOrDesktop ? {
                base: "translate(-10px,90px)",
                sm: "translate(-12px,90px)",
                md: "translate(-25px,120px)",
                lg: "translate(-25px,160px)"
              } :
              {
                base: "translate(-10px,60px)",
                sm: "translate(-12px,60px)",
                md: "translate(-25px,90px)",
                lg: "translate(-25px,100px)"
              }}
              alt="player"
              src="/assets/plyer.png"
            />
            
          </motion.Box>
          
           </Flex>
        </Avatar>
      
      
      
        <Text
          mt="20px"
          
          variant="playerName"
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "16px",
            lg: "16px",
          }}
          lineHeight="20px"
        >
          
          { "Searching...."}
        </Text>
      </Box>

     
    </>
  );
};
export default PlayersLoading;
