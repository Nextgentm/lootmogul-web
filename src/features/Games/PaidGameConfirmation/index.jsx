import { CheckAvailableLocation } from "../../../services/locationService";
import { checkEligilbility } from "../../../services/dataService";
import LMNonCloseALert from "../../../components/LMNonCloseALert";
import JoiningPopup from "../../../components/LMModal/JoiningPopup";
import LMModal from "../../../components/LMModal";
import DepostWithdraw from "../../../components/LMModal/DepositWithdraw";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../../utils/AppContext";

const PaidGameConfirmation = ({contestmaster}) => {
    const [locationCheck, setLocationCheck] = useState({
        isBan: false,
        isBanText: ""
    });
    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState({ show: false, mode: "" });
    const { setCurrentContest, amounts, setShowPaidGameConfirmation } = useContext(AppContext);
    useEffect(()=>{
            setLocationCheck({
                isBan: true,
                isBanText: "Please Wait!! Fetching Location..."
            });

            CheckAvailableLocation().then((res) => {
                if (res) {
                    setLocationCheck({isBan:res.isBan, isBanText:res.isBanText});
                    
                    if (!res.isBan) {
                        const res = checkEligilbility(
                            contestmaster,
                            amounts);
                    
                        if (res.canPlay) {
                            setCurrentContest(
                                contestmaster?.id
                            );
                            setShowModal({
                                show: true,
                                mode: "joining",
                                data: {
                                    entryFee:
                                        contestmaster?.entryFee,
                                    deductBal:
                                        res.deductAmount,
                                    balance: res.balance,
                                    bonus: contestmaster?.feeWallet?.find(w=> w.currency?.data?.type == 'bonus')?.percent /100 || 0
                                }
                            });
                        } else if (!res.canPlay) {
                            setShowModal({
                                show: true,
                                mode: "add",
                                data: {
                                    balance: res.balance
                                    
                                }
                            });

                        }
                        


                    }
                    else{
                        setShowAlert(true);
                    }
                }
            });
    },[contestmaster]);

    return (
        <>
            <LMNonCloseALert
                header={"Location Check"}
                canClose={showAlert}
                data={locationCheck.isBanText}
                isOpen={locationCheck.isBan}
                onClose={() => {
                    setShowPaidGameConfirmation({});
                    setLocationCheck({ isBan: false })
                }
                }
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
                {showModal.mode === "add" && (
                    <DepostWithdraw totalAmount={showModal.data.balance} isDeposit={true} />
                )}
                {showModal.mode === "joining" && (
                    <JoiningPopup data={showModal.data} />
                )}
            </LMModal>
        </>
    );
};

export default PaidGameConfirmation;
