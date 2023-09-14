import * as Sentry from "@sentry/react";
import axios from "axios";

const mrnCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    let wmadv = null;
    if (utm_medium == "mrn" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'production') {
        //console.log("*****************Mrn digital********************");
        wmadv = await axios.get(
            `https://trk.mrndigital.in/pixel?av=65018f8baa14755d251446e7&txn_id=${utm_term}`
        );
    }

    const myMessage = {
        message: "MRN - Reg call",
        wmadvUrl: `trk.mrndigital.in`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { mrnCallService };
