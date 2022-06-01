
import { 
  ChevronDownIcon
} from "@chakra-ui/icons";
import{Text, Box, Flex} from "@chakra-ui/react";
import moment from "moment";

const range = len => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const transactionTableData = (transaction,isMobile) => {
  return {
    transactionid: isMobile?<Box><Text
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
</Flex></Box>:"#"+transaction.id,
    activity:(transaction?.type === "debit" || transaction?.type === "hold")  && transaction?.contest?.data?.contestmaster?.data?.name ? (
      "Played " + transaction.contest.data.contestmaster.data.name 
  ) :
  transaction?.type === "credit" && transaction?.contest?.data?.contestmaster?.data?.name ?
  (
      "Won in " + transaction.contest.data.contestmaster.data.name 
  )
  : transaction?.eventmaster?.data?.name ? ( transaction.eventmaster.data.name ) :  ("transaction")      
,
    amount: transaction?.type === "debit" || transaction?.type === "hold" ? (
      <Text
          color="#FF6E3B"
          fontWeight="bold"
      >
          -${transaction?.amount}
      </Text>
  ) : (
      <Text
          color="#51E36E"
          fontWeight="bold"
      >
          +${transaction?.amount}
      </Text>
  ),
  status: 
  <Box>
      <Text
          fontSize={["12px","14px"]}
          color="#C7C7C7"
          fontWeight="bold"
          textAlign="center"
          fontFamily="Sora"
      >
          {transaction?.status}
      </Text>

      <Text
          fontSize={["5px","8px"]}
          color="#C7C7C7"
          textAlign="center"
          fontFamily="Sora"
      >
          {transaction?.currency?.data?.name}
      </Text>
  </Box>,
    date:moment(
      transaction?.createdAt
  ).format("DD-MM-YYYY, HH:mm"),
    action:
      <ChevronDownIcon/>
  }
}

export  function makeData(tableData, isMobile) {
 
  tableData = tableData.map(transaction => {
    return {
      ...transactionTableData(transaction,isMobile)
    }
  })


  return tableData;
}
export  function makeColumn(tableColumns){
  tableColumns=  tableColumns.map((col)=>{
    return {
      Header: col,
      accessor: col.toLowerCase().replace(/ /g, "")
    }
  });
return tableColumns;
}