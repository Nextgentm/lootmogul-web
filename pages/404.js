import { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import MyPageLoader from "../src/components/MyPageLoader";

const NotFound = dynamic(
    () =>
    import ("../src/features/404"), { loading: () => < MyPageLoader / > }
);

function NotFoundPage() {
    return <NotFound / > ;
}

export default NotFoundPage;