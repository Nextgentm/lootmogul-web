import React from "react";
import { useTable, usePagination } from "react-table";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Flex,
    Box,
    Text,
    Tooltip,
    Avatar
} from "@chakra-ui/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { makeData, makeColumn } from "./makeData";

function CustomTable({ columns, data, currentUser, rawData, noOfRec }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                // pageSize: 25
                pageSize: noOfRec
            }
        },
        usePagination
    );

    const renderUserRow = (item) => {
        if (item?.rank <= 10) {
            return null;
        }

        return (
            <Tr>
                <Td
                    fontSize={["10px", "16px"]}
                    color="#C7C7C7"
                    py={[2, 4]}
                    px={[4, 6]}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="Sora"
                >
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

                        <Text
                            marginTop={["3px", "6px"]}
                            fontSize={["8px", "16px"]}
                        >
                            {item?.rank}
                        </Text>
                    </Flex>
                </Td>

                <Td>
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
                </Td>

                <Td>
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
                </Td>

                <Td>
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
                </Td>
            </Tr>
        );
    };

    return (
        <Box width="100%">
            <Table
                mt="5%"
                width="100%"
                tableLayout="fixed"
                bg="#1C1C1C"
                color="#C7C7C7"
                colorScheme="stripedTable"
                {...getTableProps()}
            >
                <Thead key="thead_1">
                    {headerGroups.map((headerGroup) =>
                        headerGroup.headers.map((column, index) => (
                            <Th
                                fontSize={["10px", "16px"]}
                                fontWeight="bold"
                                py={[2, 4]}
                                px={[4, 6]}
                                textAlign="center"
                                color="white"
                                key={index}
                                {...column.getHeaderProps()}
                            >
                                {column.render("Header")}
                            </Th>
                        ))
                    )}
                </Thead>

                <Tbody key="tbody_1" {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        const rowProps = {};

                        prepareRow(row);

                        if (i % 2 === 0) {
                            rowProps["backgroundColor"] = "#272727";
                        }

                        if (rawData?.[i]?.isActive === true) {
                            rowProps["backgroundColor"] = "#1A2445";
                        }

                        return (
                            <Tr key={i} {...row.getRowProps()} {...rowProps}>
                                {row.cells.map((cell, i) => {
                                    return (
                                        <Td
                                            fontSize={["10px", "16px"]}
                                            color="#C7C7C7"
                                            py={[2, 4]}
                                            px={[4, 6]}
                                            fontWeight="bold"
                                            textAlign="center"
                                            fontFamily="Sora"
                                            key={i}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </Td>
                                    );
                                })}
                            </Tr>
                        );
                    })}

                    {/* {renderUserRow(currentUser)} */}
                </Tbody>
            </Table>

            <Flex
                justifyContent="space-around"
                mt={4}
                mb={4}
                ml="auto"
                mr="auto"
                width="50%"
                alignItems="center"
            >
                <Flex key="paginator">
                    <Tooltip key="tootltip" label="Previous Page">
                        <ChevronLeftIcon
                            key="lefticon"
                            isDisabled={!canPreviousPage}
                            color="#43C8FF
"
                            onClick={previousPage}
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center" key="paginator2">
                    <Text key="pagetext" flexShrink="0" color="white" mr={8}>
                        Page{" "}
                        <Text key="pagetext1" fontWeight="bold" as="span">
                            {pageIndex + 1}
                        </Text>{" "}
                        of{" "}
                        <Text key="pagetext2" fontWeight="bold" as="span">
                            {pageOptions.length}
                        </Text>
                    </Text>
                </Flex>

                <Flex key="righticon">
                    <Tooltip label="Next Page" key="righticon1">
                        <ChevronRightIcon
                            key="righticon2"
                            isDisabled={!canNextPage}
                            color="#43C8FF
"
                            onClick={nextPage}
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </Box>
    );
}

function LeaderboardTable({ tableData, tableColumns, user, isMobile }) {
    const pageSize = 25; //change the table page size here
    return (
        <CustomTable
            columns={makeColumn(tableColumns)}
            data={makeData(tableData, isMobile, user, pageSize)}
            user={user}
            rawData={tableData}
            noOfRec={pageSize}
        />
    );
}

export default LeaderboardTable;
