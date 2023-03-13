import { useMediaQuery, useToast } from "@chakra-ui/react";
import { createContext, useState, useEffect } from "react";
import strapi from "../strapi";
import socketio from "socket.io-client";
import { useRouter } from "next/router";
import { defaultAudioSettings, game } from "../../services/audioService";
import { defaultDataSettings, getCountForCaptcha } from "../../services/dataService";
import { apiLikeRequests } from "../../features/Home/api";
import * as ga from "../../services/googleAnalytics";
import LMNonCloseALert from "../../components/LMNonCloseALert";
import moment from "moment";
import axios from 'axios';

export const AppContext = createContext({});

export const AppContextContainer = ({ children }) => {
    const router = useRouter();
    const toast = useToast();
    const [isLoginModalActive, setLoginModalActive] = useState(false);
    const [isForgotPasswordModalActive, setForgotPasswordModalActive] = useState(false);
    const [isCheckYourMailModalActive, setCheckYourMailModalActive] = useState(false);
    const [isChangePasswordModalActive, setChangePasswordModalActive] = useState(false);
    const [isPasswordChangedModalActive, setPasswordChangedModalActive] = useState(false);
    const [isMobileDevice, setMobileDevice] = useState(false);

    const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(false);
    const [showLoading, setShowLoading] = useState({});
    const [user, setUser] = useState();
    const [influencerLikes, setInfluencerLikes] = useState(null);

    const [isDesktopDevice] = useMediaQuery("(min-width: 1224px)");
    const [isTabletOrMobile] = useMediaQuery("(max-width: 1224px)");
    // const [isTablet] = useMediaQuery("(max-width: 991px, min-width:768px)");
    const [isNotMobile] = useMediaQuery("(min-width:768px)");
    // const isMobileDevice = useMediaQuery("(max-width:767px)")

    const [currentContest, setCurrentContest] = useState();
    const [routePathAfterLogin, setRoutePathAfterLogin] = useState();
    //const [countForCaptcha, setCountForCaptcha] = useState(getCountForCaptcha());
    const [amounts, setAmounts] = useState({});

    const [showPaidGameConfirmation, setShowPaidGameConfirmation] = useState({});
    const [showCaptcha, setShowCaptcha] = useState({});
    const [coupon, setCoupon] = useState("");
    const [joiningData, setJoiningData] = useState(null);

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


    const CheckAndStartGame = (callerKey, contestmaster) => {

        if (!user) {
            setShowLoading({});
            toggleLoginModal();
            setRoutePathAfterLogin({ nextPath: "/joining", contestmaster: contestmaster, callerKey });
        }
        else
            if (parseInt(getCountForCaptcha()) === 5) {
                setShowCaptcha({ 'cm': contestmaster.id, 'callerKey': callerKey });
            } else {
                setShowCaptcha({});
                CheckLocationAndConfirm(contestmaster, callerKey);
            }
    };

    const CheckIfRetry = async (contestmaster, callerKey) => {

        const isRetry = await strapi.request(
            "post",
            "contest/custom-contest/checkifretry?contest=" + contestmaster.contest?.id + "&userId=" + user?.id,
            {}
        );
        if (isRetry?.retry && isRetry?.free) {
            setShowPaidGameConfirmation({});
            setCurrentContest(
                contestmaster
            );
            fetchGameJoiningData(contestmaster);

        }
        else
            if (isRetry?.retry && !isRetry?.free) {
                setShowLoading({});

                // show popup that your retries are over and then show below popup
                setShowPaidGameConfirmation({ 'cm': contestmaster.id, 'callerKey': callerKey, 'retry': "exceeded" });
            }
            else {
                setShowLoading({});
                setShowPaidGameConfirmation({ 'cm': contestmaster.id, 'callerKey': callerKey });
            }
    }

    const CheckLocationAndConfirm = (contestmaster, callerKey) => {
        if (contestmaster.entryFee > 0 && contestmaster.retries > 0) {
            CheckIfRetry(contestmaster, callerKey);
        }
        else
            if (contestmaster.entryFee != 0) {
                setShowLoading(false);
                setShowPaidGameConfirmation({ 'cm': contestmaster.id, 'callerKey': callerKey });
            }
            else {
                setShowPaidGameConfirmation({});
                setCurrentContest(
                    contestmaster
                );
                fetchGameJoiningData(contestmaster);
                // router.push("/joining")
            }

    }

    const onPlayAgain = async (contestmaster = currentContest, callerKey = `CheckRetry-${currentContest?.id}`) => {
        if (contestmaster.entryFee > 0 && contestmaster.retries > 0) {
            CheckIfRetry(contestmaster, callerKey);
        } else fetchGameJoiningData();

    }
    const logout = async () => {
        console.log('Im Logout to..');
        const value = await strapi.fetchUser();
        console.log(value);
        try {
            const resp = await axios.post(
                process.env.NEXT_PUBLIC_WORDPRESS_URL + `/wp-json/strapi/v1/setCurrentUser/`,
                {
                    user_email: value.email,
                    strapi_jwt: 'logout',
                    provider: value.provider
                }
            );
            const data = resp.data;
            if (data.success) {
                console.log(data);
                console.log('User Data Update to logout...');
                if (typeof window !== 'undefined' && window.localStorage) {
                    localStorage.clear();
                }
                strapi.logout();
                setUser(null);
                if (router.route === '/influencers' || router.route === '/nfts' || router.route === '/games') {
                    router.push(router.route);
                } else {
                    router.push("/");
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    const fetchGameJoiningData = async (contestmaster = currentContest) => {
        if (contestmaster) {
            const { data } = await strapi.find("contests", {
                sort: "createdAt:DESC",
                filters: { contestmaster: contestmaster.id },
                populate: {
                    contestmaster: {
                        fields: ['id', 'slug'],
                        populate: { game: { fields: ['url', 'type', 'config'] } }
                    }
                }
            });
            let query = coupon ? "contest/custom-contest/join?contest=" + data[0].id + "&coupon=" + coupon + "&userId=" + user?.id : "contest/custom-contest/join?contest=" + data[0].id;
            if (data?.length > 0) {

                const resp = await strapi.request(
                    "post",
                    query,
                    {}
                );
                if (resp?.ticketId) {
                    setCoupon("");
                    if (resp?.status == 0) {


                    } else {
                        if (data[0]?.contestmaster?.data?.game?.data?.url && data[0]?.contestmaster?.data?.game?.data?.type == 'html') {
                            if (typeof window !== "undefined") {
                                window.open(data[0]?.contestmaster?.data?.game?.data?.url + "?ticketId=" + resp?.ticketId + "&token=" + strapi.getToken() + "&redirecturi=" + encodeURI(process.env.NEXT_PUBLIC_SITE_URL + "/games/" + data[0]?.contestmaster?.data?.slug) + "&ts=" + moment().format(), "_self");
                            }
                        }
                        else if (data[0]?.contestmaster?.data?.game?.data?.url && data[0]?.contestmaster?.data?.game?.data?.type == "iframe") {
                            console.log(data[0]?.contestmaster?.data?.game?.data?.config)
                            if (data[0]?.contestmaster?.data?.game?.data?.config?.game == 'marketjs') {
                                setJoiningData(data[0]);
                                router.push('/games/' + data[0]?.id + '/' + data[0]?.contestmaster?.data?.game?.data?.config?.slug)
                            }
                        }
                        else {
                            setJoiningData(resp);
                            router.push("/joining");
                        }
                        setShowLoading({});

                    }
                }
                else {

                    setCoupon("");
                }
            } else {


            }
        };
    }



    const [jwt, setJwt] = useState();

    const [socket, setSocket] = useState();

    const [matchResult, setMatchResult] = useState();

    const [isHideHeader, setIsHideHeader] = useState(false);

    const [isHideFooter, setIsHideFooter] = useState(false);

    const [gameInProgress, setGameInProgress] = useState(false);


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
            console.log('jwt', jwt);
            console.log('router jwty', router.query.jwt);
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
        // debugger;
        let data = obj;
        //if (!data) data = user;

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

    useEffect(() => {
        if (!user && strapi?.user) {
            updateUser();
        }
        else if (user && !strapi.user) {
            setUser(null);
        }
    }, [strapi?.user]);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage?.getItem("quizVoiceOver") === null) {
            defaultAudioSettings();
        }

    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.localStorage?.getItem("sssPage") === null) {
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
        }
    }, [user]);

    const FetchLikes = async () => {
        const il = await apiLikeRequests(user);
        setInfluencerLikes(il);
    }
    const callAuthService = async (provider, token) => {
        let data;
        defaultDataSettings();

        data = await strapi.authenticateProvider(provider, token);

        if (data?.user) {
            window.localStorage.setItem("token", data.jwt);

            insertLoggedInUserInDB(data);

            if (data.user.is_new) {

                if (typeof window !== 'undefined') {
                    const utm_source = window.localStorage?.getItem("utm_source");
                    const utm_medium = window.localStorage?.getItem("utm_medium");
                    const utm_campaign = window.localStorage?.getItem("utm_campaign");
                    const utm_term = window.localStorage?.getItem("utm_term");
                    const utm_content = window.localStorage?.getItem("utm_content");
                    const trackingCode = window.localStorage?.getItem("trackingCode");
                    const referral_code = window.localStorage?.getItem("referral_code");
                    const provider = window.localStorage?.getItem("provider");

                    if (provider && trackingCode || (utm_source || utm_medium || utm_term || utm_campaign || utm_content)) {

                        try {

                            strapi.request(
                                "post",
                                "sourcetracking",
                                { 'data': { 'utm_source': provider || utm_source, 'utm_medium': utm_medium || "", 'utm_campaign': utm_campaign || "", 'utm_term': utm_term || "", 'utm_content': utm_content || "", 'trackingCode': trackingCode || "" } });
                        }
                        catch (error) {

                        }

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("utm_medium");
                        window.localStorage?.removeItem("utm_campaign");
                        window.localStorage?.removeItem("utm_term");
                        window.localStorage?.removeItem("utm_content");
                        window.localStorage?.removeItem("trackingCode");
                    }

                    if (referral_code) {
                        try {
                            await strapi.request(
                                "get",
                                "referral-codes/signwithreferral?referral_code=" + referral_code
                            );
                            updateUser();
                        }
                        catch (error) {

                        }

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("trackingCode");
                    }
                }
            }
            ga.eventTracking({
                action: data.user.is_new ? "new user signup happened" : "user logged in",
                params: data.user
            });
            clevertap.onUserLogin.push({
                "Site": data.user
            })
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
                process.env.NEXT_PUBLIC_WORDPRESS_URL + `/wp-json/strapi/v1/setCurrentUser/`,
                {
                    user_email: value.user.email,
                    strapi_jwt: value.jwt,
                    provider: value.user.provider
                }
            );

            const data = resp.data;
            if (data.success) {
                console.log('User Data saved successfully to DB');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const callCustomAuthService = async (formData, formType) => {
        let data;
        defaultDataSettings();
        if (formType === "signup" || formType === "login") {
            if (formType === "signup") {
                try {
                    const apiValues = {
                        username: formData.username,
                        identifier: formData.email,
                        password: formData.password,
                    }
                    let registerResult = await strapi.register(apiValues);
                    console.log(registerResult);
                    return;
                } catch ({ error }) {
                    toast({
                        title: error.message,
                        status: "error",
                        duration: 3000,
                        position: 'top-right',
                        isClosable: true
                    });
                    console.log(error);
                    return;
                }
            }

            if (formType === "login") {
                try {
                    const apiValues = {
                        identifier: formData.username,
                        password: formData.password,
                    }
                    data = await strapi.login(apiValues);
                    insertLoggedInUserInDB(data);
                    setJwt(data.jwt);
                    console.log(data);
                } catch ({ error }) {
                    toast({
                        title: error.message,
                        status: "error",
                        duration: 3000,
                        position: 'top-right',
                        isClosable: true
                    });
                    console.log(error);
                    return;
                }
            }
        }
        if (data?.user) {
            if (data.user.is_new) {
                if (typeof window !== 'undefined') {
                    const utm_source = window.localStorage?.getItem("utm_source");
                    const utm_medium = window.localStorage?.getItem("utm_medium");
                    const utm_campaign = window.localStorage?.getItem("utm_campaign");
                    const utm_term = window.localStorage?.getItem("utm_term");
                    const utm_content = window.localStorage?.getItem("utm_content");
                    const trackingCode = window.localStorage?.getItem("trackingCode");
                    const referral_code = window.localStorage?.getItem("referral_code");
                    const provider = window.localStorage?.getItem("provider");

                    if (provider && trackingCode || (utm_source || utm_medium || utm_term || utm_campaign || utm_content)) {

                        try {

                            strapi.request(
                                "post",
                                "sourcetracking",
                                { 'data': { 'utm_source': provider || utm_source, 'utm_medium': utm_medium || "", 'utm_campaign': utm_campaign || "", 'utm_term': utm_term || "", 'utm_content': utm_content || "", 'trackingCode': trackingCode || "" } });
                        }
                        catch (error) {

                        }

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("utm_medium");
                        window.localStorage?.removeItem("utm_campaign");
                        window.localStorage?.removeItem("utm_term");
                        window.localStorage?.removeItem("utm_content");
                        window.localStorage?.removeItem("trackingCode");
                    }

                    if (referral_code) {
                        try {
                            await strapi.request(
                                "get",
                                "referral-codes/signwithreferral?referral_code=" + referral_code
                            );
                            updateUser();
                        }
                        catch (error) {

                        }

                        window.localStorage?.removeItem("utm_source");
                        window.localStorage?.removeItem("trackingCode");
                    }
                }
            }
            ga.eventTracking({
                action: data.user.is_new ? "new user signup happened" : "user logged in",
                params: data.user
            });
            clevertap.onUserLogin.push({
                "Site": data.user
            })
            await updateUser(data.user);
        }
        if (routePathAfterLogin) {
            if (routePathAfterLogin.nextPath === "/joining") {
                CheckLocationAndConfirm(routePathAfterLogin.contestmaster);
            }
        }
    };

    useEffect(async () => {
        if (router.query.jwt) {
            try {
                const response = await axios
                    .get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/users/me`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": "Bearer " + router.query.jwt,
                        }
                    });
                console.log(response.data);
                updateUser(response.data);
                setUser(response.data);
            } catch (error) {
                console.log('error occured', error);
            }
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
                showCaptcha, setShowCaptcha,
                joiningData,
                fetchGameJoiningData,
                setShowLoading,
                onPlayAgain,
                setCoupon,
                logout
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;