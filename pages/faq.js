// import dynamic from 'next/dynamic'
// import MyPageLoader from '../src/components/MyPageLoader';
import FAQPage from "../src/features/FAQPage";
// const FAQPage = dynamic(() => import("../src/features/FAQPage"),  { loading: () => 
//     <MyPageLoader/>
//    })
  


const FAQs = () => {

    return <FAQPage />;
};

export default FAQs;