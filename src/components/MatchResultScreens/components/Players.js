import { Flex } from "@chakra-ui/react";
import React from "react";
import UserAvatar from "./UserAvatar";
const Players = ({ otherResults }) => {
    return (
        <Flex>
            {otherResults?.map((player, index) => (
                <UserAvatar key={"avatar" + index} userResult={player} />
            ))}
            {otherResults?.map((player, index) => (
                <UserAvatar key={"avatar" + index} userResult={player} />
            ))}
            {otherResults?.map((player, index) => (
                <UserAvatar key={"avatar" + index} userResult={player} />
            ))}
            {otherResults?.map((player, index) => (
                <UserAvatar key={"avatar" + index} userResult={player} />
            ))}
            {otherResults?.map((player, index) => (
                <UserAvatar key={"avatar" + index} userResult={player} />
            ))}
        </Flex>
    );
};
export default Players;
