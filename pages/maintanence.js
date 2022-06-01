import dynamic from 'next/dynamic'
import MyPageLoader from '../src/components/MyPageLoader';

const MaintenancePage = dynamic(() => import("../src/features/MaintenancePage"),  { loading: () => 
    <MyPageLoader/>
   })
  


const Maintenance = () => {

    return <MaintenancePage />;
};

export default Maintenance;