import { useMediaQuery } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";
import strapi from "../strapi";
import socketio from "socket.io-client";
import { useRouter } from "next/router";
import {defaultAudioSettings, game} from "../../services/audioService";
import {defaultDataSettings, getCountForCaptcha} from "../../services/dataService";
import { apiLikeRequests } from "../../features/Home/api";
import * as ga  from "../../services/googleAnalytics";


export const AppContext = createContext({});

export const AppContextContainer = ({ children }) => {
    const router = useRouter();

    const [isLoginModalActive, setLoginModalActive] = useState(false);
    const [isMobileDevice, setMobileDevice] = useState(false);

    const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);
    const [user, setUser] = useState();
    const [influencerLikes, setInfluencerLikes] = useState(null);

    const [isDesktopDevice] = useMediaQuery("(min-width: 1224px)");
    const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
    // const [isTablet] = useMediaQuery("(max-width: 991px, min-width:768px)");
    const [isNotMobile] = useMediaQuery("(min-width:768px)");
    // const isMobileDevice = useMediaQuery("(max-width:767px)")

    const [currentContest, setCurrentContest] = useState(0);
    const [routePathAfterLogin, setRoutePathAfterLogin] = useState();
    //const [countForCaptcha, setCountForCaptcha] = useState(getCountForCaptcha());
    const [amounts, setAmounts] = useState({});

    const [showPaidGameConfirmation, setShowPaidGameConfirmation] = useState({});
    const [showCaptcha, setShowCaptcha] = useState({});

    const toggleLoginModal = () => {
        setLoginModalActive(!isLoginModalActive);
    };

    
    const CheckAndStartGame = (callerKey, contestmaster) => {
        // console.log("user",user);

        if(!user){
            toggleLoginModal();
            setRoutePathAfterLogin({nextPath:"/joining", contestmaster:contestmaster,callerKey});
        }
        else
            if(parseInt(getCountForCaptcha()) === 5){
            setShowCaptcha({'cm': contestmaster.id,'callerKey':callerKey });
            }else {
                setShowCaptcha({});
            CheckLocationAndConfirm(contestmaster,callerKey);
        }
    };

    const CheckLocationAndConfirm = (contestmaster,callerKey)=>{
      
        if (contestmaster.entryFee != 0) {
            setShowPaidGameConfirmation( {'cm': contestmaster.id,'callerKey':callerKey });
        }
        else
        {
            setShowPaidGameConfirmation({});
            setCurrentContest(
                contestmaster.id
            );
            router.push("/joining")
        }
    
    }

    const [jwt, setJwt] = useState();

    const [socket, setSocket] = useState();

    const [matchResult, setMatchResult] = useState();

    const [isHideHeader, setIsHideHeader] = useState(false);

    const [isHideFooter, setIsHideFooter] = useState(false);

    const [gameInProgress, setGameInProgress] = useState(false);




    useEffect(() => {
        setMobileDevice(!isDesktopDevice);
    }, [isDesktopDevice]);


    useEffect(() => {
        setIsTabletOrDesktop(isNotMobile);
    }, [isNotMobile]);

    const getSocket = (url) => {
        if (socket && socket.connected) return socket;
        let newSocket = socketio.connect(url, { secure: true });
        setSocket(newSocket);
        return newSocket;
    };

    const updateUser = async (obj) => {
        
        let data = obj;
        //if (!data) data = user;
        
        if(user && !strapi.user){
            console.log("JWT expired");
            setUser(null);
        }

        if (!data && strapi.getToken()) {
            data = await strapi.fetchUser();
        }
        if(!data) return null;
        setUser(data);
        setLoginModalActive(false);
        //console.log(data);

        
        try {
            if (data?.id) {
                    setAmounts({
                        deposit: data.wallets?.find(
                            (w) => w.currency?.type === "deposit"
                        )?.balance,
                        winnings: data.wallets?.find(
                            (w) => w.currency?.type === "winning"
                        )?.balance,
                        bonus: data.wallets?.find(
                            (w) => w.currency?.type === "bonus"
                        )?.balance
                    });

                // }
                return data;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    useEffect(() => {
        updateUser();

        return () => socket?.disconnect();
    }, []);

    useEffect(() => {
        if(!user && strapi?.user){
            updateUser();
        }
        else if(user && !strapi.user){
            setUser(null);
        }
    }, [strapi?.user]);
    
    useEffect(()=>{
        if (typeof window !== 'undefined' && window.localStorage?.getItem("quizVoiceOver") === null)  
        {
        defaultAudioSettings();        
        }
       
    },[]);
    useEffect(()=>{
    if (typeof window !== 'undefined' && window.localStorage?.getItem("sssPage") === null)  
    {
    game();        
    }
   
},[]);

    useEffect(() => {
        if (user) {
            let token = strapi.axios.defaults.headers.common["Authorization"];
                       if (token && token.startsWith("Bearer "))
                token = token.substring(7);
            setJwt(token);
            FetchLikes();
        }
    }, [user]);

    const FetchLikes = async ()=>{
        const il = await apiLikeRequests(user);
        setInfluencerLikes(il);
    }
    const callAuthService = async (provider, token) => {
        const data = await strapi.authenticateProvider(provider, token);
      
        defaultDataSettings();
        
        if (data?.user) {
            if(data.user.is_new){
               
                if (typeof window !== 'undefined') {
                    const utm_source =  window.localStorage?.getItem("utm_source");
                    const utm_medium =  window.localStorage?.getItem("utm_medium");
                    const utm_campaign =  window.localStorage?.getItem("utm_campaign");
                    const utm_term =  window.localStorage?.getItem("utm_term");
                    const utm_content =  window.localStorage?.getItem("utm_content");
                    const trackingCode =  window.localStorage?.getItem("trackingCode");
                    const referral_code =  window.localStorage?.getItem("referral_code");
                    const provider =  window.localStorage?.getItem("provider");

                    if(provider && trackingCode || (utm_source || utm_medium ||utm_term || utm_campaign ||utm_content)){
                    
                        try{

                            strapi.request(
                            "post",
                            "sourcetracking",
                            {'data': { 'utm_source':provider || utm_source , 'utm_medium': utm_medium || "",'utm_campaign': utm_campaign || "",'utm_term': utm_term || "",'utm_content': utm_content || "", 'trackingCode': trackingCode|| ""}} );
                        }
                        catch (error) {
                            console.log(error);
                        }

                       window.localStorage?.removeItem("utm_source");
                       window.localStorage?.removeItem("utm_medium");
                       window.localStorage?.removeItem("utm_campaign");
                       window.localStorage?.removeItem("utm_term");
                       window.localStorage?.removeItem("utm_content");
                       window.localStorage?.removeItem("trackingCode");
                    }

                    if(referral_code){
                        try{
                           await strapi.request(
                                "get",
                                "referral-codes/signwithreferral?referral_code="+referral_code
                                );
                            updateUser();
                        }
                        catch (error) {
                            console.log(error);
                        }

                       window.localStorage?.removeItem("utm_source");
                       window.localStorage?.removeItem("trackingCode");
                    }
                 }
            }
            ga.eventTracking({
                action: data.user.is_new?"new user signup happened":"user logged in",
                params:data.user
              });
              clevertap.onUserLogin.push({
                "Site":data.user
               })
            await updateUser(data.user);
        }
        if (routePathAfterLogin) {
            if(routePathAfterLogin.nextPath === "/joining"){
                CheckLocationAndConfirm(routePathAfterLogin.contestmaster);
            }
        }
    };

    return (
        <AppContext.Provider
            value={{
                toggleLoginModal,
                isLoginModalActive,
                callAuthService,
                isMobileDevice,
                getSocket,
                user,
                jwt,
                matchResult,
                setMatchResult,
                isHideHeader,
                setIsHideHeader,
                isHideFooter,
                setIsHideFooter,
                setUser,
                isTabletOrMobile,
                isNotMobile,
                isTabletOrDesktop,
                setCurrentContest,
                currentContest,
                setGameInProgress,
                gameInProgress,
                updateUser,
                CheckAndStartGame,
                amounts,
                showPaidGameConfirmation,
                setShowPaidGameConfirmation,
                influencerLikes,
                FetchLikes,
                showCaptcha, setShowCaptcha,
                logout: () => {
                    if (typeof window !== 'undefined' && window.localStorage){
                        localStorage.clear();
                    }
                    strapi.logout();
                    setUser(null);
                    console.log("logout");
                }
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
