import { Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ViewAllBtn=()=> {
  return (
    <Flex alignItems="center">
    <Text
        color="white"
        fontFamily="Blanch"
        fontSize={[
            "1em",
            "1em",
            "1.5em",
            "2em",
            "2em"
        ]}
    >
        VIEW ALL
    </Text>
    <Image
        alt=""
        src="/assets/rightArrow.png"
        ml="0.5em"
       
    />
</Flex>
  )
}

export default ViewAllBtn