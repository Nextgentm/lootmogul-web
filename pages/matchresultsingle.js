/* eslint-disable react/jsx-key */
// import { Button, Heading, Text } from "@chakra-ui/react";

import dynamic from 'next/dynamic'
import MyPageLoader from '../src/components/MyPageLoader';

const MatchLBResultScreen = dynamic(() => import("../src/components/MatchLBResultScreen"),  { loading: () => 
    <MyPageLoader/>
   })
  
export default function MatchResultSingle(props) {
    return (
        <div>
            <MatchLBResultScreen {...props} />
        </div>
    );
}
