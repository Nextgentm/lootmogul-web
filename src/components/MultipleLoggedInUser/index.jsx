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
import axios from "axios";

const MultipleLoggedInUser = ({ openPopup }) => {
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

    useEffect(() => {
        if (user) {
            clearTimer();
            checkIfTheLoggedInUserIsAddedInDB(user);
        }
    }, [user]);

    const checkIfTheLoggedInUserIsAddedInDB = async (value) => {
        try {
            timer = setInterval(async () => {
                if (
                    window.location.pathname !== "/joining" &&
                    window.localStorage.getItem("strapi_jwt") !== null
                ) {
                    const resp = await axios.post(
                        process.env.NEXT_PUBLIC_WORDPRESS_URL+`/wp-json/strapi/v1/getCurrentUser/`,
                        {
                            user_email: value.email,
                            provider: value.provider
                        }
                    );

                    const data = resp.data;

                    if (data.success === true) {
                        const localStorageTokenValue =
                            window.localStorage.getItem("strapi_jwt");

                        if (localStorageTokenValue !== data.strapi_jwt) {
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
                                router.route === "/games" ||
                                router.route === "/dsg"
                            ) {
                                router.push(router.route);
                            } else {
                                router.push("/");
                            }
                            clearTimer();
                            if(data.strapi_jwt !== 'logout'){
                                setOpen(true);
                            }
                            
                        }
                    }
                }

                if (window.localStorage.getItem("strapi_jwt") === null) {
                    clearTimer();
                }
            }, 8000);
        } catch (error) {
            
        }
    };

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
                            New User has logged in on another device.
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

export default MultipleLoggedInUser;
