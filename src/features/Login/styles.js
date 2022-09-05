module.exports = {
  root: {
    w: "100%",
    align: "center",
    flexDirection: "column"
  },
  loginTitleStyle: {
    color: "white",
    // fontSize: "45px",
    fontFamily: " Sora"
  },
  toggleStyle: {
    mt: "10px",
    w: "252px",
    h: "35px",
    align: "center",
    border: "1px solid #8F8F8F",
    borderRadius: "6px"
  },
  buttonStyle: (isActive, pos) => ({
    h: "100%",
    cursor: "pointer",
    flex: 1,
    paddingTop: "4px",
    fontSize: "18px",
    fontFamily: "Blanch",
    color: isActive ? "#232323" : "#ffffff",
    background: isActive ? "primary" : "transparant",
    align: "center",
    ...(pos === 1 && { borderTopLeftRadius: "6px", borderBottomLeftRadius: "6px" }),
    ...(pos === 2 && { borderTopRightRadius: "6px", borderBottomRightRadius: "6px" })
  })
};
