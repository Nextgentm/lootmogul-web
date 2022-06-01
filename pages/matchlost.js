/* eslint-disable react/jsx-key */

import dynamic from 'next/dynamic'
import MyPageLoader from '../src/components/MyPageLoader';

const MatchlostDisplay = dynamic(() => import("../src/components/MatchlostDisplay"),  { loading: () => 
    <MyPageLoader/>
   })
  


export default function MatchLost() {
    return (
        <div>
            <MatchlostDisplay />
        </div>
    );
}