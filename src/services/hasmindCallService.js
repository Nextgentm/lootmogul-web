import * as Sentry from "@sentry/react";
import axios from "axios";

const hasmindCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    // console.log("*****************hasmindCallService********************");

    let wmadv = null;
    if (utm_medium == "hasmind") {
        console.log("*****************hasmindCallService********************");
        wmadv = await axios.get(
            `https://hasmindpvtltd10992690.o18.link/p?m=18338&tid=${utm_term}`
        );
    }

    const myMessage = {
        message: "wmadv",
        wmadvUrl: `https://hasmindpvtltd10992690.o18.link/p?m=18338&tid=${utm_term}`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { hasmindCallService };
