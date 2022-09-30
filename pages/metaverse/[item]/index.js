
import MetaVersePage from "../../../src/features/MetaVersePage";

import { useRouter } from "next/router";
const MetaverseOverView = () => {
    const router = useRouter();
    const type = router.query["item"];

return   <MetaVersePage type={type}/>
};


export default MetaverseOverView;
