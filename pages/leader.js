
import dynamic from 'next/dynamic'
import MyPageLoader from '../src/components/MyPageLoader';

const LeaderBoardScreen = dynamic(() => import("../src/components/LeaderBoard"),  { loading: () => 
    <MyPageLoader/>
   })
  

export default function LeaderBoard() {
    return (
        <div>
            <LeaderBoardScreen />
        </div>
    );
}
