import {
    Box,
    Flex,
    Text,
    Avatar,
    Wrap,
    Image,
    VStack,
    Center
} from "@chakra-ui/react";
import { PointIcon } from "../../Icons";
import React from "react";
import UserAvatar from "./UserAvatar";
const Players = ({ otherResults }) => {
    const colours = ["#161C3A", "#202847", "#2B3554", "#364261", "#161C3A"];
    const svg = ["#7C54DC", "#FF6E3B", "#E2D173", "#51E36E", "#FF2E00"];

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
