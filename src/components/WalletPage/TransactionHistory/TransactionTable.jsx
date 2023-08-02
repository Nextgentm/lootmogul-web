import React, { useState, useContext } from "react";
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
    ChevronDownIcon,
    ChevronUpIcon
} from "@chakra-ui/icons";
import AppContext from "../../../utils/AppContext";

import { makeData, makeColumn } from "./makeData";
import CancelWithdraw from "../CancelWithdraw";
import ConfirmWithdrawal from "../ConfirmWithdrawal";
import { useEffect } from "react";
import axios from "axios";

function CustomTable({ columns, data, alldata }) {
    const [isCancelModalActive, setCancelModalActive] = useState(false);
    const [modelData, setModelData] = useState();
    const [isCancelProcesseedModalActive, setCancelProcesseedModalActive] =
        useState(false);
    const [activityValue, setActivityValue] = useState("");
    const [reason, setReason] = useState("");
    const { refetchChange } = useContext(AppContext);

    const toggleCancelModal = (i) => {
        //setCancelModalActive(!isCancelModalActive);
        //setNestedId(nestedId ? i : -1);
    };

    const OnLoginClose = async () => {
        toggleCancelModal();
    };

    //console.log("alldata*-*-*-*-*-*", alldata);
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
            initialState: { pageIndex: 0, pageSize: 6 }
        },
        usePagination
    );
    const [showPopUp, setshowpopup] = useState(false);
    const [nestedId, setNestedId] = useState();

    const rowclick = (e) => {
        let numericValue = parseInt(e.replace("#", ""));
        // setNestedId(numericValue);
        let model = alldata.find((i) => {
            return i.id == numericValue;
        });
        setModelData(model);
        if (showPopUp) {
            setshowpopup(false);
        } else {
            setshowpopup(true);
        }

        confirmcancel();
    };

    const confirmcancel = async (id = null) => {
        //console.log("modelData-------", modelData);
        //console.log("cancel");
        // delete modelData.id;
        // console.log("modelData", modelData);
        setCancelModalActive(!isCancelModalActive);
        // modelData.status = "cancelled";

        if (id) {
            let newwithdrawal = {
                ...modelData,
                status: "cancelled"
            };
            //cancelled
            // console.log("newwithdrawal", newwithdrawal);

            const resp = await axios.post(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/withdrawals/cancel`,
                {
                    id: newwithdrawal.id,
                    reason
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "strapi_jwt"
                        )}`
                    }
                }
            );

            // console.log("resp", resp);

            setCancelProcesseedModalActive(true);
            refetchChange();
        }
    };

    const closeWithdrawaModal = () => {
        setCancelModalActive(false);
        setCancelProcesseedModalActive(false);
    };

    const closeProcesseedModal = () => {
        setCancelProcesseedModalActive(false);
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
                {/* {console.log("page", page)} */}
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
                <Tbody
                    key="tbody_1"
                    {...getTableBodyProps()}
                    className="wallet-transaction-history"
                >
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <>
                                <Tr
                                    key={i}
                                    {...row.getRowProps()}
                                    onClick={() => {
                                        // toggleCancelModal(i);
                                        if (row?.subRows?.length > 1) {
                                            if (nestedId === i) {
                                                setNestedId(-1);
                                            } else {
                                                setNestedId(i);
                                                setActivityValue(
                                                    row.original.activity
                                                );
                                            }
                                        }
                                        // rowclick(row.cells[0].value);
                                    }}
                                    className={nestedId === i ? "active" : ""}
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
                                                onClick={(e) => {
                                                    if (
                                                        e.target.value ===
                                                        "cancel"
                                                    ) {
                                                        rowclick(
                                                            row.cells[1].value
                                                        );
                                                    }
                                                }}
                                            >
                                                {cell.column.id === "action" &&
                                                nestedId === i ? (
                                                    <>
                                                        <ChevronUpIcon
                                                            cursor="pointer"
                                                            fontSize="40px"
                                                        />
                                                    </>
                                                ) : (
                                                    cell.render("Cell")
                                                )}
                                            </Td>
                                        );
                                    })}
                                </Tr>
                                {nestedId === i &&
                                    row?.subRows?.map((sRow, k) => {
                                        prepareRow(sRow);
                                        //console.log("sRow");
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
                                                            {cell.column.id ===
                                                            "activity" ? (
                                                                <>
                                                                    {
                                                                        activityValue
                                                                    }
                                                                </>
                                                            ) : (
                                                                cell.render(
                                                                    "Cell"
                                                                )
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
                    <Text
                        key="pagetext"
                        flexShrink="0"
                        color="white"
                        mr={8}
                        fontSize={21}
                    >
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
            <ConfirmWithdrawal
                isOpen={isCancelProcesseedModalActive}
                OnLoginClose={OnLoginClose}
                closeWithdrawaModal={closeProcesseedModal}
            />
            <CancelWithdraw
                isOpen={isCancelModalActive}
                OnLoginClose={OnLoginClose}
                modelData={modelData}
                confirmcancel={confirmcancel}
                closeWithdrawaModal={closeWithdrawaModal}
                setReason={setReason}
            />
        </Box>
    );
}

function TransactionTable({ tableData, tableColumns, isMobile, auditLogData }) {
    const [alteredData, setAlteredData] = useState([]);
    const [alteredColumn, setAlteredColumn] = useState([]);
    useEffect(() => {
        // console.log(refetchChange);
        const newData = makeData(
            tableData,
            isMobile,
            auditLogData,
            tableData.length
        );

        if (!newData) return;
        newData.forEach((e, i) => {
            e["sno"] = i + 1;
        });

        // console.log(newData);

        setAlteredData(newData);
    }, [tableData]);

    useEffect(() => {
        const newColumn = makeColumn(tableColumns);
        newColumn.forEach((e, i) => {
            if (e.accessor === "s.no") {
                e.accessor = "sno";
            }
        });
        setAlteredColumn(newColumn);
    }, [tableColumns]);

    return (
        <CustomTable
            alldata={tableData}
            columns={alteredColumn}
            data={alteredData}
        />
    );
}

export default TransactionTable;
