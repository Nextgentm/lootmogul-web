export const defaultAudioSettings=()=>{
    if (typeof window !== 'undefined') 
    window.localStorage?.setItem("quizVoiceOver", "true");
}
export const game =()=>{
    if (typeof window !== "undefined") {
       const  sssPage = window.localStorage.getItem("sssPage");
      }
}
export const getVoiceOverStatus =()=>{
    if (typeof window !== 'undefined')  
    {
        if(window.localStorage?.getItem("quizVoiceOver") === "true")
        return true;
    }
    else return false;
}
export const setVoiceOverStatus =(status)=>{  
    if (typeof window !== 'undefined')  {
    if(status)  
    window.localStorage?.setItem("quizVoiceOver", "true");
    else
    window.localStorage?.setItem("quizVoiceOver", "false");
    }
}