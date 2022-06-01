// import dynamic from 'next/dynamic'
// import MyPageLoader from '../src/components/MyPageLoader';
import ReferEarn from '../src/features/ReferEarn';
// const ReferEarn = dynamic(() => import("../src/features/ReferEarn"),  { loading: () => 
//     <MyPageLoader/>
//    })
  


const ReferAndEarn = () => {

    return <ReferEarn />;
};

export default ReferAndEarn;