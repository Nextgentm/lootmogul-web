import { useMediaQuery, useToast } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";
import strapi from "../strapi";
import socketio from "socket.io-client";
import { useRouter } from "next/router";
import { defaultAudioSettings, game } from "../../services/audioService";
import {
    defaultDataSettings,
    getCountForCaptcha
} from "../../services/dataService";
import { apiLikeRequests } from "../../features/Home/api";
import * as ga from "../../services/googleAnalytics";
//import * as ct from "../../services/clevertapAnalytics";
import moment from "moment";
import axios from "axios";
import { getGameRoomOrCreateRoom } from "../../services/gameSevice";
import * as Sentry from "@sentry/nextjs";
import { getCurremtLocation } from "../../services/locationService";
import { mobuppsCallService } from "../../services/mobuppsCallService";
import { hasmindCallService } from "../../services/hasmindCallService";
import { mrnCallService } from "../../services/mrnCallService";
import { growThanCallService } from "../../services/growthanService";

export const AppContext = createContext({});

export const AppContextContainer = ({ children }) => {
    const router = useRouter();
    const toast = useToast();
    const [isLoginModalActive, setLoginModalActive] = useState(false);
    // const [refetch, setRefetch] = useState(false);

    const [isForgotPasswordModalActive, setForgotPasswordModalActive] =
        useState(false);
    const [isCheckYourMailModalActive, setCheckYourMailModalActive] =
        useState(false);
    const [isChangePasswordModalActive, setChangePasswordModalActive] =
        useState(false);
    const [isPasswordChangedModalActive, setPasswordChangedModalActive] =
        useState(false);
    const [isMobileDevice, setMobileDevice] = useState(false);

    const [withdrawFetch, setWithdrawFetch] = useState(true);

    const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);
    const [showLoading, setShowLoading] = useState({});
    const [user, setUser] = useState();
    const [influencerLikes, setInfluencerLikes] = useState(null);

    const [isDesktopDevice] = useMediaQuery("(min-width: 1224px)");
    const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
    // const [isTablet] = useMediaQuery("(max-width: 991px, min-width:768px)");
    const [isNotMobile] = useMediaQuery("(min-width:768px)");
    // const isMobileDevice = useMediaQuery("(max-width:767px)")

    const [isNewRegst, setIsNewRegst] = useState(false);

    const [currentContest, setCurrentContest] = useState();
    const [routePathAfterLogin, setRoutePathAfterLogin] = useState();
    //const [countForCaptcha, setCountForCaptcha] = useState(getCountForCaptcha());
    const [amounts, setAmounts] = useState({});

    const [showPaidGameConfirmation, setShowPaidGameConfirmation] = useState(
        {}
    );
    const [showCaptcha, setShowCaptcha] = useState({});
    const [coupon, setCoupon] = useState("");
    const [joiningData, setJoiningData] = useState(null);
    const [isPayIsStarted, setIsPayIsStarted] = useState(false);
    const [isFromNoLocationGame, setIsFromNoLocationGame] = useState(false);
    const [currencyToChip, setCurrencyToChip] = useState([]);

    const [withdrawalRequest, setWithdrawalRequest] = useState(false);
    
    const [isFirstTimeLogin, setFirstTimeLogin] = useState(false);

    const toggleLoginModal = () => {
        setLoginModalActive(!isLoginModalActive);
    };

    const toggleForgotPasswordModal = () => {
        setForgotPasswordModalActive(!isForgotPasswordModalActive);
    };

    const toggleCheckYourMailModal = () => {
        setCheckYourMailModalActive(!isCheckYourMailModalActive);
    };

    const toggleChangePasswordModal = () => {
        setChangePasswordModalActive(!isChangePasswordModalActive);
    };

    const togglePasswordChangedModal = () => {
        setPasswordChangedModalActive(!isPasswordChangedModalActive);
    };

    const toggleWithdrawFetch = (toggle) => {
        setWithdrawFetch(toggle);
    };
    // const refetchChange = () => {
    //     setRefetch(!refetch);
    // };
    console.log("*****************Hello********************");
    const CheckAndStartGame = (callerKey, contestmaster) => {
        if (!user) {
            setShowLoading({});
            toggleLoginModal();
            setRoutePathAfterLogin({
                nextPath: "/joining",
                contestmaster: contestmaster,
                callerKey
            });
        } else if (parseInt(getCountForCaptcha()) === 5) {
            setShowCaptcha({ cm: contestmaster.id, callerKey: callerKey });
        } else {
            setShowCaptcha({});
            CheckLocationAndConfirm(contestmaster, callerKey);
        }
    };

    const CheckIfRetry = async (contestmaster, callerKey) => {
        const isRetry = await strapi.request(
            "post",
            "contest/custom-contest/checkifretry?contest=" +
                contestmaster.contest?.id +
                "&userId=" +
                user?.id,
            {}
        );
        if (isRetry?.retry && isRetry?.free) {
            setShowPaidGameConfirmation({});
            setCurrentContest(contestmaster);
            fetchGameJoiningData(contestmaster);
        } else if (isRetry?.retry && !isRetry?.free) {
            setShowLoading({});

            // show popup that your retries are over and then show below popup
            setShowPaidGameConfirmation({
                cm: contestmaster.id,
                callerKey: callerKey,
                retry: "exceeded"
            });
        } else {
            setShowLoading({});
            setShowPaidGameConfirmation({
                cm: contestmaster.id,
                callerKey: callerKey
            });
        }
    };

    const CheckLocationAndConfirm = (contestmaster, callerKey) => {
        if (contestmaster.entryFee > 0 && contestmaster.retries > 0) {
            CheckIfRetry(contestmaster, callerKey);
        } else if (contestmaster.entryFee != 0) {
            setShowLoading(false);
            setShowPaidGameConfirmation({
                cm: contestmaster.id,
                callerKey: callerKey
            });
        } else {
            setShowPaidGameConfirmation({});
            setCurrentContest(contestmaster);
            fetchGameJoiningData(contestmaster);
            // router.push("/joining")
        }
    };

    const onPlayAgain = async (
        contestmaster = currentContest,
        callerKey = `CheckRetry-${currentContest?.id}`
    ) => {
        if (contestmaster?.entryFee > 0 && contestmaster?.retries > 0) {
            CheckIfRetry(contestmaster, callerKey);
        } else fetchGameJoiningData();
    };
    const logout = async () => {
        //const value = await strapi.fetchUser();
        /*ct.onUserLogout({
            action: "Logout",
            params: user
        });*/

        try {
            if (typeof window !== "undefined" && window.localStorage) {
                localStorage.clear();
            }
            strapi.logout();
            setUser(null);
            if (
                router.route === "/influencers" ||
                router.route === "/nfts" ||
                router.route === "/games" ||
                router.route === "/dsg" || 
                router.route === "/cricket"
            ) {
                router.push(router.route);
            } else {
                router.push("/");
            }
        } catch (error) {}
    };

    const fetchGameJoiningData = async (contestmaster = currentContest) => {
        if (contestmaster) {
            const { data } = await strapi.find("contests", {
                sort: "createdAt:DESC",
                filters: { contestmaster: contestmaster.id },
                populate: {
                    contestmaster: {
                        populate: {
                            game: { fields: ["url", "type", "config"] },
                            feeWallet: { populate: "wallet" }
                        }
                    }
                }
            });

            let query = coupon
                ? "contest/custom-contest/join?contest=" +
                  data[0].id +
                  "&coupon=" +
                  coupon +
                  "&userId=" +
                  user?.id
                : "contest/custom-contest/join?contest=" + data[0].id;
            if (data?.length > 0) {
                const resp = await strapi.request("post", query, {});

                if (resp?.ticketId) {
                    setCoupon("");
                    if (resp?.status == 0) {
                    } else {
                        if (
                            data[0]?.contestmaster?.data?.game?.data?.url &&
                            data[0]?.contestmaster?.data?.game?.data?.type ==
                                "html"
                        ) {
                            if (typeof window !== "undefined") {
                                mobuppsCallService();

                                window.open(
                                    data[0]?.contestmaster?.data?.game?.data
                                        ?.url +
                                        "?ticketId=" +
                                        resp?.ticketId +
                                        "&token=" +
                                        strapi.getToken() +
                                        "&redirecturi=" +
                                        encodeURI(
                                            process.env.NEXT_PUBLIC_SITE_URL +
                                                "/games/" +
                                                data[0]?.contestmaster?.data
                                                    ?.slug
                                        ) +
                                        "&ts=" +
                                        moment().format(),
                                    "_self"
                                );
                            }
                        } else if (
                            data[0]?.contestmaster?.data?.game?.data?.url &&
                            data[0]?.contestmaster?.data?.game?.data?.type ==
                                "iframe"
                        ) {
                            if (
                                data[0]?.contestmaster?.data?.game?.data?.config
                                    ?.game == "marketjs"
                            ) {
                                setShowPaidGameConfirmation({});

                                // try {
                                const roomData = await getGameRoomOrCreateRoom(
                                    data[0]?.id,
                                    user?.id
                                );
                                if (roomData) {
                                    setIsPayIsStarted("ended");
                                    setJoiningData(data[0]);
                                    updateUser();
                                    if (
                                        router.pathname !=
                                        "/games/" +
                                            roomData?.id +
                                            "/" +
                                            data[0]?.contestmaster?.data?.game
                                                ?.data?.config?.slug
                                    )
                                        mobuppsCallService();
                                    router.push(
                                        "/games/" +
                                            roomData?.id +
                                            "/" +
                                            data[0]?.contestmaster?.data?.game
                                                ?.data?.config?.slug
                                    );
                                } else {
                                    setShowLoading(false);

                                    router.push("/games");
                                }
                            }
                        } else {
                            setJoiningData(resp);
                            mobuppsCallService();
                            router.push("/joining");
                        }
                        setShowLoading({});
                    }
                } else {
                    setCoupon("");
                }
            } else {
            }
        }
    };

    const [jwt, setJwt] = useState();

    const [socket, setSocket] = useState();

    const [matchResult, setMatchResult] = useState();

    const [isHideHeader, setIsHideHeader] = useState(false);

    const [isHideFooter, setIsHideFooter] = useState(false);

    const [gameInProgress, setGameInProgress] = useState(false);

    const [showModalwithdrawalpopup, setShowModalwithdrawalpopup] =
        useState(false);

    function generateUserId() {
        // Generate a random user ID using a combination of timestamp and a random number
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000000); // Adjust the range as needed
        const userId = `${timestamp}-${random}`;
        return userId;
    }
    const handlePermission = () => {
        //debugger;
        const userId = generateUserId();
        /*clevertap.notifications.push({
            "titleText":'Stay updated & power up your play!',
            "bodyText":'Enable push notifications for the latest updates! We assure you that we will send relevant content only.',
            "okButtonText":'Yes',
            "rejectButtonText":'No',
            "okButtonColor":'#e90a63',
            "askAgainTimeInSeconds":120,
            "notification_bgcolor":"#FF0000",
            "okButtonBgColor":"#FF0000",
            "okButtonCallback": function () {
                console.log("User clicked OK");
            },
            "dismissCallback": function () {
                console.log("User dismissed the notification");
            }
        });
        clevertap.privacy.push({optOut: true});
        clevertap.privacy.push({useIP: true});
        if (process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
            clevertap.onUserLogin.push({
                Site: {
                    Name: "Visitor "+ userId, // String
                    Identity: "Visitor "+ userId, // String or number
                    Email: "", // Email address of the user
                    Phone: '', // Phone (with the country code)
                    Gender: "M", // Can be either M or F
                    DOB: new Date(), // Date of Birth. Date object
                    // optional fields. controls whether the user will be sent email, push etc.
                    "MSG-email": true, // Disable email notifications
                    "MSG-push": true, // Enable push notifications
                    "MSG-sms": false, // Enable sms notifications
                    "MSG-whatsapp": false // Enable WhatsApp notifications
                }
            });
        }
        
        
        

        clevertap.event.push("Web Push", {
            "Visitor": "Visitor"+ userId
        });*/
    }
    
   

    useEffect(() => {
        if (!router.isReady) return;
        const access_token = router.query.access_token;
        const provider = router.query.provider;
        if (access_token) {
            if (provider == "facebook") {
                callAuthService("facebook", access_token);
            } else {
                callAuthService("google", access_token);
            }
        } else if (router.query.jwt) {
            strapi.setToken(router.query.jwt);
            setJwt(router.query.jwt);
            window.localStorage.setItem("strapi_jwt", router.query.jwt);
        }
    }, [router.isReady]);

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

        if (user && !strapi.user) {
            setUser(null);
        }

        if (!data && strapi.getToken()) {
            data = await strapi.fetchUser();
        }
        if (!data) return null;
        setUser(data);
        setLoginModalActive(false);
        setForgotPasswordModalActive(false);
        setCheckYourMailModalActive(false);
        setChangePasswordModalActive(false);
        setPasswordChangedModalActive(false);

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
            return null;
        }
    };

    useEffect(() => {
        updateUser();

        return () => socket?.disconnect();
    }, []);

    // useEffect(() => {
    //     updateUser();
    // }, [refetch]);

    useEffect(() => {
        if (!user && strapi?.user) {
            updateUser();
        } else if (user && !strapi.user) {
            setUser(null);
        }
    }, [strapi?.user]);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.localStorage?.getItem("quizVoiceOver") === null
        ) {
            defaultAudioSettings();
        }
    }, []);

    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            window.localStorage?.getItem("sssPage") === null
        ) {
            game();
        }
    }, []);

    useEffect(() => {
        if (user) {
            let token = strapi.axios.defaults.headers.common["Authorization"];
            if (token && token.startsWith("Bearer "))
                token = token.substring(7);
            setJwt(token);
            FetchLikes();

			if(!isNewRegst){

            window.localStorage?.setItem(
                "logged_utm_source",
                user?.tracking?.utm_source || null
            );
            window.localStorage?.setItem(
                "logged_utm_medium",
                user?.tracking?.utm_medium || null
            );
            window.localStorage?.setItem(
                "logged_utm_campaign",
                user?.tracking?.utm_campaign || null
            );
            window.localStorage?.setItem(
                "logged_utm_term",
                user?.tracking?.utm_term || null
            );
            window.localStorage?.setItem(
                "logged_utm_content",
                user?.tracking?.utm_content || null
            );
            window.localStorage?.setItem(
                "logged_trackingCode",
                user?.tracking?.trackingCode || null
            );
			}
        }
    }, [user]);

    const initializePage = () => {
        // Modify the DOM or add any other necessary logic here
        const button = document.getElementById('wzrk-confirm');
  
        if (button) {
          button.click(); // Trigger a click event on the button
        }
      };
  

    useEffect(()=> {
        //if (process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
            //handlePermission();
        //}
        setTimeout(() => {
            const specificDiv =  document.querySelector('.wzrk-powered');      
            if (specificDiv) {
                specificDiv.css('display', 'none');
            }
         }, 2000);

         setTimeout(() => {
            //document.addEventListener('DOMContentLoaded', function () {
                //console.log("JavaScript code is running");

                  // Run the function when the component mounts
                  initializePage();
             // });
         }, 10000);
         
    }, [user]);
    
    const FetchLikes = async () => {
        const il = await apiLikeRequests(user);
        setInfluencerLikes(il);
    };
    const callAuthService = async (provider, token, input_referalcode) => {
        try{
        let data;
        defaultDataSettings();

        data = await strapi.authenticateProvider(provider, token);
            console.log("data",data);
        if (data?.user) {
            window.localStorage.setItem("token", data.jwt);

            getCurremtLocation().then(/* async */(res) => {
                window.localStorage.setItem("lm_user_location", res?.country);
                window.localStorage.setItem("lm_user_state", res?.state);
                /* const updatedSession = await */strapi.request('PATCH', '/sessions/location', 
                    { data : { state: res?.state, browserCountry: res?.country }}
                )
            });

            if (data.user.is_new) {
                if (typeof window !== "undefined") {
                    const utm_source =
                        window.localStorage?.getItem("utm_source");
                    const utm_medium =
                        window.localStorage?.getItem("utm_medium");
                    const utm_campaign =
                        window.localStorage?.getItem("utm_campaign");
                    const utm_term = window.localStorage?.getItem("utm_term");
                    const utm_content =
                        window.localStorage?.getItem("utm_content");
                    const trackingCode =
                        window.localStorage?.getItem("trackingCode");
                    var referral_code =
                        window.localStorage?.getItem("referral_code");
                    const provider = window.localStorage?.getItem("provider");

                    if (
                        (provider && trackingCode) ||
                        utm_source ||
                        utm_medium ||
                        utm_term ||
                        utm_campaign ||
                        utm_content
                    ) {
                        try {
                            await strapi.request("post", "sourcetracking", {
                                data: {
                                    utm_source: provider || utm_source,
                                    utm_medium: utm_medium || "",
                                    utm_campaign: utm_campaign || "",
                                    utm_term: utm_term || "",
                                    utm_content: utm_content || "",
                                    trackingCode: trackingCode || "",
                                    user_id: data.user?.id || ""
                                }
                            });

							setIsNewRegst(true)

                            window.localStorage?.setItem(
                                "logged_utm_source",
                                provider || utm_source
                            );
                            window.localStorage?.setItem(
                                "logged_utm_medium",
                                utm_medium || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_campaign",
                                utm_campaign || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_term",
                                utm_term || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_content",
                                utm_content || null
                            );
                            window.localStorage?.setItem(
                                "logged_trackingCode",
                                trackingCode || null
                            );
                        } catch (error) {}

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("utm_medium");
                        window.localStorage?.removeItem("utm_campaign");
                        window.localStorage?.removeItem("utm_term");
                        window.localStorage?.removeItem("utm_content");
                        window.localStorage?.removeItem("trackingCode");

                        // console.log(jwt);
                    }

                    if (referral_code || input_referalcode) {
                        if (!referral_code) {
                            referral_code = input_referalcode;
                        }
                        try {
                            await strapi.request(
                                "get",
                                "referral-codes/signwithreferral?referral_code=" +
                                    referral_code
                            );
                            updateUser();
                        } catch (error) {}

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("trackingCode");
                    }
                }
            }

            /* Clevertap onUserLogin*/
            if (process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
                /*ct.onUserLogin({
                    action: "onUserLogin",
                    params: data.user
                });*/
            }
             /* Clevertap on User Login and Registration Event Tracking*/
            /*const onUserLoginData = await axios.get(
                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    `/api/clevertap/user`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + data.jwt
                        }
                    }
            );
            
            const onTransactionLoginData = await axios.get(
                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    `/api/clevertap/transaction`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + data.jwt
                        }
                    }
            );

            if (data.user.is_new){
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Registration",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname,
                        transaction: onTransactionLoginData.data?.data
                    });
                }
            }
            else{     
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Login",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname,
                        transaction: onTransactionLoginData.data?.data
                    });
                }          
                
            }
            */
            /** For mobupps */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mobupps"
            ) {
                mobuppsCallService();

                /*const myMessage = {
                    message: "wmadv",
                    wmadvUrl: `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Registration&adv_id=5679&transaction_id=${utm_term}`
                };

                Sentry.captureMessage(JSON.stringify(myMessage));*/
            }

            /** For mobupps */

            /** For hasmind */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            if (
                data.user.is_new &&
                router.route === "/cricket" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            /** For hasmind */
            
            /** For mrnCallService */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }

            /** For GrowThanCallService */
            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "GT"
            ) {
                growThanCallService();
            }

            if (
                data.user.is_new &&
                router.route === "/cricket" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }

            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }
            /** For mrnCallService */
            ga.eventTracking({
                action: data.user.is_new
                    ? provider + " new user signup happened"
                    : provider + " user logged in",
                params: data.user
            });
            
            

            await updateUser(data.user);
        }

        if (routePathAfterLogin) {
            if (routePathAfterLogin.nextPath === "/joining") {
                CheckLocationAndConfirm(routePathAfterLogin.contestmaster);
            }
        }
        } catch (error) {
            console.log('callauthservice', error)
            if(error?.message || error?.error?.message){
                toast({
                    title: error.message || error?.error?.message,
                    status: "error",
                    duration: 5000,
                    position: "top-right",
                    isClosable: true
                });
            }
        }
    };
  
    const callCustomAuthService = async (
        formData,
        formType,
        redirectUrl = ""
    ) => {
        let data;
        defaultDataSettings();
        if (formType === "signup" || formType === "login") {
            if (formType === "signup") {
                try {
                    const apiValues = {
                        username: formData.username,
                        identifier: formData.email,
                        password: formData.password
                    };
                    data = await strapi.register(apiValues);
                    getCurremtLocation().then((res) => {
                        window.localStorage.setItem("lm_user_location", res?.country);
                        window.localStorage.setItem("lm_user_state", res?.state);
                        strapi.request('PATCH', '/sessions/location', 
                            { data : { state: res?.state, browserCountry: res?.country }}
                        )
                    });
                } catch ({ error }) {
                    if(error.message){
                        toast({
                            title: error.message,
                            status: "error",
                            duration: 3000,
                            position: "top-right",
                            isClosable: true
                        });
                    }
                    

                    return;
                }
            }

            if (formType === "login") {
                try {
                    const apiValues = {
                        identifier: formData.username,
                        password: formData.password
                    };
                    data = await strapi.login(apiValues);
                    setJwt(data.jwt);
                    getCurremtLocation().then(/* async */(res) => {
                        window.localStorage.setItem("lm_user_location", res?.country);
                        window.localStorage.setItem("lm_user_state", res?.state);
                        /* const updatedSession = await */strapi.request('PATCH', '/sessions/location', 
                            { data : { state: res?.state, browserCountry: res?.country }}
                        )
                    });
                } catch ({ error }) {
                    if(error.message){
                        toast({
                            title: error.message,
                            status: "error",
                            duration: 3000,
                            position: "top-right",
                            isClosable: true
                        });
                    }
                    return;
                }
            }
        }
        if (data?.user) {
            if (data.user.is_new) {
                setFirstTimeLogin(true);
                if (typeof window !== "undefined") {
                    const utm_source =
                        window.localStorage?.getItem("utm_source");
                    const utm_medium =
                        window.localStorage?.getItem("utm_medium");
                    const utm_campaign =
                        window.localStorage?.getItem("utm_campaign");
                    const utm_term = window.localStorage?.getItem("utm_term");
                    const utm_content =
                        window.localStorage?.getItem("utm_content");
                    const trackingCode =
                        window.localStorage?.getItem("trackingCode");
                    var referral_code =
                        window.localStorage?.getItem("referral_code");
                    const provider = window.localStorage?.getItem("provider");

                    if (
                        (provider && trackingCode) ||
                        utm_source ||
                        utm_medium ||
                        utm_term ||
                        utm_campaign ||
                        utm_content
                    ) {
                        try {
                            await strapi.request("post", "sourcetracking", {
                                data: {
                                    utm_source: provider || utm_source,
                                    utm_medium: utm_medium || "",
                                    utm_campaign: utm_campaign || "",
                                    utm_term: utm_term || "",
                                    utm_content: utm_content || "",
                                    trackingCode: trackingCode || "",
                                    user_id: data.user?.id || ""
                                }
                            });

							setIsNewRegst(true)

                            window.localStorage?.setItem(
                                "logged_utm_source",
                                provider || utm_source
                            );
                            window.localStorage?.setItem(
                                "logged_utm_medium",
                                utm_medium || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_campaign",
                                utm_campaign || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_term",
                                utm_term || null
                            );
                            window.localStorage?.setItem(
                                "logged_utm_content",
                                utm_content || null
                            );
                            window.localStorage?.setItem(
                                "logged_trackingCode",
                                trackingCode || null
                            );
                        } catch (error) {}

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("utm_medium");
                        window.localStorage?.removeItem("utm_campaign");
                        window.localStorage?.removeItem("utm_term");
                        window.localStorage?.removeItem("utm_content");
                        window.localStorage?.removeItem("trackingCode");
                    }

                    if (referral_code || formData.referalcode) {
                        if (!referral_code) {
                            referral_code = formData.referalcode;
                        }
                        try {
                            await strapi.request(
                                "get",
                                "referral-codes/signwithreferral?referral_code=" +
                                    referral_code
                            );
                            updateUser();
                        } catch (error) {}

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("trackingCode");
                    }
                }
            }
            
            /* Clevertap onUserLogin*/
            if (process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
                /*ct.onUserLogin({
                    action: "onUserLogin",
                    params: data.user
                });*/
            }
            
             /* Clevertap on User Login and Registration Event Tracking*/
            /* const onUserLoginData = await axios.get(
                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    `/api/clevertap/user`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + data.jwt
                        }
                    }
            );
            
            const onTransactionLoginData = await axios.get(
                process.env.NEXT_PUBLIC_STRAPI_API_URL +
                    `/api/clevertap/transaction`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + data.jwt
                        }
                    }
            );
           
            if (data.user.is_new ){
                if(onUserLoginData.data  || onTransactionLoginData){
                    ct.onUserLoginRegistrationEvent({
                        action: "Registration",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname,
                        transaction: onTransactionLoginData.data?.data
                    });
                }
            }
            else{     
                if(onUserLoginData.data || onTransactionLoginData){
                    ct.onUserLoginRegistrationEvent({
                        action: "Login",
                        params: onUserLoginData.data?.data,
                        pathname: router.pathname,
                        transaction: onTransactionLoginData.data?.data
                    });
                }          
                
            }
            */

            /** For Mobupps */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mobupps"
            ) {

                /*const utm_term = router.query.utm_term;                
                const myMessage = {
                    message: "wmadv",
                    wmadvUrl: `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Registration&adv_id=5679&transaction_id=${utm_term}`
                };

                Sentry.captureMessage(JSON.stringify(myMessage));*/
                mobuppsCallService();
            }
            /** For Mobupps */

            /** For hasmind */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            if (
                data.user.is_new &&
                router.route === "/cricket" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "hashmind"
            ) {
                hasmindCallService();
            }
            /** For hasmind */
           
            
            /** For GrowThanCallService */
            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "GT"
            ) {
                growThanCallService();
            }

            /** For mrnCallService */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }

            if (
                data.user.is_new &&
                router.route === "/cricket" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }

            if (
                data.user.is_new &&
                router.route === "/dsg" &&
                router.query.utm_medium === "mrn"
            ) {
                mrnCallService();
            }
            /** For mrnCallService */
            
            ga.eventTracking({
                action: data.user.is_new
                    ? "new user signup happened with new emailID"
                    : "custom user logged in with emailID",
                params: data.user
            });
            
            await updateUser(data.user);
        }

        if (router.route === "/gamecampaign" || router.route === '/cricket') {
            router.push(redirectUrl);
        }
        if (router.route === "/thanksgiving-campaign") {
            router.push('/wallet');
        }
        if (routePathAfterLogin) {
            if (routePathAfterLogin.nextPath === "/joining") {
                CheckLocationAndConfirm(routePathAfterLogin.contestmaster);
            }
        }
    };

    const getCurrencyToChip = async () => {
        const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/currency-to-chips?populate=*&pagination[pageSize]=100&sort=order`
        );

        setCurrencyToChip(data.data);
    };

    useEffect(async () => {
        if (router.query.jwt) {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: "Bearer " + router.query.jwt
                        }
                    }
                );

                updateUser(response.data);
                setUser(response.data);
                getCurrencyToChip();
            } catch (error) {}
        }
        if (!router.isReady) return;
    }, [router.isReady]);

    return (
        <AppContext.Provider
            value={{
                toggleLoginModal,
                setLoginModalActive,
                isLoginModalActive,
                toggleForgotPasswordModal,
                setForgotPasswordModalActive,
                isForgotPasswordModalActive,
                toggleCheckYourMailModal,
                setCheckYourMailModalActive,
                isCheckYourMailModalActive,
                toggleChangePasswordModal,
                setChangePasswordModalActive,
                isChangePasswordModalActive,
                togglePasswordChangedModal,
                setPasswordChangedModalActive,
                isPasswordChangedModalActive,
                callAuthService,
                callCustomAuthService,
                isMobileDevice,
                getSocket,
                user,
                jwt,
                setJwt,
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
                showLoading,
                showCaptcha,
                setShowCaptcha,
                joiningData,
                fetchGameJoiningData,
                setShowLoading,
                onPlayAgain,
                setCoupon,
                logout,
                isPayIsStarted,
                setIsPayIsStarted,
                setIsFromNoLocationGame,
                isFromNoLocationGame,
                getCurrencyToChip,
                currencyToChip,
                setCurrencyToChip,
                setShowModalwithdrawalpopup,
                showModalwithdrawalpopup,
                withdrawFetch,
                toggleWithdrawFetch,
                handlePermission,
                setFirstTimeLogin,
                isFirstTimeLogin
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
