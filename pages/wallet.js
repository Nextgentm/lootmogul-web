import { useEffect, useContext, useState } from "react";
import { AppContext } from "../src/utils/AppContext";

import dynamic from "next/dynamic";
import MyPageLoader from "../src/components/MyPageLoader";
import { useRouter } from "next/router";
import strapi from "../src/utils/strapi";

const WalletPage = dynamic(() => import("../src/components/WalletPage"), {
  loading: () => <MyPageLoader />,
});

const Wallet = () => {
  const { user, updateUser, callAuthService } = useContext(AppContext);
  const { jwt, setJwt } = useContext(AppContext);
  const [isData, setIsData] = useState(true);
  const router = useRouter();

  const totalAmount = user?.wallets
    ?.reduce((partialSum, a) => partialSum + a?.balance, 0)
    ?.toFixed(2);

  useEffect(() => {
    if (!user && !updateUser()) router.push("/");
  }, [user]);

  useEffect(() => {
    if (!router.isReady) return;
    const access_token = router.query.access_token;
    const provider = router.query.provider;
    if (access_token) {
      if (provider == "facebook") {
        callAuthService("facebook", access_token);
      } else {
        callAuthService("google", access_token);
      }
    }
  }, [router.isReady]);

  return (
    <>
      {isData && (
        <WalletPage
          totalAmount={totalAmount}
          user={user}
          jwt={jwt}
          bg="transparent linear-gradient(90deg, #070623 0%, #1F052C 100%) 0% 0% no-repeat padding-box"
        ></WalletPage>
      )}
    </>
  );
};

export default Wallet;
