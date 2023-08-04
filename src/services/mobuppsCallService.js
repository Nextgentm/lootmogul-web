import * as Sentry from "@sentry/react";

const mobuppsCallService = async () => {
    const utm_medium = localStorage.getItem("utm_medium");

    console.log("*****************mobuppsCallService********************");

    let wmadv = null;
    if (utm_medium == "mobupps") {
        wmadv = await axios.get(
            `http://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Gameplay&adv_id=5679&transaction_id=%7Bp1%7D`
        );
    }

    const myMessage = {
        message: wmadv,
        wmadvUrl: `http://wmadv.go2cloud.org/aff_goal?a=lsr&goal_name=Gameplay&adv_id=5679&transaction_id=%7Bp1%7D`
    };

    Sentry.captureMessage(JSON.stringify(myMessage));
};

export { mobuppsCallService };
