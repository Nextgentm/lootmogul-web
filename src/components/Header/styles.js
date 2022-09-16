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
    ml: "auto",
    w: "80px",
    h: "35px"
  },
  loginStyle: (isMobile, user) => ({
    position: "absolute",

    ...((!user || isMobile) && { width: "15%" }),
    ...((user && !isMobile) && { width: "23%" }),
    ...(!isMobile && { right: "60px" }),
    ...(isMobile && { right: "20px" }),
  }),
  navLinksStyle: (isActive) => ({
    ml: ["16px", "40px"],
    textTransform:"uppercase",
    // passHref: true,
    fontFamily: "Sora",
    fontSize: ["24px", "17px"],
    mt: ["16px", 0],
    color: isActive ? "primary" : "secondary",

    ...(isActive && {
      _after: {
        content: `""`,
        width: ["12%", "15%", "15%", "60%"],
        borderBottom: "1px solid #fff",
        // position: absolute;
        left: 0,
        bottom: 0,
        display: "block",
        borderBottom: "1px",
        borderRadius: "1px",
        borderColor: "linear-gradient(90deg, #F2B01C 0%, #EBCE2C 100%), #C4C4C4", borderBottomWidth: "2px", borderBottomStyle: "solid"
      }
    }),
    _hover: {
      color: "primary",
      _after: {
        content: `""`,
        width: "60%",
        borderBottom: "1px solid #fff",
        // position: absolute;
        left: 0,
        bottom: 0,
        display: "block",
        borderBottom: "1px",
        borderRadius: "1px",
        borderColor: "linear-gradient(90deg, #F2B01C 0%, #EBCE2C 100%), #C4C4C4", borderBottomWidth: "2px", borderBottomStyle: "solid"
      }
    }
  })
};
