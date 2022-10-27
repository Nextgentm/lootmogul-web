import { useEffect, useContext } from "react";
import { AppContext } from "../src/utils/AppContext";

import dynamic from 'next/dynamic'
import MyPageLoader from "../src/components/MyPageLoader";
import { useRouter } from 'next/router';
import strapi from "../src/utils/strapi";

const WalletPage = dynamic(() => import("../src/components/WalletPage"),  { loading: () => 
  <MyPageLoader/>
 })



const Wallet = () => {
  const { user,updateUser } = useContext(AppContext);
  const { jwt, setJwt } = useContext(AppContext);
  const router = useRouter();

  const totalAmount = user?.wallets?.reduce(
    (partialSum, a) => partialSum + a?.balance,
    0
  )?.toFixed(2);

  useEffect(()=> {
    if (!router.isReady) return;
    if( router.query.jwt ){
        strapi.setToken(router.query.jwt);
        setJwt(router.query.jwt);
        console.log('jwt',jwt);
        console.log('router jwty',router.query.jwt);
        window.localStorage.setItem("strapi_jwt", router.query.jwt);
    }       
},[router.isReady]);

  // useEffect(() => {
  //   if (!user && !updateUser()) 
  //   router.push("/");
  // }, [user]);

  return (
    <WalletPage
      totalAmount={totalAmount}
      user={user}
      jwt={jwt}
    ></WalletPage>
  );
};

export default Wallet;
