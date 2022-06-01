import dynamic from 'next/dynamic'
import MyPageLoader from '../../src/components/MyPageLoader';

const PrivacyPolicy = dynamic(() => import("../../src/features/PrivacyPolicy"),  { loading: () => 
  <MyPageLoader/>
 })


const Privacy = () => {
 
  return <PrivacyPolicy/>;
};

export default Privacy;