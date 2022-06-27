import { ChevronDownIcon } from "@chakra-ui/icons";
import { Text, Box, Flex, Image, Avatar } from "@chakra-ui/react";

const IMG_GOLD_MEDAL = "/assets/images/gold-medal.png";
const IMG_SILVER_MEDAL = "/assets/images/silver-medal.png";
const IMG_BRONZE_MEDAL = "/assets/images/bronze-medal.png";

const renderTopRank = (rank) => {
    let src = "";

    switch (rank) {
        case 1:
            src = IMG_GOLD_MEDAL;
            break;

        case 2:
            src = IMG_SILVER_MEDAL;
            break;

        case 3:
            src = IMG_BRONZE_MEDAL;
            break;
    }

    return (
        <Flex align="center" justify="center">
            <Image
                borderRadius="full"
                boxSize={["19px", "42px"]}
                src={src}
                alt=""
                objectFit="contain"
            />
        </Flex>
    );
};

const transformTableData = (item, isMobile, index, user) => {
    const renderRank = () => {
        if (item?.isActive || user?.id === item?.user?.data?.id) {
            return (
                <Flex align="center" justify="center" direction="column">
                    <Flex align="center">
                        <Box
                            width="12px"
                            height="12px"
                            backgroundColor="#FFC533"
                            borderRadius="50%"
                            textAlign={"center"}
                            boxShadow="inset 0px -2px 2px rgba(0, 0, 0, 0.35)"
                        ></Box>

                        <Text marginLeft="6px" fontSize={["8px", "16px"]}>
                            YOU
                        </Text>
                    </Flex>

                    <Text marginTop={["3px", "6px"]} fontSize={["8px", "16px"]}>
                        {item.rank}
                    </Text>
                </Flex>
            );
        } else {
            return (
                <Box>
                    {item?.rank <= 3 ? renderTopRank(item?.rank) : item?.rank}
                </Box>
            );
        }
    };

    if (!isMobile) {
        return {
            rank: renderRank(),
            players: (
                <Box padding="0">
                    <Flex align="center">
                        <Avatar
                            name={
                                item?.user?.data?.fullName
                                    ? item?.user?.data?.fullName
                                    : item?.user?.data?.username
                            }
                            src={item?.user?.data?.photoURL}
                        />

                        <Text
                            fontSize={["12px", "16px"]}
                            color="white"
                            fontWeight="bold"
                            textAlign="left"
                            fontFamily="Sora"
                            marginLeft="16px"
                        >
                            {item?.user?.data?.fullName
                                ? item?.user?.data?.fullName
                                : item?.user?.data?.username}
                        </Text>
                    </Flex>
                </Box>
            ),
            prize: (
                <Box>
                    <Text
                        fontSize={["12px", "14px"]}
                        color="#C7C7C7"
                        fontWeight="bold"
                        textAlign="center"
                        fontFamily="Sora"
                    >
                        {item?.prize}
                    </Text>
                </Box>
            ),
            score: (
                <Box>
                    <Text
                        fontSize={["12px", "14px"]}
                        color="#C7C7C7"
                        fontWeight="bold"
                        textAlign="center"
                        fontFamily="Sora"
                    >
                        {item?.score}
                    </Text>
                </Box>
            ),
            action: <ChevronDownIcon />
        };
    } else {
        return {
            rank: renderRank(),
            players: (
                <Box>
                    <Flex align="center">
                        <Text
                            fontSize={["8px", "16px"]}
                            color="white"
                            fontWeight="bold"
                            textAlign="left"
                            fontFamily="Sora"
                            marginLeft="6px"
                            flex="1"
                        >
                            {item?.user?.data?.fullName
                                ? item?.user?.data?.fullName
                                : item?.user?.data?.username}
                        </Text>
                    </Flex>
                </Box>
            ),
            prize: (
                <Box>
                    <Text
                        fontSize={["8px", "14px"]}
                        color="#C7C7C7"
                        fontWeight="bold"
                        textAlign="center"
                        fontFamily="Sora"
                    >
                        {item?.prize}
                    </Text>
                </Box>
            ),
            score: (
                <Box>
                    <Text
                        fontSize={["8px", "14px"]}
                        color="#C7C7C7"
                        fontWeight="bold"
                        textAlign="center"
                        fontFamily="Sora"
                    >
                        {item?.score}
                    </Text>
                </Box>
            ),
            action: <ChevronDownIcon />
        };
    }
};

export function makeData(tableData, isMobile, user, pageSize) {
    tableData.map((item, index) => {
        if (item.user.data.id === user?.id && item.rank > pageSize) {
            var element = tableData[index];

            tableData.splice(index, 1);
            tableData.splice(pageSize - 1, 0, element);
        }
    });

    tableData = tableData?.map((item, index) => {
        return {
            ...transformTableData(item, isMobile, index, user)
        };
    });

    return tableData;
}

export function makeColumn(tableColumns) {
    tableColumns = tableColumns.map((col) => {
        return {
            Header: col,
            accessor: col.toLowerCase().replace(/ /g, "")
        };
    });
    return tableColumns;
}
