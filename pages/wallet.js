import { useEffect, useContext, useState } from "react";
import { AppContext } from "../src/utils/AppContext";

import dynamic from 'next/dynamic'
import MyPageLoader from "../src/components/MyPageLoader";
import { useRouter } from 'next/router';
import strapi from "../src/utils/strapi";

const WalletPage = dynamic(() => import("../src/components/WalletPage"), {
  loading: () =>
    <MyPageLoader />
})



const Wallet = () => {
  const { user, updateUser, callAuthService } = useContext(AppContext);
  const { jwt, setJwt } = useContext(AppContext);
  const [isData, setIsData] = useState(true)
  const router = useRouter();

  const totalAmount = user?.wallets?.reduce(
    (partialSum, a) => partialSum + a?.balance,
    0
  )?.toFixed(2);

  useEffect(() => {
    if (!user && !updateUser()) 
    router.push("/");
  }, [user]);

  return (
    <>
      {
        isData && <WalletPage
          totalAmount={totalAmount}
          user={user}
          jwt={jwt}
        ></WalletPage>
      }
    </>
  );
};

export default Wallet;
