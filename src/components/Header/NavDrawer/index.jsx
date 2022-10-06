import {
    Drawer,
    DrawerContent,
    DrawerCloseButton,
    Box    
} from "@chakra-ui/react";
import Image from "next/image";
const NavDrawer = ({ isOpen, onClose, renderMobileRoutes }) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent bg="#1e052b" maxW={["92vw", "92vw", "50vw"]} p="25px 35px">
                <DrawerCloseButton color="white" bg="#f61067" fontSize="20px" p="20px" outline="0" top="35px" right="25px" _focus={{ border: "none", boxShadow: "none" }} _hover={{ bg: "#f61067" }} />
                <Box position="unset" left="16px" top="16px">
                    <Image
                        alt="logonav"
                        src="/assets/lm_logo.png"
                        width={"250px"}
                        height={"54px"}
                        
                    />
                </Box>
                {renderMobileRoutes}
            </DrawerContent>
        </Drawer>
    );
};

export default NavDrawer;
