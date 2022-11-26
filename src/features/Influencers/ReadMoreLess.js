import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
const ReadMoreLess = ({ read, lines }) => {
    const [isReadMoreShown, setReadMoreShown] = useState(false);

    return (
        <Box
            style={{
                fontFamily: "Sora",
                fontSize: "14px",
                color: "white",
                paddingBottom: "30px",
                marginTop: "3%"
            }}
        >
            <Text
                whiteSpace={"pre-line"}
                noOfLines={isReadMoreShown ? "" : lines}
            >
                {read}
            </Text>

            {read && read?.match(/\n/g || "")?.length > lines && (
                <Text
                    textDecoration={"underline"}
                    cursor="pointer"
                    color={"#e00493"}
                    fontSize="14px"
                    onClick={() => {
                        setReadMoreShown(!isReadMoreShown);
                    }}
                >
                    {" "}
                    {isReadMoreShown ? "<<Read Less" : "Read More>>"}{" "}
                </Text>
            )}
        </Box>
    );
};

export default ReadMoreLess;
