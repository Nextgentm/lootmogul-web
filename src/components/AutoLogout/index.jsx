import React, { useContext, useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    Heading,
    Text,
    Box
} from "@chakra-ui/react";
import { AppContext } from "../../utils/AppContext";
import strapi from "../../utils/strapi";
import { useRouter } from "next/router";

const AutoLogout = ({ openPopup }) => {
    const { user, setUser } = useContext(AppContext);
    const [isOpen, setOpen] = useState(openPopup);
    const router = useRouter();
    var timer = null;

    const handleClose = () => {
        setOpen(false);
    };

    const clearTimer = () => {
        clearInterval(timer);
    };

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        try {
            if (user) {
                const jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
                if (jwt_token === null) {
                    clearTimer();
                }
                else{
                    const decodedJwt = parseJwt(jwt_token);
                    timer = setInterval(() => {
                        if (
                            decodedJwt.exp * 1000 < Date.now() &&
                            jwt_token !== null
                        ) {
                            if (
                                typeof window !== "undefined" &&
                                window.localStorage
                            ) {
                                localStorage.clear();
                            }
                            strapi.logout();
                            setUser(null);
                            if (
                                router.route === "/influencers" ||
                                router.route === "/nfts" ||
                                router.route === "/games"
                            ) {
                                router.push(router.route);
                            } else {
                                router.push("/");
                            }
                            clearTimer();
                        }

                        if (window.localStorage.getItem("strapi_jwt") === null) {
                            clearTimer();
                        }
                    }, 30000);
                }
                
            }
        } catch (error) {
            console.log(error);
        }
    }, [user]);

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            onClose={handleClose}
            isOpen={isOpen}
            onClick={handleClose}
            isCentered
            size={"xl"}
            bg="background"
            closeOnOverlayClick={false}
            closeOnEsc={false}
        >
            <AlertDialogOverlay />

            <AlertDialogContent p="10px" bg="background">
                <Box border="2.7033px dashed #515151">
                    <AlertDialogHeader>
                        <Heading color="white">
                            YOU HAVE BEEN LOGGED OUT !!
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogCloseButton _focus={{ boxShadow: "none" }} />
                    <AlertDialogBody>
                        <Text variant="hint">
                            You're session is expired. Please Login again.
                        </Text>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={handleClose}>Close</Button>
                    </AlertDialogFooter>
                </Box>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AutoLogout;