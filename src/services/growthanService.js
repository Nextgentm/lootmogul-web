import axios from "axios";

const growThanCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");
    //console.log("*****************growThanCallService Before********************");
    //console.log(process.env.NEXT_PUBLIC_SENTRY_ENV);
    let wmadv = null;

    if (utm_medium == "GT" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {

        //console.log("*****************growThanCallService called********************");
        wmadv = await axios.get(
            `https://digitech.trackier.co/acquisition?click_id=${utm_term}&security_token=2153872245ba7a1c3e12`

        );
    }
};

export { growThanCallService };
