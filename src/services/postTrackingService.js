import axios from "axios";

const registerPostTracking = async (user) => {
    const utm_medium = user?.tracking?.utm_medium;
    const utm_term = user?.tracking?.utm_term;
    let jwt_token = '';
    if (typeof window !== 'undefined') {
        jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
    }
    if (utm_medium != "" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
        console.log("*****************CP Register********************");
        const response = axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contest/custom-contest/user-register-postback-event?utmMedium=${utm_medium}&utm_term=${utm_term}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + jwt_token
                }
            }
        );
    }

};

export { registerPostTracking };
