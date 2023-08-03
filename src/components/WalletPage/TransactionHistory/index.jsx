import React, { useState, forwardRef, useContext, memo } from "react";
import {
    Grid,
    GridItem,
    Box,
    Heading,
    Flex,
    InputGroup,
    Input,
    InputLeftElement,
    Select,
    Text,
    Image
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useBreakpointValue } from "@chakra-ui/react";
const DatePicker = dynamic(() => import("react-datepicker"));
import "react-datepicker/dist/react-datepicker.css";

import moment from "moment";
import strapi from "../../../utils/strapi";
import AppContext from "../../../utils/AppContext";
import TransactionTable from "./TransactionTable";
import TableNew from "./tableNew";
import * as Sentry from "@sentry/nextjs";

// eslint-disable-next-line react/display-name
const TransactionHistory = memo(() => {
    const { user, amounts, withdrawFetch, toggleWithdrawFetch } =
        useContext(AppContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState("all");
    const [auditLogData, setAuditLogData] = useState([]);
    const [startingDate, setStartingDate] = useState(
        moment().subtract(1, "weeks").format("YYYY-MM-DD")
    );

    const [endingDate, setEndingDate] = useState(
        moment().endOf("day").format("YYYY-MM-DD")
    );

    const statusOptions = ["All", "Success", "Pending", "Failed"];
    const currentSize = useBreakpointValue({
        base: "base",
        sm: "sm",
        md: "md"
    });

    const fetchData = async (
        status = "all",
        keyword = "",
        startingDate = startingDate,
        endingDate = endingDate
    ) => {
        try {
            setLoading(true);
            let pageNo = 1;
            let pageCount = 1;
            let data = [];

            let filters = {
                type: { $in: ["credit", "debit", "hold"] }
            };
            if (keyword !== "") {
                filters["id"] = keyword;
            }

            if (status !== "all") {
                filters["status"] = status;
            }
            if (startingDate && endingDate) {
                filters["updatedAt"] = { $gte: startingDate, $lte: endingDate };
            }

            do {
                const res = await strapi.find("transaction-infos", {
                    populate: [
                        "contest.contestmaster",
                        "currency",
                        "eventmaster",
                        "transactions"
                    ],
                    sort: "id:DESC",
                    pagination: {
                        page: pageNo,
                        pageSize: 60
                    }
                });
                //console.log("Trasanction DATA =-=-=-=-=-=", res);

                if (res?.meta) {
                    // remove all transaction-info data which has no transactions
                    // console.log("res.data", res.data);
                    res.data = res.data.filter((item) => {
                        return item.transactions.data.length > 0;
                    });

                    res.data.forEach((item) => {
                        if (item.eventmaster.data.code === "JOIN_CONTEST") {
                            const closingBalance =
                                item.transactions.data.reduce((acc, curr) => {
                                    if (
                                        acc.closingBalance < curr.closingBalance
                                    ) {
                                        return acc;
                                    } else {
                                        return curr;
                                    }
                                });

                            item.closingBalance = closingBalance.closingBalance;
                        }
                    });

                    data.push(res.data);
                    if (pageCount == 1) {
                        pageCount = res.meta.pagination.pageCount;
                    }
                }
                pageNo++;
            } while (pageNo <= pageCount);

            const currDataTxnId = data.flat().map((i) => {
                return i.transactions.data.map((j) => {
                    return j.id;
                });
            });

            // console.log("currDataTxnId", currDataTxnId.flat());

            pageNo = 1;
            pageCount = 1;
            do {
                const res = await strapi.find("transactions", {
                    populate: [
                        "contest.contestmaster",
                        "currency",
                        "eventmaster",
                        "transactions"
                    ],
                    sort: "id:DESC",
                    pagination: {
                        page: pageNo,
                        pageSize: 60
                    }
                });
                // console.log("Trasanction DATA =-=-=-=-=-=", res);

                if (res?.meta) {
                    // console.log("res.data", res.data);
                    // console.log("currDataTxnId.flat()", currDataTxnId.flat());
                    // filter code DEPOSIT and name Deposit Cash from transaction data inside eventmaster
                    let filterData = res.data.filter((item) => {
                        // if (
                        //     item.eventmaster &&
                        //     item.eventmaster.data &&
                        //     item.eventmaster.data.name
                        // ) {
                        //     return (
                        //         item.eventmaster.data.name === "Deposit Cash"
                        //     );
                        // }
                        // return true;

                        return !currDataTxnId.flat().includes(item.id);
                    });
                    // console.log("filterData", filterData);
                    data.push(filterData);
                    if (pageCount == 1) {
                        pageCount = res.meta.pagination.pageCount;
                    }
                }
                pageNo++;
            } while (pageNo <= pageCount);

            data = data.flat();
            let dataBeforeConvertion = data.filter(
                (i) => new Date(i.createdAt) <= new Date("2023-01-25")
            );
            let dataAfterConvertion = data.filter(
                (i) => new Date(i.createdAt) >= new Date("2023-01-25")
            );
            if (dataBeforeConvertion.length && dataAfterConvertion) {
                const auditLogs = await strapi.find(
                    "chips-coversion-histories",
                    {
                        filters: {
                            users_permissions_user: {
                                id: user.id
                            }
                        },
                        populate: ["currency"],
                        sort: "id:DESC"
                    }
                );
                if (auditLogs?.data?.length) {
                    let data = auditLogs?.data.map((i) => {
                        return {
                            ...i,
                            createdAt: new Date("2023-01-25").toISOString()
                        };
                    });
                    setAuditLogData(data);
                }
            }
            setLoading(false);
            console.log("data", data);
            setData(data);
        } catch (error) {
            setLoading(false);

            const myException = {
                message: error,
                code: 500
            };
            Sentry.captureMessage(JSON.stringify(myException));
        }
    };

    const handleChangeKeyword = (e) => {
        const newKeyword = e.target.value;
        setKeyword(newKeyword);
        fetchData(status, newKeyword, startingDate, endingDate);
    };

    const handleChangeStatus = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        fetchData(newStatus, keyword, startingDate, endingDate);
    };

    React.useEffect(() => {
        console.log("user?.id", user?.id);
        if (withdrawFetch) {
            fetchData();
        }
        toggleWithdrawFetch(false);
    }, [withdrawFetch]);

    return (
        <Box mt="40px">
            <Heading
                color="white"
                fontFamily="Sora"
                variant="hint"
                fontSize={["22px", "22px", "31px"]}
            >
                TRANSACTION HISTORY
            </Heading>

            <Grid
                templateColumns={`repeat(${
                    currentSize === "base" ? 1 : 4
                }, 1fr)`}
                gap={6}
                mt="20px"
            >
                <GridItem w="100%">
                    <SearchBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "0px",
                            outline: "none !important",
                            boxShadow: "none !important"
                        }}
                        value={keyword}
                        onChange={handleChangeKeyword}
                    />
                </GridItem>

                <GridItem w="100%">
                    <SelectBox
                        style={{
                            border: "1px solid #FFFFFF",
                            borderRadius: "0px",
                            alignItems: "center",
                            width: "100%"
                        }}
                        icon={
                            <Image
                                alt="all"
                                src="/assets/all.png"
                                width={19}
                                height={19}
                                mr="10px"
                            />
                        }
                        title="Status"
                        options={statusOptions}
                        onChange={handleChangeStatus}
                    />
                </GridItem>

                <GridItem w="100%">
                    <CustomDatePicker
                        icon={
                            <Image
                                alt="Calender"
                                src="/assets/Calender.png"
                                width={19}
                                height={19}
                                mr="5px"
                            />
                        }
                        title={"Date Range From "}
                        value={startingDate}
                        onChange={(e) => {
                            setStartingDate(new Date(e));
                            fetchData(status, keyword, new Date(e), endingDate);
                        }}
                    />
                </GridItem>

                <GridItem w="100%">
                    <CustomDatePicker
                        startingDate={startingDate}
                        icon={
                            <Image
                                alt="Calender"
                                src="/assets/Calender.png"
                                width={19}
                                height={19}
                                mr="5px"
                            />
                        }
                        title={"Date Range To "}
                        value={endingDate}
                        onChange={(e) => {
                            setEndingDate(new Date(e));
                            fetchData(
                                status,
                                keyword,
                                startingDate,
                                new Date(e)
                            );
                        }}
                    />
                </GridItem>
            </Grid>

            {data && (
                <Box width="100%">
                    {currentSize === "base" ? (
                        data?.length > 0 ? (
                            <>
                                <TransactionTable
                                    fetchData={fetchData}
                                    isMobile={true}
                                    tableData={data}
                                    auditLogData={auditLogData}
                                    tableColumns={[
                                        "S.NO",
                                        "TRANSACTION ID",
                                        "ACTIVITY",
                                        "CHIPS",
                                        "CLOSING BALANCE",
                                        "STATUS",
                                        "DATE",
                                        "ACTION"
                                    ]}
                                />
                            </>
                        ) : (
                            <Box>
                                <Text style={{ textAlign: "center" }}>
                                    {loading
                                        ? "loading.."
                                        : "There are no transactions!"}
                                </Text>
                            </Box>
                        )
                    ) : data?.length > 0 ? (
                        <>
                            {/* <TableNew
                                tableData={data}
                                auditLogData={auditLogData}
                            /> */}
                            <TransactionTable
                                fetchData={fetchData}
                                tableData={data}
                                auditLogData={auditLogData}
                                tableColumns={[
                                    "S.NO",
                                    "TRANSACTION ID",
                                    "ACTIVITY",
                                    "CHIPS",
                                    "CLOSING BALANCE",
                                    "STATUS",
                                    "DATE",
                                    "ACTION"
                                ]}
                            />
                        </>
                    ) : (
                        <Box>
                            <Text style={{ textAlign: "center" }}>
                                {loading
                                    ? "loading.."
                                    : "There are no transactions!"}
                            </Text>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
});
export default TransactionHistory;

const MobileTable = ({ data, loading }) => {
    return (
        <Box mt={6}>
            <Grid
                templateColumns="minmax(100px, auto) 1fr 1fr 1fr"
                bg="#272727"
                p={6}
                py={3}
                gap={3}
            >
                <GridItem>
                    <Text
                        fontSize="10px"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        TRANSACTIONS
                    </Text>
                </GridItem>

                <GridItem>
                    <Text
                        fontSize="10px"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        ACTIVITY
                    </Text>
                </GridItem>

                <GridItem>
                    <Text
                        fontSize="10px"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        STATUS
                    </Text>
                </GridItem>

                <GridItem>
                    <Text
                        fontSize="10px"
                        color="white"
                        fontWeight="bold"
                        textAlign="center"
                    >
                        CHIPS
                    </Text>
                </GridItem>
            </Grid>

            <Box>
                {data && data?.length > 0 ? (
                    data.map((transaction, index) => (
                        <Grid
                            templateColumns="minmax(100px, auto) 1fr 1fr 1fr"
                            bg="#1C1C1C"
                            p={6}
                            py={3}
                            my={1}
                            gap={3}
                        >
                            <GridItem>
                                <Text
                                    fontSize="10px"
                                    color="#C7C7C7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    fontFamily="Sora"
                                >
                                    #{transaction?.id}
                                </Text>

                                <Flex justifyContent="space-between">
                                    <Text
                                        fontSize="10px"
                                        color="#C7C7C7"
                                        textAlign="center"
                                        fontFamily="Sora"
                                    >
                                        {moment(transaction?.createdAt).format(
                                            "DD-MM-YYYY, HH:mm"
                                        )}
                                    </Text>
                                </Flex>
                            </GridItem>

                            <GridItem>
                                <Text
                                    fontSize="10px"
                                    color="#C7C7C7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    fontFamily="Sora"
                                >
                                    {(transaction?.type === "debit" ||
                                        transaction?.type === "hold") &&
                                    transaction?.contest?.data?.contestmaster
                                        ?.data?.name
                                        ? "Played " +
                                          transaction.contest.data.contestmaster
                                              .data.name
                                        : transaction?.type === "credit" &&
                                          transaction?.contest?.data
                                              ?.contestmaster?.data?.name
                                        ? "Won in " +
                                          transaction.contest.data.contestmaster
                                              .data.name
                                        : transaction?.eventmaster?.data?.name
                                        ? transaction.eventmaster.data.name
                                        : "transaction"}
                                </Text>
                            </GridItem>

                            <GridItem>
                                <Text
                                    fontSize="10px"
                                    color="#C7C7C7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    fontFamily="Sora"
                                >
                                    {transaction?.status}
                                </Text>
                            </GridItem>

                            <GridItem>
                                <Text
                                    fontSize="10px"
                                    color="#C7C7C7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    fontFamily="Sora"
                                >
                                    {transaction?.type === "debit" ||
                                    transaction?.type === "hold" ? (
                                        <Text color="#FF6E3B" fontWeight="bold">
                                            -${transaction?.chips}
                                        </Text>
                                    ) : (
                                        <Text color="#51E36E" fontWeight="bold">
                                            +${transaction?.chips}
                                        </Text>
                                    )}
                                </Text>
                            </GridItem>
                        </Grid>
                    ))
                ) : (
                    <Text>
                        {loading ? "loading.." : "There are no transactions!"}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

const SearchBox = ({ style, value, onChange }) => {
    return (
        <InputGroup style={style}>
            <InputLeftElement border="none" pointerEvents="none">
                <Image
                    alt="Search"
                    src="/assets/search_icon.png"
                    width={19}
                    height={19}
                />
            </InputLeftElement>

            <Input
                type="text"
                border="none"
                placeholder="Transaction id (Ex: 1234)"
                _focus={{ boxShadow: "none", color: "white" }}
                value={value}
                onChange={onChange}
            />
        </InputGroup>
    );
};

const SelectBox = ({ style, icon, title, options, onChange }) => {
    return (
        <Flex style={style}>
            <Box pl={4}>{icon}</Box>

            <Select
                pl="0%"
                border="none"
                color="white"
                _focus={{ borderColor: "transparent", boxShadow: "none" }}
                onChange={onChange}
                style={{ paddingLeft: "6px" }}
            >
                {options &&
                    options.map((item) => {
                        return (
                            <option
                                style={{
                                    backgroundColor: "black",
                                    color: "white"
                                }}
                                key={item}
                                value={`${item}`.toLowerCase()}
                            >
                                {item}
                            </option>
                        );
                    })}
            </Select>
        </Flex>
    );
};

const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
        className="example-custom-input"
        onClick={onClick}
        ref={ref}
        style={{ color: "#E90A63", flex: 1, fontWeight: "bold" }}
    >
        {value}
    </button>
));
ExampleCustomInput.displayName = "ExampleCustomInput";

const CustomDatePicker = ({ icon, title, startingDate, value, onChange }) => {
    return (
        <Flex
            style={{
                border: "1px solid white",
                padding: "8px 16px",
                borderRadius: "0px",
                alignItems: "center"
            }}
        >
            <Flex justifyContent="center" alignItems="center">
                <Box>{icon}</Box>
                <Text color="white" ml={2} width="150px">
                    {title}
                </Text>
            </Flex>

            <DatePicker
                selected={new Date(value)}
                onChange={onChange}
                customInput={<ExampleCustomInput />}
                minDate={startingDate ? new Date(startingDate) : null}
                maxDate={new Date()}
            />
        </Flex>
    );
};
