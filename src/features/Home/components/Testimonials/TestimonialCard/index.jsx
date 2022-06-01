import { StarIcon } from "@chakra-ui/icons";
import { Flex,Avatar, Box, Text } from "@chakra-ui/react";

const TestimonialCard = ({ testimonial }) => {
    const renderRatings = () => (
        <Flex mt="14px">
            {Array(5)
                .fill()
                .map((_, index) => (
                    <StarIcon
                        key={`star-${index}`}
                        boxSize="14px"
                        ml={index > 0 ? "6px" : 0}
                        color="primary"
                    />
                ))}
        </Flex>
    );
    return (
        <Box  mr="40px"  bgImage="url('/assets/testimonial.png')" bgRepeat= "no-repeat">
        <Flex
            w="330px"
            h="165px"           
            background="#1c1c1c"
            justify="space-between"
            backgroundImage="linear-gradient(172deg, #7C7C7C -85%, rgba(255, 255, 255, 0) 50%)!important"
            direction={"column"}
            pb="30px"
            pt="30px"
            pl="24px"
            pr="24px"
           
        >
            <Text
                variant="hint"
                fontSize="13px"
                lineHeight={"16px"}
                h="64px"
            >
                {testimonial.content}
                
            </Text>
<Text w="100%" textAlign="right" lineHeight={"16px"}  fontSize="13px" variant="hint"> --{testimonial.author.data.name}</Text>
            {renderRatings()}
        </Flex>
        <Avatar mt="30px" showBorder={true} borderWidth="5px" borderColor="white" boxSize="80px" src={testimonial.author.data.picture.data.url}/>
        </Box>
    );
};

export default TestimonialCard;
