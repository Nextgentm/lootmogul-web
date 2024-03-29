 ;import { useState, useContext, useEffect } from "react";
import { Box, Image, Link, Tooltip } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const SpinBtn = dynamic(() => import("../Header/SpinBtn"));
import AppContext from "../../utils/AppContext";
import strapi from "../../utils/strapi";

const StickySocialIcons = () => {
    const { user, toggleLoginModal } = useContext(AppContext);
    const [openSpin, setOpenSpin] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
    const spinClick = () => {
        if (user) {
            setOpenSpin(true);
        } else toggleLoginModal();
    };
    const onClose = () => {
        setOpenSpin(false);
    };
    useEffect(async()=>{
         const data = await strapi.find("bucketgamemasters", {
            filters: { status: "active", type: "spin" },
        });
        if(data?.data?.length) setShowSpin(true);
    },[])
    return (
        <Box
            pos="fixed"
            bottom={["10%", "20%", "20%", "20%"]}
            right="0px"
            zIndex={9999}
        >
         {showSpin &&(   <Tooltip
                placement="auto"
                label="Spin the Wheel"
                bg="#383838"
                borderRadius="10px"
                color="white"
                fontSize="sm"
            >
                <Image
                    mb="15%!important"
                    className="stickyIcon"
                    m="5%"
                    alt="social"
                    width={["35px", "50px"]}
                    height={["35px", "50px"]}
                    src="/assets/spin.webp"
                    onClick={() => {
                        spinClick();
                    }}
                />
            </Tooltip>) }
            <Tooltip
                placement="auto"
                label="Join Discord"
                bg="#383838"
                borderRadius="10px"
                color="white"
                fontSize="sm"
            >
                <Link
                    _focus={{ border: "none", boxShadow: "none" }}
                    href="https://discord.gg/mHUqAm8fsh"
                    target="_blank"
                >
                    <Image
                        className="stickyIcon"
                        m="5%"
                        alt="social"
                        width={["35px", "50px"]}
                        height={["35px", "50px"]}
                        src="/assets/discord-sticky.png"
                    />
                </Link>
            </Tooltip>
            <Tooltip
                placement="auto"
                label="Join Telegram"
                bg="#383838"
                borderRadius="10px"
                color="white"
                fontSize="sm"
            >
                <Link
                    _focus={{ border: "none", boxShadow: "none" }}
                    href="https://t.me/LootMogulcommunitychat"
                    target="_blank"
                >
                    <Image
                        className="stickyIcon"
                        m="5%"
                        alt="social"
                        width={["35px", "50px"]}
                        height={["35px", "50px"]}
                        src="/assets/telegram-sticky.webp"
                    />
                </Link>
            </Tooltip>
            {openSpin && <SpinBtn isOpen={openSpin} onClose={onClose} />}
        </Box>
    );
};

export default StickySocialIcons;
