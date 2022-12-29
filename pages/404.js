import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import MyPageLoader from "../src/components/MyPageLoader";

const NotFoundPage = dynamic(
    () =>
    import ("../src/features/404Page"), { loading: () => < MyPageLoader / > }
);

function NotFoundPage_fun() {
    return <NotFoundPage / > ;
}

export default NotFoundPage_fun;