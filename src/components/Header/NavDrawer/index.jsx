/* eslint-disable react/jsx-key */
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Box    
} from "@chakra-ui/react";
import Image from "next/image";
const NavDrawer = ({ isOpen, onClose, renderMobileRoutes }) => {
    return (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerContent bg="black" maxW="200px">
                <DrawerCloseButton color="white" />
                <Box position="absolute" left="16px" top="16px">
                    <Image
                        alt="logonav"
                        src="/assets/lm_logo.png"
                        width={"92px"}
                        height={"22px"}
                    />
                </Box>
                {renderMobileRoutes()}
            </DrawerContent>
        </Drawer>
    );
};

export default NavDrawer;
