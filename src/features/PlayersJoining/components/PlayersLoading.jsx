import React, { useContext } from "react";
import { Box, Text, Avatar,Image,Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AppContext from "../../../utils/AppContext";
// import Image from "next/image";
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

      {/* <Box overflow="hidden">
        <Avatar
          backgroundColor="white"
          boxSize={{
            base: "60px",
            sm: "70px",
            md: "100px",
            lg: "100px",
          }}
          showBorder={true}
          name={users.length > 2 && users[2].username}
          src={users.length > 2 && users[2].profile_pic}
        >
          <motion.Box
            animate={{ y: -140 }}
            transition={{
              ease: "linear",
              duration: 0.9,
              repeat: Infinity,
            }}
            
          >
              <Box  boxSize={{
                base: "20px",
                sm: "20px",
                md: "30px",
                lg: "30px",
              }}
              zIndex="1"
              transform={{
                base: "translate(-16px,21px)",
                sm: "translate(-26px,21px)",
                md: "translate(-34px,38px)",
                lg: "translate(-34px,38px)",
              }}>
            <Image
             
              src="/assets/plyer.png"
              alt="player"
            />
            </Box>
          
          </motion.Box>
        </Avatar>
        <Text
          mt="1%"
          variant="playerName"
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "16px",
            lg: "16px",
          }}
          lineHeight="20px"
        >
          {" "}
          {users.length > 2 ? users[2].username : "Searching...."}
        </Text>
      </Box>
      <Box overflow="hidden">
        <Avatar
          backgroundColor="white"
          boxSize={{
            base: "60px",
            sm: "70px",
            md: "100px",
            lg: "100px",
          }}
          showBorder={true}
          name={users.length > 3 && users[3].username}
          src={users.length > 3 && users[3].profile_pic}
        >
          <motion.Box
            animate={{ y: -180 }}
            transition={{
              ease: "linear",
              duration: 0.9,
              repeat: Infinity,
            }}
          >
              <Box  boxSize={{
                base: "20px",
                sm: "20px",
                md: "30px",
                lg: "30px",
              }}
              zIndex="1"
              transform={{
                base: "translate(-16px,21px)",
                sm: "translate(-26px,21px)",
                md: "translate(-34px,38px)",
                lg: "translate(-34px,38px)",
              }}>
            <Image
             
              src="/assets/plyer.png"
              alt="player"
            />
            </Box>
          </motion.Box>
        </Avatar>
        <Text
          mt="1%"
          variant="playerName"
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "16px",
            lg: "16px",
          }}
          lineHeight="20px"
        >
          {" "}
          {users.length > 3 ? users[3].username : "Searching...."}
        </Text>
      </Box>
      <Box overflow="hidden">
        <Avatar
          backgroundColor="white"
          boxSize={{
            base: "60px",
            sm: "70px",
            md: "100px",
            lg: "100px",
          }}
          showBorder={true}
          name={users.length > 4 && users[4].username}
          src={users.length > 4 && users[4].profile_pic}
        >
          <motion.Box
            animate={{ y: -220 }}
            transition={{
              ease: "linear",
              duration: 0.9,
              repeat: Infinity,
            }}
          >
              <Box  boxSize={{
                base: "20px",
                sm: "20px",
                md: "30px",
                lg: "30px",
              }}
              zIndex="1"
              transform={{
                base: "translate(-16px,21px)",
                sm: "translate(-26px,21px)",
                md: "translate(-34px,38px)",
                lg: "translate(-34px,38px)",
              }}>
            <Image
             
              src="/assets/plyer.png"
              alt="player"
            />
            </Box>
          </motion.Box>
        </Avatar>

        <Text
          mt="1%"
          variant="playerName"
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "16px",
            lg: "16px",
          }}
          lineHeight="20px"
          textTransform={"capitalize"}
        >
          {" "}
          {users.length > 4 ? users[4].username : "Searching...."}
        </Text>
      </Box> */}
    </>
  );
};
export default PlayersLoading;
