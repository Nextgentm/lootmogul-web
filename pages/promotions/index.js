

import dynamic from 'next/dynamic'
import MyPageLoader from '../../src/components/MyPageLoader';

const Promotion = dynamic(() => import("../../src/features/Promotion"),  { loading: () => 
  <MyPageLoader/>
 })


export default function Promo() {
  return <Promotion />;
}
