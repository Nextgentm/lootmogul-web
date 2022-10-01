/* eslint-disable react/jsx-key */

import dynamic from "next/dynamic";
import MyPageLoader from "../src/components/MyPageLoader";

const MatchLostDisplayNext = dynamic(
  () => import("../src/components/MatchLostNext"),
  { loading: () => <MyPageLoader /> }
);

export default function MatchLostNext() {
  return (
    <div>
      <MatchLostDisplayNext />
    </div>
  );
}
