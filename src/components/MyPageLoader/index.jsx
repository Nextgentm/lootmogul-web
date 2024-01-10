
import GridLoader from "react-spinners/GridLoader";
import { useState, useEffect, useContext } from "react";
import { Box } from '@chakra-ui/react'
import { AppContext } from "../../utils/AppContext";
import { useRouter } from "next/router";
const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: 'center',
    color:"#fff"
    
  };
  
  const Typewriter = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
      let timeout;
  
      if (currentIndex <= text.length) {
        timeout = setTimeout(() => {
          setCurrentText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, delay);
      } else if (infinite) {
        // ADD THIS CHECK
        setCurrentIndex(0);
        setCurrentText("");
      }
  
      return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);
  
    return <span>{currentText}</span>;
  };
  
const MyPageLoader = () => {
    const { user } = useContext(AppContext);
    const router = useRouter();
    return (
        <div>
        <div style={style}> 
        {router.route === "/joining" && 
        <>
            <Box fontSize={["18","18","30"]} fontFamily={"Blanch"}>Hi {user?.username}, 
                <Typewriter color="#fff" text=" Hold tight while we prepare your game questions" delay={150} infinite />...
            </Box>
        </>
        }
        <GridLoader
            color={"#DDBF79"}
            loading={true}
          
            size={20}
        />
        
        </div>
        <div style={{paddingBottom:"100vh"}}> </div>
        </div>
    );
};

export default MyPageLoader;
