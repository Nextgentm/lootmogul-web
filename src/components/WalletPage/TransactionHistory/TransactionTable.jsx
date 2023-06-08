import React, { useState } from "react";
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
    Tooltip
} from "@chakra-ui/react";
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    ChevronDownIcon
} from "@chakra-ui/icons";

import { makeData, makeColumn } from "./makeData";
import CancelWithdraw from "../CancelWithdraw";

function CustomTable({ columns, data, alldata }) {
    const [isCancelModalActive, setCancelModalActive] = useState(false);
    const toggleCancelModal = (i) => {
        setCancelModalActive(!isCancelModalActive);
        setNestedId(nestedId ? i : -1)
    };

    const OnLoginClose = async () => {
        toggleCancelModal();
    };
    
    
    console.log("columns*-*-*-*-*-*", columns);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        nextPage,
        previousPage,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 25 }
        },
        usePagination
    );
    const [showPopUp, setshowpopup] = useState(false);
    const [nestedId, setNestedId] = useState();
    const rowclick = (e) => {
        let numericValue = parseInt(e.replace("#", ""));
        console.log("numericValue", numericValue);
        setNestedId(numericValue);
        let nestedData = alldata.find((i) => {
            numericValue == i.id;
        });
        console.log("nestedData-=-=-=", nestedData);
        if (showPopUp) {
            setshowpopup(false);
        } else {
            setshowpopup(true);
        }
    };
    return (
        <Box width="100%">
            <Table
                mt="5%"
                width="100%"
                tableLayout="fixed"
                bg="rgb(72 26 127 / 10%)"
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
                                bg="transparent linear-gradient(180deg, #481A7F 0%, #481A7F00 100%) 0% 0% no-repeat padding-box"
                                boxShadow="inset 0px 3px 18px #481A7F73"
                                key={index}
                                {...column.getHeaderProps()}
                            >
                                {column.render("Header")}
                            </Th>
                        ))
                    )}
                </Thead>
                <Tbody key="tbody_1" {...getTableBodyProps()} className="wallet-transaction-history">
                    {page.map((row, i) => {
                        prepareRow(row);

                        console.log("dar---------------", row.cells);

                        return (
                            <>
                                <Tr
                                    key={i}
                                    {...row.getRowProps()}
                                    onClick={() =>
                                        toggleCancelModal(i)//setNestedId(nestedId ? i : -1)
                                    }
                                    className={nestedId === i ? "active": ''}
                                >
                                    {row.cells.map((cell, j) => {
                                        return (
                                            <Td
                                                fontSize={["10px", "16px"]}
                                                color="#C7C7C7"
                                                py={[2, 4]}
                                                px={[4, 6]}
                                                fontWeight="bold"
                                                textAlign="center"
                                                fontFamily="Sora"
                                                key={j}
                                                {...cell.getCellProps()}
                                                // background={"#E90A63"}
                                            >
                                                {cell.render("Cell")}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                                {nestedId === i &&
                                    row?.subRows?.map((sRow, k) => {
                                        prepareRow(sRow);
                                        console.log("sRow");
                                        return (
                                            <Tr key={k} {...sRow.getRowProps()}>
                                                {sRow.cells.map((cell, i) => {
                                                    return (
                                                        <Td
                                                            fontSize={[
                                                                "10px",
                                                                "16px"
                                                            ]}
                                                            color="#C7C7C7"
                                                            py={[2, 4]}
                                                            px={[4, 6]}
                                                            fontWeight="bold"
                                                            textAlign="center"
                                                            fontFamily="Sora"
                                                            key={i}
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render(
                                                                "Cell"
                                                            )}
                                                        </Td>
                                                    );
                                                })}
                                            </Tr>
                                        );
                                    })}
                            </>
                        );
                    })}
                </Tbody>
            </Table>

            <Flex
                justifyContent="space-around"
                mt={20}
                mb={4}
                ml="auto"
                mr="auto"
                width="50%"
                alignItems="center"
            >
                <Flex key="paginator">
                    <Tooltip key="tootltip" label="Previous Page">                      
                        <img
                            src="/assets/designupdate1/arrow-left-unselected.png"
                            alt="Right"
                            onClick={previousPage}
                        />
                    </Tooltip>
                </Flex>

                <Flex alignItems="center" key="paginator2">
                    <Text key="pagetext" flexShrink="0" color="white" mr={8} fontSize={21}>
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
                        <img
                            src="/assets/designupdate1/arrow-right-selected.png"
                            alt="Right"
                            onClick={nextPage}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
            <CancelWithdraw
                isOpen={isCancelModalActive}
                OnLoginClose={OnLoginClose}
            />
        </Box>
       
            
            
        
    );
}

function TransactionTable({ tableData, tableColumns, isMobile, auditLogData }) {
    return (
        <CustomTable
            alldata={tableData}
            columns={makeColumn(tableColumns)}
            data={makeData(tableData, isMobile, auditLogData, tableData.length)}
        />
    );
}

export default TransactionTable;
