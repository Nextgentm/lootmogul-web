import { ChevronDownIcon } from "@chakra-ui/icons";
import { Text, Box, Flex, Button } from "@chakra-ui/react";
import moment from "moment";
import { Tooltip } from "@chakra-ui/react";
import { InfoIcon } from "../../Icons";

const transactionTableData = (transaction, isMobile) => {
    // console.log("transaction-=-=-=-=-=-=-=-", transaction);

    return {
        transactionid: isMobile ? (
            <Box>
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
            </Box>
        ) : (
            "#" + transaction.id
        ),
        activity:
            (transaction?.type === "debit" || transaction?.type === "hold") &&
            transaction?.contest?.data?.contestmaster?.data?.name ? (
                "Played " + transaction.contest.data.contestmaster.data.name
            ) : transaction?.type === "credit" &&
              transaction?.contest?.data?.contestmaster?.data?.name ? (
                "Won in " + transaction.contest.data.contestmaster.data.name
            ) : transaction?.eventmaster?.data?.name ? (
                transaction.eventmaster.data.name
            ) : transaction?.balanceBeforeConversion ? (
                transaction?.currency?.data?.name +
                " wallet amount " +
                transaction?.balanceBeforeConversion +
                "USD is converted to " +
                Math.round(transaction?.balanceBeforeConversion + 7) +
                " CHIPS"
            ) : (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <div style={{ marginRight: "4px" }}>
                            {"transaction"}
                        </div>
                        {transaction?.note && (
                            <Box>
                                <Tooltip
                                    label={transaction?.note}
                                    bg="#383838"
                                    borderRadius="10px"
                                    fontSize="sm"
                                    p="10px"
                                    placement="bottom-start"
                                >
                                    <span>
                                        <InfoIcon
                                            float="right"
                                            mt="0px!important"
                                            boxSize={"20px"}
                                        />
                                    </span>
                                </Tooltip>
                            </Box>
                        )}
                    </div>
                </>
            ),
        chips:
            transaction?.type === "debit" || transaction?.type === "hold" ? (
                <Text color="#fff" fontWeight="400">
                    -{Number(transaction?.chips).toFixed(2)} CHIPS
                </Text>
            ) : (
                <Text color="#fff" fontWeight="400">
                    +
                    {Number(transaction?.chips).toFixed(2) ||
                        Number(
                            transaction?.balanceBeforeConversion + 7
                        ).toFixed(2)}{" "}
                    CHIPS
                </Text>
            ),

        closingbalance: (
            <Text color="#fff" fontWeight="400">
                {transaction?.closingBalance
                    ? Number(transaction?.closingBalance).toFixed(2) + " CHIPS"
                    : "-"}
            </Text>
        ),

        status: (
            <Box>
                <Text
                    fontSize={["12px", "14px"]}
                    color="#C7C7C7"
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="Sora"
                >
                    {transaction?.status
                        ? transaction?.status
                        : transaction?.balanceBeforeConversion
                        ? "success"
                        : ""}
                </Text>

                <Text
                    fontSize={["5px", "8px"]}
                    color="#C7C7C7"
                    textAlign="center"
                    fontFamily="Sora"
                    textTransform="uppercase"
                >
                    {transaction?.type}
                </Text>
            </Box>
        ),
        date: moment(transaction?.createdAt).format("DD-MM-YYYY, HH:mm"),
        action:
            transaction?.transactions?.data?.length > 1 ? (
                <ChevronDownIcon cursor="pointer" fontSize="40px" />
            ) : transaction?.status == "pending" &&
              transaction?.eventmaster?.data?.code.toLowerCase() ===
                  "withdraw" ? (
                <>
                    <Button
                        // mt="18px"
                        fontFamily="Sora !important "
                        fontWeight="500"
                        padding={["0px 30px", "0px 36px", "10px 30px"]}
                        boxShadow="inset 0 0 0px 0px #481A7F"
                        fontSize="12px"
                        height={["30px", "30px", "25px", "25px"]}
                        bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
                        filter="drop-shadow(0 0 20px #FF0080)"
                        p="28px"
                        width="100px"
                        value="cancel"
                    >
                        CANCEL
                    </Button>
                    {/* <Button
            mt="18px"
            fontFamily="Sora !important "
            fontWeight="500"
            padding={[
                "0px 30px",
                "0px 36px",
                "10px 30px"
            ]}
            boxShadow="inset 0 0 0px 0px #481A7F"
            fontSize="12px"
            height={["30px", "30px", "25px", "25px"]}
            bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
            filter="drop-shadow(0 0 20px #FF0080)"
            p="28px"
            width="100px"
        >
            Confirm
        </Button>    */}
                </>
            ) : (
                ""
            ),
        subRows:
            transaction.transactions && transaction.transactions.data
                ? transaction.transactions.data.map((s) =>
                      transactionTableData(s, isMobile)
                  )
                : undefined
    };
};

export const makeData = (tableData, isMobile, auditLogData) => {
    tableData.push(...auditLogData);
    const sortedArray = _.uniqWith(
        _.orderBy(tableData, [(obj) => new Date(obj.createdAt)], ["desc"]),
        _.isEqual
    );

    tableData = sortedArray.map((transaction) => {
        return {
            ...transactionTableData(transaction, isMobile)
        };
    });
    // console.clear()
    //console.log("tableData-=-=-=-=-=-=-=-=-=-=-", tableData);
    return tableData;
};
export function makeColumn(tableColumns) {
    tableColumns = tableColumns.map((col) => {
        return {
            Header: col,
            accessor: col.toLowerCase().replace(/ /g, "")
        };
    });
    return tableColumns;
}
