import { useState, useContext } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useGoogleLogin } from "react-google-login";
import { Flex, Text, Box, Button, Link,  Modal,ModalBody, ModalContent, ModalOverlay} from "@chakra-ui/react";
import Image from "next/image";
import { AppContext } from "../../utils/AppContext/index";

import { root, loginTitleStyle } from "./styles";

const Login = ({isOpen, OnLoginClose}) => {
    const [selectedOption, setSelectedOption] = useState("signup");

    const { callAuthService } = useContext(AppContext);

    const { signIn } = useGoogleLogin({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,

        onSuccess: (data) => {
           callAuthService("google", data.accessToken)
        // window.location.href = "https://quiz.lootmogul.com/login?access_id="+ data.tokenId+"&provider=GOOGLE";

        },
       // onFailure: (error) => //console.log(error)

    });

    return (
        <Modal  isOpen={isOpen} onClose={OnLoginClose} scrollBehavior="inside" >
                    <ModalOverlay />

    <ModalContent rounded={5} mt={["100px", "100px"]} 
    marginTop={["90px","60px","70px","120px"]}
    marginLeft={["0%","50%","60%","70%"]}
    width={ ["375px"]}
    bg={"#4C69BA"}
    borderRadius="14"
    background="transparent">
    
    <ModalBody>
    <Flex zIndex={999999} {...root} bgImage="url('/assets/login-bg.png')" pos="relative">
              
         
              <Box  width="90%" height="90%" m="20px" zIndex={999} border="2.7033px dashed #515151">
              <Flex pt={["0px","0px","0px","5px"]} px="20px" pb="20px" direction={"column"} zIndex={999} align="center">
                  <Text fontSize={["35px","45px"]} mt="2%" mb="2%" {...loginTitleStyle}>{selectedOption === "login"?"LOGIN":"SIGNUP"}</Text>
                  
                  <Button  mt="2%" mb="2%" 
                      leftIcon={
                          <Image
                              alt="google"
                              width="20px"
                              height="20px"
                              src={
                                  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png"
                              }
                          />
                      }
                      backgroundColor="#DD4B39"
                      variant="login"
                      onClick={signIn}
                  >
                      {selectedOption === "login"?"Login":"Signup"} with Google
                  </Button>
    
                  <FacebookLogin 
                      appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
                      callback={({ accessToken }) =>
                          {
                            callAuthService("facebook", accessToken)
                            //   window.location.href = "https://quiz.lootmogul.com/login?access_id="+ accessToken+"provider=FACEBOOK";
                          }
                      }
                      render={(renderProps) => (
                        
                          <Button  mt="2%" mb="2%" 
                          leftIcon={
                              <Image
                              alt="google"
                              width={"20px"}
                              height={"20px"}
                                  src={
                                      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png"
                                  }
                              />
                          }
                          onClick={renderProps.onClick}
                          backgroundColor="#4C69BA"
                          backgroundImage="linear-gradient(#4C69BA, #3B55A0)"
                          variant="login"
                      >
                          {selectedOption === "login"?"Login":"Signup"}  with Facebook
                      </Button>
                      )}
                  />
    
                  <Text
                      color="primary"
                      mt="12px"
                      cursor="pointer"
                      fontFamily="Sora"
                      fontSize="12px"
                      onClick={() =>
                          setSelectedOption(
                              selectedOption === "login" ? "signup" : "login"
                          )
                      }
                  >
                      {selectedOption === "login"
                          ? "New to LootMogul? Sign Up now"
                          : "Already user? Login"}
                  </Text>
                  <Text
                   mt="12px"
                   textAlign="center"
                   fontFamily="Sora"
                   color="white"
                   fontSize="12px">
    By registering, you accept you are 18+ & agree to our <Link  color="primary"
                  
                      fontFamily="Sora"
                      fontSize="12px">T&C</Link> & <Link  href="/privacy-policy" isExternal color="primary"
                  
                      fontFamily="Sora"
                      fontSize="12px">Privacy Policy</Link>
                  </Text>
              </Flex>
              </Box>
          </Flex>
    
    </ModalBody>
    
    </ModalContent>
    </Modal>
    
    );
};

export default Login;
