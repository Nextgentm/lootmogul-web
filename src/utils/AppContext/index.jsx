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
import * as ct from "../../services/clevertapAnalytics";
import moment from "moment";
import axios from "axios";
import { getGameRoomOrCreateRoom } from "../../services/gameSevice";
import * as Sentry from "@sentry/nextjs";
import { getCurremtLocation } from "../../services/locationService";
import { mobuppsCallService } from "../../services/mobuppsCallService";
import { hasmindCallService } from "../../services/hasmindCallService";

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
        const value = await strapi.fetchUser();
        ct.onUserLogout({
            action: "Logout",
            params: user
        });

        try {
            const resp = await axios.post(
                process.env.NEXT_PUBLIC_WORDPRESS_URL +
                    `/wp-json/strapi/v1/setCurrentUser/`,
                {
                    user_email: value.email,
                    strapi_jwt: "logout",
                    provider: value.provider
                }
            );
            const data = resp.data;
            if (data.success) {
                if (typeof window !== "undefined" && window.localStorage) {
                    localStorage.clear();
                }
                strapi.logout();
                setUser(null);
                if (
                    router.route === "/influencers" ||
                    router.route === "/nfts" ||
                    router.route === "/games"
                ) {
                    router.push(router.route);
                } else {
                    router.push("/");
                }
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

    const handlePermission = () => {
        //debugger;
        clevertap.notifications.push({
            "titleText":'Would you like to receive Push Notifications?',
            "bodyText":'We promise to only send you relevant content and give you updates on your transactions',
            "okButtonText":'Sign me up!',
            "rejectButtonText":'No thanks',
            "okButtonColor":'#F28046',
            //"askAgainTimeInSeconds":60,
            "notification_bgcolor":"#FF0000",
            "okButtonBgColor":"#FF0000"
          });
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

    useEffect(()=> {
        if (user) {
            handlePermission();
        }
    }, [user]);
    
    const FetchLikes = async () => {
        const il = await apiLikeRequests(user);
        setInfluencerLikes(il);
    };
    const callAuthService = async (provider, token, input_referalcode) => {
        let data;
        defaultDataSettings();

        data = await strapi.authenticateProvider(provider, token);

        if (data?.user) {
            window.localStorage.setItem("token", data.jwt);

            insertLoggedInUserInDB(data);
            getCurremtLocation().then((res) => {
                window.localStorage.setItem("lm_user_location", res?.country);
                window.localStorage.setItem("lm_user_state", res?.state);
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
            ct.onUserLogin({
                action: "onUserLogin",
                params: data.user
            });

             /* Clevertap on User Login and Registration Event Tracking*/
            const onUserLoginData = await axios.get(
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
          
            if (data.user.is_new){
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Registration",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname
                    });
                }
            }
            else{     
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Login",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname
                    });
                }          
                
            }

            /** For mobupps */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mobupps"
            ) {
                const utm_term = router.query.utm_term;
                const myMessage = {
                    message: "wmadv",
                    wmadvUrl: `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Registration&adv_id=5679&transaction_id=${utm_term}`
                };

                Sentry.captureMessage(JSON.stringify(myMessage));
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
            /** For hasmind */
            
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
    };

    const insertLoggedInUserInDB = async (value) => {
        try {
            const resp = await axios.post(
                process.env.NEXT_PUBLIC_WORDPRESS_URL +
                    `/wp-json/strapi/v1/setCurrentUser/`,
                {
                    user_email: value.user.email,
                    strapi_jwt: value.jwt,
                    provider: value.user.provider
                }
            );

            const data = resp.data;
            if (data.success) {
            }
        } catch (error) {}
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
                } catch ({ error }) {
                    toast({
                        title: error.message,
                        status: "error",
                        duration: 3000,
                        position: "top-right",
                        isClosable: true
                    });

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
                    insertLoggedInUserInDB(data);
                    setJwt(data.jwt);
                    getCurremtLocation().then((res) => {
                        window.localStorage.setItem(
                            "lm_user_location",
                            res?.country
                        );

                        window.localStorage.setItem(
                            "lm_user_state",
                            res?.state
                        );
                    });
                } catch ({ error }) {
                    toast({
                        title: error.message,
                        status: "error",
                        duration: 3000,
                        position: "top-right",
                        isClosable: true
                    });
                    return;
                }
            }
        }
        if (data?.user) {
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
            ct.onUserLogin({
                action: "onUserLogin",
                params: data.user
            });
            
             /* Clevertap on User Login and Registration Event Tracking*/
             const onUserLoginData = await axios.get(
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
          
            if (data.user.is_new ){
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Registration",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname
                    });
                }
            }
            else{     
                if(onUserLoginData.data){
                    ct.onUserLoginRegistrationEvent({
                        action: "Login",
                        params: onUserLoginData.data?.data,
                        pathname:router.pathname
                    });
                }          
                
            }
            
            /** For Mobupps */
            if (
                data.user.is_new &&
                router.route === "/gamecampaign" &&
                router.query.utm_medium === "mobupps"
            ) {
                const utm_term = router.query.utm_term;
                const myMessage = {
                    message: "wmadv",
                    wmadvUrl: `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Registration&adv_id=5679&transaction_id=${utm_term}`
                };

                Sentry.captureMessage(JSON.stringify(myMessage));
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
            /** For hasmind */
           

            ga.eventTracking({
                action: data.user.is_new
                    ? "new user signup happened with new emailID"
                    : "custom user logged in with emailID",
                params: data.user
            });
            
            await updateUser(data.user);
        }

        if (router.route === "/gamecampaign") {
            router.push(redirectUrl);
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
                handlePermission
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;
console.log("test");
