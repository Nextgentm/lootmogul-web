import * as Sentry from "@sentry/react";
import axios from "axios";

const mrnCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    let wmadv = null;
    if (utm_medium == "mrn" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'production') {
        //console.log("*****************Mrn digital********************");
        wmadv = await axios.get(
            `https://mrn.vnative.co/acquisition?click_id=${utm_term}&security_token=d3117dafc420ac09ef6b`
        );
    }

   /* const myMessage = {
        message: "MRN - Reg call",
        wmadvUrl: `trk.mrndigital.in`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));*/
};

export { mrnCallService };
