import { Box } from "@chakra-ui/react";
import Image from "next/image";
const Profile = (props) => {
    return (
        <Box
            width="120px"
            height="120px"
            margin="auto"
            bgImage="url('/assets/Ellipse 45.png')"
            bgPosition="center"
            bgGradient="(180deg, #FFFFFF 50%, rgba(55, 55, 55, 0.2) 100%)"
        >
            <Box
                width={["60%", "65px"]}
                height={["50%", "65px"]}
                border="1px solid #9A9A9A"
            >
                <Image alt="image" layout="fill" src={props.profileImage} />
            </Box>
        </Box>
    );
};
export default Profile;
