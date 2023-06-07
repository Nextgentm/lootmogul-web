import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";

function TableNew({ tableData, auditLogData }) {
    console.log("auditLogData", auditLogData);
    console.log("tableData", tableData);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        console.log("open=-=-=-");
        setIsOpen(!isOpen);
    };

    return (
        <table style={{ color: "white", width: "100%" }}>
            <thead>
                <tr>
                    <th>SR NO</th>
                    <th>TRANSACTION ID</th>
                    <th>ACTIVITY</th>
                    <th>CHIPS</th>
                    <th>CLOSING BALANCE</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((data, index) => {
                    <tr>
                        <td>{index + 1}</td>
                        <td>{"#" + data.id}</td>
                        <td>
                            {(data?.type === "debit" ||
                                data?.type === "hold") &&
                            data?.contest?.data?.contestmaster?.data?.name
                                ? "Played " +
                                  data.contest.data.contestmaster.data.name
                                : data?.type === "credit" &&
                                  data?.contest?.data?.contestmaster?.data?.name
                                ? "Won in " +
                                  data.contest.data.contestmaster.data.name
                                : data?.eventmaster?.data?.name
                                ? data.eventmaster.data.name
                                : data?.balanceBeforeConversion
                                ? data?.currency?.data?.name +
                                  " wallet amount " +
                                  data?.balanceBeforeConversion +
                                  "USD is converted to " +
                                  Math.round(
                                      data?.balanceBeforeConversion + 7
                                  ) +
                                  " CHIPS"
                                : "transaction"}
                        </td>
                        <td>
                            {data?.type === "debit" || data?.type === "hold" ? (
                                <Text color="#fff" fontWeight="400">
                                    -{Number(data?.chips).toFixed(2)} CHIPS
                                </Text>
                            ) : (
                                <Text color="#fff" fontWeight="400">
                                    +
                                    {Number(data?.chips).toFixed(2) ||
                                        Number(
                                            data?.balanceBeforeConversion + 7
                                        ).toFixed(2)}{" "}
                                    CHIPS
                                </Text>
                            )}
                        </td>
                        <td>
                            <Text color="#fff" fontWeight="400">
                                {data?.closingBalance
                                    ? Number(data?.closingBalance).toFixed(2) +
                                      " CHIPS"
                                    : "-"}
                            </Text>
                        </td>
                        <td>
                            <Box>
                                <Text
                                    fontSize={["12px", "14px"]}
                                    color="#C7C7C7"
                                    fontWeight="bold"
                                    textAlign="center"
                                    fontFamily="Sora"
                                >
                                    {data?.status
                                        ? data?.status
                                        : data?.balanceBeforeConversion
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
                                    {data?.type}
                                </Text>
                            </Box>
                        </td>
                        <td>
                            {moment(data?.createdAt).format(
                                "DD-MM-YYYY, HH:mm"
                            )}
                        </td>
                        <td>
                        <ChevronDownIcon />
                        </td>
                    </tr>;
                })}
                {/* <tr className={`fold ${isOpen ? "open" : ""}`}>
                    <td colSpan="7">
                        <div className="fold-content">
                            <h3>Company Name</h3>
                            <p>
                                Pellentesque habitant morbi tristique senectus
                                et netus et malesuada fames ac turpis egestas.
                            </p>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company name</th>
                                        <th>Customer no</th>
                                        <th>Customer name</th>
                                        <th>Insurance no</th>
                                        <th>Strategy</th>
                                        <th>Start</th>
                                        <th>Current</th>
                                        <th>Diff</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Sony</td>
                                        <td>13245</td>
                                        <td>John Doe</td>
                                        <td>064578</td>
                                        <td>A, 100%</td>
                                        <td className="cur">20000</td>
                                        <td className="cur">33000</td>
                                        <td className="cur">13000</td>
                                    </tr>
                                    <tr>
                                        <td>Sony</td>
                                        <td>13288</td>
                                        <td>Claire Bennet</td>
                                        <td>064877</td>
                                        <td>B, 100%</td>
                                        <td className="cur">28000</td>
                                        <td className="cur">48000</td>
                                        <td className="cur">20000</td>
                                    </tr>
                                    <tr>
                                        <td>Sony</td>
                                        <td>12341</td>
                                        <td>Barry White</td>
                                        <td>064123</td>
                                        <td>A, 100%</td>
                                        <td className="cur">10000</td>
                                        <td className="cur">22000</td>
                                        <td className="cur">12000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr> */}
            </tbody>
        </table>
    );
}

export default TableNew;
