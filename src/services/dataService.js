export const checkEligilbility = (lobby, userBal)=>{
    if(!lobby.maxBonus && userBal){
        let balance = userBal.deposit +userBal.winnings;
        if(lobby.entryFee < balance)
        return   {canPlay: true, deductAmount: lobby.entryFee,cta:"joining",balance:balance};
        else  return   {canPlay: false, deductAmount: lobby.entryFee, cta:"deposit" ,balance:balance}
    }
    
}
export const defaultDataSettings=()=>{
    if (typeof window !== 'undefined')  {
        window.localStorage?.setItem("matchCount", 0);
        window.localStorage?.setItem("counterForCaptcha", 0);
    }
}
export const setMatchCount = (count)=>{
    if (typeof window !== 'undefined')  
        window.localStorage?.setItem("matchCount", count);
}
export const getMatchCount = ()=>{
    if (typeof window !== 'undefined')  
        return  window.localStorage?.getItem("matchCount");
    return 0;
}
export const setCountForCaptcha  = (count)=>{
    if (typeof window !== 'undefined')  
        window.localStorage?.setItem("counterForCaptcha", count);
}
export const getCountForCaptcha = ()=>{
    if (typeof window !== 'undefined')  
        return  window.localStorage?.getItem("counterForCaptcha");
    return 0;
}