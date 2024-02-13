import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import { useContext , useEffect } from "react";
// import { AppContext } from "../../utils/AppContext";
import { AppContext } from "../../src/utils/AppContext";

const ChangePassword = dynamic(
    () => import("../../src/features/ChangePassword"),
    { loading: () => <MyPageLoader /> }
  );

export default function ResetPasswordPage({ }) {
  const { toggleChangePasswordModal , setChangePasswordModalActive, isChangePasswordModalActive } = useContext(AppContext);
  // setOpen true on mount
  useEffect(() =>{
    setChangePasswordModalActive(true)
  }, [])

  return (
      <ChangePassword
          isOpen={isChangePasswordModalActive} 
          onClose={toggleChangePasswordModal}
          // onClose={true} 
          // isOpen={isChangePasswordModalActive}
      />
  );
}


