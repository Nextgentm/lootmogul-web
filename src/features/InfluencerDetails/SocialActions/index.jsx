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
            {/* <Box w="24px" h="24px" cursor="pointer" style = {animate ? style1 : null} border={"1px"} borderColor="#ffffff44"  
             >
            
            <CImage 
            mt="2px"
            ml="2px"
            alt="fav"
            src ={ isHeartClick? '/assets/designupdate1/games_like_icon1.svg' : '/assets/designupdate1/games_like_icon.svg'}
            maxH="80%"
            maxW="80%"
            
             onClick={
                animateEffect
                  }   />;
                <ExportedImage alt="fav" {...imgSize} src="/assets/fav.svg" />
            </Box> */}


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
            <NextShare link={"https://lootmogul.com/influencer/"+ influencer?.data?.slug} caption={"Come and play with "+influencer?.data?.name} hashtag="lootmogul"
              type="influencer"
              influencer={influencer?.data}
              user= {user}
              ></NextShare>
            </Popover>
                    
                
            </Box>


            {/* {showWriteReview && user && (
               <Popover onOpen={()=>{
               if( user && influencer)
            strapi.find("ratings",{filters: { reviewer: user.id,influencer:influencer.data.id },
               populate: "*"}).then((response)=>{if(response?.data[0]){
                   setHasData(response.data[0].id);
                   setRating({title: response.data[0]?.title,review:response.data[0]?.review,star:response.data[0]?.star })
               }})
               } }>
                    {({ isOpen, onClose }) => (
                        <>
               <PopoverTrigger>
                   <Text
                       bg="#2d2d2d"
                       h="30px"
                       borderRadius={"4px"}
                       p="6px"
                       color="white"
                       ml={"10px"}
                       fontSize={"12px"}
                       textAlign={"center"}
                       cursor={"pointer"}
                       fontFamily={"Sora"}
                   >
                       Write a review
                   </Text>
               </PopoverTrigger>
               <PopoverContent  bg="#2d2d2d"  w="300px" h="auto"   color="white" >
                   <PopoverArrow />
                   <PopoverHeader>Review</PopoverHeader>
                   <PopoverCloseButton />
                   <PopoverBody>
                       <Input defaultValue={rating.title?rating.title:""} onChange={(e)=>
                        { 
                            setRating((prev) => ({ ...prev, title:e.target.value }));
                        }}mb="2%" type="text" placeholder="Add a title"></Input>
                       <Textarea onChange={(e)=>
                        { 
                            setRating((prev) => ({ ...prev, review:e.target.value }));
                        }} defaultValue={rating.review?rating.review:""} placeholder="Add a review" />
                      <Box pt="3">
                      <Rating
                           initialRating={rating.star?rating.star:0}
                           emptySymbol={
                               <AiOutlineStar
                                   color="#888888"
                                   style={{ height: "2em", width: "2em" }}
                               />
                           }
                           fullSymbol={
                               <AiFillStar
                                   color="#F2B01C"
                                   style={{ height: "2em", width: "2em" }}
                               />
                           }
                           onChange={(e) => {
                              
                                    setRating((prev) => ({ ...prev, star:e }));
                                
                               
                           }}
                       />
                      </Box>
                   </PopoverBody>
                   <PopoverFooter d="flex" justifyContent="flex-end">
                       <Button onClick={async()=>{
                           if(hasData){
                            await strapi.update("ratings", hasData, {
                                title:rating.title,review:rating.review,star:rating.star.toFixed(1), reviewer:user.id, influencer:influencer.data.id
                            });
                            onClose();
                           }else {
                            await strapi.create("ratings",{title:rating.title,review:rating.review,star:rating.star, reviewer:user.id, influencer:influencer.data.id})
                            onClose();
                           } 
                           
                       }}>submit</Button>
                   </PopoverFooter>
               </PopoverContent>
               </>
               )}
           </Popover>
            )} */}
        </Flex>
    );
};

export default SocialActions;