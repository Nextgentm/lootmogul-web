import React from 'react'
import {
    Box,

    Center,
    Flex,
  
    Image as CImage,
    Text
} from "@chakra-ui/react";
const Pagination = ({totalPages,pageNo,setPageNo}) => {
  return (<>
    {totalPages > 0 && (
        <Center mt={"30px"} height="30px" py="50px">
            <Flex width={"440px"}>
                <CImage
                    width={pageNo > 0 ? "100px" : "60px"}
                    onClick={() => {
                        if (pageNo > 0) setPageNo(pageNo - 1);
                    }}
                    src={
                        pageNo > 0
                            ? `/assets/designupdate1/arrow-left-selected.svg`
                            : `/assets/designupdate1/arrow-left-unselected.svg`
                    }
                />

                <Box height="50px" mt="35px" mx="auto">
                    <Text
                        color="white"
                        fontSize={["1rem", "1.5rem"]}
                        fontFamily="Sora"
                        fontWeight="bold"
                        whiteSpace={"nowrap"}
                    >
                        Page {pageNo + 1} of {totalPages}
                    </Text>
                </Box>

                <CImage
                    overflow="hidden"
                    width={pageNo < totalPages - 1 ? "100px" : "60px"}
                    onClick={() => {
                        if (pageNo < totalPages - 1)
                            setPageNo(pageNo + 1);
                    }}
                    src={
                        pageNo < totalPages - 1
                            ? `/assets/designupdate1/arrow-right-selected.svg`
                            : `/assets/designupdate1/arrow-right-unselected.svg`
                    }
                />
            </Flex>
        </Center>
    )}
  </>)
}

export default Pagination