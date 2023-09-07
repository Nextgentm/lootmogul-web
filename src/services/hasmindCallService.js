import * as Sentry from "@sentry/react";
import axios from "axios";

const hasmindCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    let wmadv = null;
    if (utm_medium == "hashmind" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'production') {
        //console.log("*****************hasmindCallService********************");
        wmadv = await axios.get(
            `https://hasmindpvtltd10992690.o18.link/c?o=20723851&m=18338&a=548797`
        );
    }

    const myMessage = {
        message: "hashmind - Login call",
        wmadvUrl: `https://hasmindpvtltd10992690.o18.link/`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { hasmindCallService };
