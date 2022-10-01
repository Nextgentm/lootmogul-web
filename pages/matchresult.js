import dynamic from "next/dynamic";
import MyPageLoader from "../src/components/MyPageLoader";

const MatchResultScreens = dynamic(
  () => import("../src/components/MatchResultScreens"),
  { loading: () => <MyPageLoader /> }
);

export default function MatchResult(props) {
  return (
    <div>
      <MatchResultScreens {...props} />
    </div>
  );
}
