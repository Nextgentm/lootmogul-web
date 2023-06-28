import {
    Flex,
    Box,
    Popover,
    PopoverTrigger,
    Image as CImage,
    useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import AppContext from "../../../utils/AppContext";
import dynamic from "next/dynamic";
const NextShare = dynamic(() => import("../../../utils/socialbuttons"));


const style1 = {
  
  	    transition: 'scale(1.5) 1s  ease-in-out steps(28)'
  };

const SocialActions = ({
    style = {},
    imgSize = { width: 30, height: 30 },
    showWriteReview = false,
    onHeartClick,
    isHeartClick,
    influencer,
}) => {
    const {
        user
        
    } = useContext(AppContext);
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [animate, setAnimate] = useState(false);
    const animateEffect = () => {
        
        // Button begins to shake
        setAnimate(true);
        
        // // Buttons stops to shake after 2 seconds
        setTimeout(() => setAnimate(false), 2000);
        onHeartClick();
    };
    const [hasData,setHasData]=useState(null);
const[rating,setRating]=useState({title:"",review:"",star:0.0});

    return (
        <Flex w="fit-content" {...style} className="aa">
            
             <Box ml={"10px"}>
            <Popover
              >
                <PopoverTrigger>
                    <Box w="24px" h="24px" p ={"10%"} border={"1px"} borderColor="#ffffff44">
                <CImage 
                  m="auto"
                h="100%"
            w="100%"
        alt="share" src="/assets/designupdate1/games_share_icon.svg" />
 </Box> 
            </PopoverTrigger>
            <NextShare link={process.env.NEXT_PUBLIC_SITE_URL+ "/influencer/"+ influencer?.data?.slug} caption={"Come and play with "+influencer?.data?.name} hashtag="lootmogul"
              type="influencer"
              influencer={influencer?.data}
              user= {user}
              ></NextShare>
            </Popover>
                    
                
            </Box>

        </Flex>
    );
};

export default SocialActions;