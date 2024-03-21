import { CheckAvailableLocation } from "../../../services/locationService";
import { checkEligilbility } from "../../../services/dataService";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import JoiningPopup from "../../../components/LMModal/JoiningPopup";
import LMModal from "../../../components/LMModal";
import DepostWithdraw from "../../../components/LMModal/DepositWithdraw";
import InsufficientFunds from "../../../components/LMModal/InsufficientFunds";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../utils/AppContext";

const PaidGameConfirmation = ({ retry, contestmaster }) => {
    const [locationCheck, setLocationCheck] = useState({
        isBan: false,
        isBanText: ""
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const {
        setCurrentContest,
        amounts,
        setShowPaidGameConfirmation,
        user,
        isFromNoLocationGame
    } = useContext(AppContext);

    const closeShowModal = () => {
        setShowAlert(false);
        setShowModal(false);
        setShowPaidGameConfirmation({});
    };

    useEffect(() => {
        setLocationCheck({
            isBan: true,
            isBanText: "Please Wait!! Fetching Location..."
        });

        CheckAvailableLocation(isFromNoLocationGame).then((res) => {
            if (res) {
                setLocationCheck({
                    isBan: res.isBan,
                    isBanText: res.isBanText
                });

                if (!res.isBan) {
                    const res = checkEligilbility(contestmaster, amounts);
                    let userTotalBonus = user
                        ? user?.wallets.find((s) => s.currency.type == "bonus")
                              ?.balance || 0
                        : 0;
                    if (res.canPlay) {
                        setCurrentContest(contestmaster);
                        setShowModal({
                            show: true,
                            mode: "joining",
                            data: {
                                entryFee: contestmaster?.entryFee,
                                deductBal: res.deductAmount,
                                balance: res.balance + userTotalBonus,
                                bonus:
                                    userTotalBonus > 0
                                        ? (contestmaster?.feeWallet?.find(
                                              (w) =>
                                                  w.currency?.data?.type ==
                                                  "bonus"
                                          )?.percent *
                                              contestmaster?.entryFee) /
                                              100 || 0
                                        : 0
                            }
                        });
                    } else if (!res.canPlay) {
                        console.log('hello no cash need help');
                        setShowModal({
                            show: true,
                            mode: "insufficientFunds",
                            data: {
                                balance: res.balance
                            }
                        });

                       /* setShowModal({
                            show: true,
                            mode: "add",
                            data: {
                                balance: res.balance
                            }
                        });*/
                    }
                } else {
                    setShowAlert(true);
                }
            }
        });
    }, [contestmaster]);

    return (
        <>
            <LMNonCloseALert
                header={"Location Check"}
                canClose={showAlert}
                data={locationCheck.isBanText}
                isOpen={locationCheck.isBan}
                onClose={() => {
                    setShowPaidGameConfirmation({});
                    setLocationCheck({ isBan: false });
                }}
            />
            <LMModal
                isShow={showModal.show}
                scrollBehavior="outside"
                mode={showModal.mode}
                style={{ padding: "2%" }}
                handleClose={() => {
                    setShowAlert(false);
                    setShowModal(false);
                    setShowPaidGameConfirmation({});
                }}
            >
                {showModal.mode === "insufficientFunds" && (
                    <InsufficientFunds
                        totalAmount={showModal.data.balance}
                    />
                )}
                {showModal.mode === "add" && (
                    <DepostWithdraw
                        totalAmount={showModal.data.balance}
                        isDeposit={true}
                    />
                )}
                {showModal.mode === "joining" && (
                    <JoiningPopup
                        retry={{ retry: retry, count: contestmaster?.retries }}
                        data={showModal.data}
                        closeShowModal={closeShowModal}
                    />
                )}
            </LMModal>
        </>
    );
};

export default PaidGameConfirmation;
