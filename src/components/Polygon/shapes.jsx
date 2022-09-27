import { Box } from "@chakra-ui/react";
import Image from "next/image";

const Shapes = (props) => {
    return (
        <Box width={["60px", "60px"]} height={["60px", "60px"]}>
            <Image alt="img" layout="fill" src={props.image} />
        </Box>
    );
};

export default Shapes;
