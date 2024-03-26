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
import strapi from "../../../../utils/strapi";
import {useEffect,useState} from "react";

function CustomTable({ columns, data, currentUser, rawData, noOfRec, pageCount, nextPage, currentPage, previousPage, user}) {
    

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,

        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                pageSize: noOfRec
            }
        },
        usePagination
    );
    return (
        <Box width="90%">
            <Table
                mt="5%"
                width="100%"
                tableLayout="fixed"
                bg="#240e45"
                variant="striped"
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
                    {currentPage !== 1 ? <Tooltip key="tootltip" label="Previous Page">
                        <ChevronLeftIcon
                            key="lefticon"
                            color="#43C8FF"
                            onClick={previousPage}
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                    :
                    <Tooltip key="tootltip" label="Previous Page">
                        <ChevronLeftIcon
                            key="lefticon"
                            color="#666"
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                    }
                </Flex>

                <Flex alignItems="center" key="paginator2">
                    <Text key="pagetext" flexShrink="0" color="white" mr={8}>
                        Page{" "}
                        <Text key="pagetext1" fontWeight="bold" as="span">
                            {currentPage}
                        </Text>{" "}
                        of{" "}
                        <Text key="pagetext2" fontWeight="bold" as="span">
                            {pageCount}
                        </Text>
                    </Text>
                </Flex>
                  
                <Flex key="righticon">
                    {currentPage !== pageCount ?  
                    <Tooltip label="Next Page" key="righticon1">
                        <ChevronRightIcon
                            key="righticon2"
                            isDisabled={currentPage == pageCount}
                            color="#43C8FF
"
                            onClick={nextPage}
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                    :
                    <Tooltip label="Next Page" key="righticon1">
                        <ChevronRightIcon
                            key="righticon2"
                            color="#666"
                            h={6}
                            w={6}
                        />
                    </Tooltip>
                    }
                </Flex>
                
            </Flex>
        </Box>
    );
}

function LeaderboardTable({ lbMetas, tableData, tableColumns, user, isMobile, nextPage, currentPage, previousPage,activeUserRank }) {
    const pageSize = 25; //change the table page size here
    //console.log("activeUserRank 2",activeUserRank);
    
    //const newData = activeUserRank ? [activeUserRank.data[0], ...tableData] : tableData;

    return (
        <CustomTable
            columns={makeColumn(tableColumns)}
            data={makeData(tableData, isMobile, user, pageSize)}
            user={user}
            rawData={tableData}
            noOfRec={pageSize}
            pageCount={lbMetas?.pagination?.pageCount}
            nextPage={nextPage}
            currentPage={currentPage}
            previousPage={previousPage}
        />
    );
}

export default LeaderboardTable;
