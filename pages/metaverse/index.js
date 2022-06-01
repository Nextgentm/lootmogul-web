import { useContext } from "react";
import { Box, Button,Link } from "@chakra-ui/react";
import Image from "next/image";
import LMVideoPlayer from "../../src/components/LMVideoPlayer";
import { AppContext } from "../../src/utils/AppContext";

const Metaverse = () => {
    const { isTabletOrDesktop } = useContext(AppContext);

    return (
        <Box position={"relative"} width={"100%"}>
            <LMVideoPlayer  url={"/assets/videos/Exterior_block_numbers_Crypto_Arena.mp4"} play={true} loop={true}/>
            <Link _focus={{border:"none", boxShadow:"none"}} href="/metaverse/overview/" ><Button  pos="absolute" bottom={"5%"} left={"48%"}>NFT Navigation</Button></Link>
        </Box>
    );
};
export default Metaverse;