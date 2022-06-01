import { Flex, Avatar, Text,Box } from "@chakra-ui/react";
import Image from "next/image";

const RegisteredUsers = ({ user }) => {
    return <Flex w="100%">
        <Avatar w="20%"  mt="auto" mb="auto" boxSize="30px" name={user?.fullName} src={user?.photoURL} />
        <Flex w="100%" ml="2%" justifyContent={["space-between","flex-start"]}direction={["row", "column"]}>
            <Text variant="textualVal" mt="auto" mb="auto" fontWeight={700}>{user?.fullName}</Text>
            <Flex flexFlow={["row-reverse","row"]} >
                {/* <Box ml={["10%","1%"]} mt="auto" mb="auto" width="16px" height="10px" pos="relative">
                    <Image alt="flag" layout="fill" src="/assets/images/india_flag.png" />
                    </Box>
                    <Text ml={["3%","1%"]} mt="auto" mb="auto">India</Text></Flex> */}

            </Flex>
        </Flex>
    </Flex>
}
export default RegisteredUsers;