import axios from "axios";

const clearpierCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");
    let jwt_token = '';
    if (typeof window !== 'undefined') {
        jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
    }
    if (utm_medium == "cp" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'production') {
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

export { clearpierCallService };


const clearpierGamePlayService = async (user) => {
    const utm_medium = user?.tracking?.utm_medium;
    const utm_term = user?.tracking?.utm_term;
    const startTimeString = new Date(user?.createdAt);
    let endTimeString = '';
    let jwt_token = '';
    if (typeof window !== 'undefined') {
        jwt_token = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
    }
    
    /*Check if startTime is a valid Date object*/
    if (isNaN(startTimeString.getTime())) {
        console.error("Invalid start time:", startTimeString);
    } else {
        /*Calculate the end time after month*/
        endTimeString = new Date(startTimeString);
        endTimeString.setMonth(endTimeString.getMonth() + 1);  
    }

    const startTime = startTimeString.toISOString();
    const endTime = endTimeString.toISOString();

    /*const startTime = "2023-02-03T06:40:00Z";
    const endTime = "2024-02-28T06:40:59Z";
    user.id = 25130;*/


    console.log("***************** Clearpier Game Played ********************");

    if (utm_medium == "cp" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'production') {
        const response = axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contest/custom-contest/user-gameplay-userid?utmMedium=${utm_medium}&utm_term=${utm_term}&startTime=${startTime}&endTime=${endTime}`,
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

export { clearpierGamePlayService };