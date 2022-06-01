
import GridLoader from "react-spinners/GridLoader";
const style = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: 'center',
    
  };
  
const MyPageLoader = () => {
    return (
        <div>
        <div style={style}> 
        <GridLoader
            color={"#DDBF79"}
            loading={true}
          
            size={20}
        />
        
        </div>
        <div style={{paddingBottom:"100vh"}}> </div>
        </div>
    );
};

export default MyPageLoader;
