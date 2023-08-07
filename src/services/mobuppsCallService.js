import * as Sentry from "@sentry/react";
import axios from "axios";

const mobuppsCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    // console.log("*****************mobuppsCallService********************");

    let wmadv = null;
    if (utm_medium == "mobupps") {
        console.log("*****************mobuppsCallService********************");
        wmadv = await axios.get(
            `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Gameplay&adv_id=5679&transaction_id=${utm_term}`
        );
    }

    const myMessage = {
        message: "wmadv",
        wmadvUrl: `https://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Gameplay&adv_id=5679&transaction_id=${utm_term}`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { mobuppsCallService };
