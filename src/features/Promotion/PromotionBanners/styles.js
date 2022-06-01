module.exports = {
    headerImgStyle: {
        mt: 2,
        alt: "headerImg",
        src: "/assets/login-bg.png",
        width: "100%",
        height: 590
    },
    imgCntainer: (isMobile) => ({
        position: "relative",
        width: "90%%",
        height: ["120px","120px","240px", "240x","240px"]
        
    }),
    loginStyle: (isMobile) => ({
        h: "auto",
        position: "absolute",
        ...(isMobile && { w: "300px" }),
        ...(!isMobile && { w: "360px" }),
        zIndex: 10,
         ...(!isMobile && { right: "100px" }),
        ...(isMobile && { left: "50%", ml: "-145px" }),
        top: "40px"
    })
};
