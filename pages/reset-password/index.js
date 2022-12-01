import strapi from "../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import AboutUS from '../../src/features/AboutUS'

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


