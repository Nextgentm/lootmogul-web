import {useContext,useEffect,useState} from "react";
import {Text,Avatar, Heading, Box} from "@chakra-ui/react";
import strapi from "../../../utils/strapi";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import Image from "next/image";
import SEOContainer from "../../SEOContainer";
import AppContext from "../../../utils/AppContext";
import { useRouter } from "next/router";
import MyPageLoader from "../../../components/MyPageLoader";

const newMarkDownTheme = {
    p: props => {
      const { children } = props;
      return (
        <Text mb={2} fontFamily="Sora" textAlign="justify!important" color="white" fontSize={["14px","18px"]}>
          {children}
        </Text>
      );
    },
  };

  
const AmbassadorsProfile = ({slug})=>{
    const router = useRouter();
    const [detailedData, setDetailedData] = useState();
    const { isMobileDevice } = useContext(AppContext);
    useEffect(async () => {
        // fetch user stats

        if (slug) {
            const filter = isNaN(slug) ? {slug: slug}:  {id: slug} ;
            const data = await strapi.find("about-us-profiles", {
                filters:filter,
                populate: [
                    "profilePic",
                    "sharedSeo"
                ]
            });
            if (data?.data?.length) {
                setDetailedData(data.data[0]);
               
            }
        }
    }, [slug]);

    return <Box   mr={["18px!important", "60px!important"]}
    ml={["18px!important", "60px!important"]}
    my="5%!important"
    m="auto"
    h="auto"
    textAlign={["center","center"]}>
      {!detailedData && <MyPageLoader/>}
    {detailedData && (<>   <Avatar boxSize={["150px","200px","200px","300px"]} src={detailedData.profilePic?.data?.url} name={detailedData.name}/>
        <Heading color="primary">{detailedData.name} </Heading>
        {detailedData &&  <SEOContainer seoData={detailedData.sharedSeo} content={detailedData} pageName={"promotions"}/> }
        <Box textAlign="left" color="White">
     <ReactMarkdown rehypePlugins={[rehypeRaw]}  components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{detailedData?.details}</ReactMarkdown>
   
     </Box>
     </>)} 
    </Box>
}
export default AmbassadorsProfile;