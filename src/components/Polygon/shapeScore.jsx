import {  Text } from '@chakra-ui/react';

const ShapeScore = (props) => {
    return (
        <Text fontSize={"25px"} color={"#FFFFFF"}>
            {props.num}
        </Text>
    );
};

export default ShapeScore;