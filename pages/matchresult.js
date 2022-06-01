/* eslint-disable react/jsx-key */
// import { Button, Heading, Text } from "@chakra-ui/react";

import dynamic from 'next/dynamic'
import MyPageLoader from '../src/components/MyPageLoader';

const MatchResultScreens = dynamic(() => import("../src/components/MatchResultScreens"),  { loading: () => 
    <MyPageLoader/>
   })
  

// import MatchResultScreens from "../src/components/MatchResultScreens";

export default function MatchResult(props) {
    return (
        <div>
            <MatchResultScreens {...props} />
        </div>
    );
}
