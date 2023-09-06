import * as Sentry from "@sentry/react";
import axios from "axios";

const hasmindCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    // console.log("*****************hasmindCallService********************");
    const myMessage1 = {
        message: "Start hashmind",
        wmadvUrl: `https://hasmindpvtltd10992690.o18.click/p?m=18338&event=FTD&tid=${utm_term}`
    };

    Sentry.captureMessage(JSON.stringify(myMessage1));

    let wmadv = null;
    if (utm_medium == "hashmind") {
        console.log("*****************hasmindCallService********************");
        wmadv = await axios.get(
            `https://hasmindpvtltd10992690.o18.click/p?m=18338&event=FTD&tid=${utm_term}`
        );
    }

    const myMessage = {
        message: "hashmind - wmadv",
        wmadvUrl: `https://hasmindpvtltd10992690.o18.click/p?m=18338&event=FTD&tid=${utm_term}`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { hasmindCallService };
