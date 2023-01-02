import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";

const ChangePassword = dynamic(
    () => import("../../src/features/ChangePassword"),
    { loading: () => <MyPageLoader /> }
  );

export default function ResetPasswordPage({ }) {
  return (
    <><ChangePassword
          isOpen={true} OnChangePasswordClose={true} /></> 
  );
}


