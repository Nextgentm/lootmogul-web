import { ChevronDownIcon } from "@chakra-ui/icons";
import { Text, Box, Flex } from "@chakra-ui/react";
import moment from "moment";

const transactionTableData = (transaction, isMobile) => {
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
                transaction?.contest?.data?.contestmaster?.data?.name
                ? "Played " + transaction.contest.data.contestmaster.data.name
                : transaction?.type === "credit" &&
                    transaction?.contest?.data?.contestmaster?.data?.name
                    ? "Won in " + transaction.contest.data.contestmaster.data.name
                    : transaction?.eventmaster?.data?.name
                        ? transaction.eventmaster.data.name
                        : transaction?.balanceBeforeConversion ? transaction?.currency?.data?.name + " wallet amount " + transaction?.balanceBeforeConversion + 'USD is converted to ' + Math.round(transaction?.balanceBeforeConversion + 7) + ' CHIPS' : "transaction"
        ,
        chips:
            transaction?.type === "debit" || transaction?.type === "hold" ? (
                <Text color="#fff" fontWeight="400">
                    -{transaction?.amount} CHIPS
                </Text>
            ) : (
                <Text color="#fff" fontWeight="400">
                    +{transaction?.amount || Math.round(transaction?.balanceBeforeConversion + 7)} CHIPS
                </Text>
            ),

        closingbalance:
            <Text color="#fff" fontWeight="400">
                {transaction?.closingBalance ? transaction?.closingBalance + ' CHIPS' : '-'}
            </Text>,

        status: (
            <Box>
                <Text
                    fontSize={["12px", "14px"]}
                    color="#C7C7C7"
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="Sora"
                >
                    {transaction?.status ? transaction?.status : transaction?.balanceBeforeConversion ? "success" : ''}
                </Text>

                <Text
                    fontSize={["5px", "8px"]}
                    color="#C7C7C7"
                    textAlign="center"
                    fontFamily="Sora"
                    textTransform='uppercase'
                >
                    {transaction?.type}
                </Text>
            </Box>
        ),
        date: moment(transaction?.createdAt).format("DD-MM-YYYY, HH:mm"),
        action: <ChevronDownIcon />
    };
};

export const makeData = (tableData, isMobile, auditLogData) => {

    tableData.push(...auditLogData)
    const sortedArray = _.uniqWith(_.orderBy(tableData, [(obj) => new Date(obj.createdAt)], ['desc']), _.isEqual);

    tableData = sortedArray.map((transaction) => {
        return {
            ...transactionTableData(transaction, isMobile)
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
