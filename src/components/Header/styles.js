const { transform } = require("framer-motion");

module.exports = {
  rootStyle: {
    bg: "background",
    w: "100%",
    h: "65px",
    d: "flex",
    pl: ["16px", "60px"],
    pr: ["16px", "20px"],
    alignItems: "center",
    position: "sticky",
    top: 0,
    justify: "space-between"
  },

  logoStyle: (isMobile) => ({
    alt: "logo",
    src: "/assets/lm_logo.png",
    width: ["130px", "130px", "160px", "180px"],
    height: ["40", "44px", "48px", "50px"],
  }),

  loginBtnStyle: {
    ml: "10px",
    w: "100px",
    h: "35px"
  },
  loginStyle: (isMobile, user) => ({
    position: "unset",

    ...((!user || isMobile) && { width: "15%" }),
    ...((user && !isMobile) && { width: "23%" }),
    ...(!isMobile && { right: "60px" }),
    ...(isMobile && { right: "20px" }),
  }),
  navLinksStyle: (isActive) => ({
    ml: ["8px", "0px"],
    textTransform:"uppercase",
    // passhref: true,
    padding:"13px 20px",
    fontFamily: "Blanch",
    fontSize: ["30px", "30px"],
    textDecoration:"none!important",
    mt: ["0","0", 0],
    color: isActive ? "primary" : "secondary",

    ...(isActive && {
      color: "primary"
    }),
    _hover: {
      color: "primary",
      textDecoration:"none!important",
      transition:".4s",
      transform: "scale(1.2)"
    },
    _focus:{
      textDecoration:"none!important"
    }
  })
};
