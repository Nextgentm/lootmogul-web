import { Flex, Avatar, Text } from "@chakra-ui/react";

const RegisteredUsers = ({ user }) => {
    return (
        <Flex w="100%">
            <Avatar
                w="20%"
                mt="auto"
                mb="auto"
                boxSize="45px"
                name={user?.fullName}
                src={user?.photoURL}
            />
            <Flex
                w="100%"
                ml="2%"
                justifyContent={["space-between", "flex-start"]}
                direction={["row", "column"]}
            >
                <Text variant="textualVal" mt="auto" mb="auto" fontWeight={700}>
                    {user?.fullName}
                </Text>
            </Flex>
        </Flex>
    );
};
export default RegisteredUsers;
