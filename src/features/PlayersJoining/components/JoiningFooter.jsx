import { Text } from "@chakra-ui/react";
const JoiningFooter = () => {
  return (
    <>
      <Text
        variant="joiningText"
        mt={{ base: "25%", sm: "10%", md: "2%", lg: "2%" }}
        fontSize={{ base: "18px", sm: "18px", md: "24px", lg: "24px" }}
        fontWeight="600"
      >
        {" "}
        Game Tips
      </Text>
      <Text
        variant="joiningText"
        mt="1%"
        fontSize={{ base: "14px", sm: "14px", md: "20px", lg: "20px" }}
      >
        The faster you answer , the more points you score
      </Text>
    </>
  );
};
export default JoiningFooter;
