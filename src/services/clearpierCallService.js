import axios from "axios";

const clearpierCallService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    let wmadv = null;
    if (utm_medium == "cp" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
        console.log("*****************CP********************");
        /*wmadv = await axios.get(
            `http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=59e1ad3b7bcc4e18cf90017ebe31251a&event_name=register`
        );
        console.log(wmadv);*/
        fetch(`http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=59e1ad3b7bcc4e18cf90017ebe31251a&event_name=register`, {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Adjust this header as needed
                // Add other headers if required
            },
            mode: 'no-cors', // Request mode: 'cors', 'no-cors', 'same-origin'
            credentials: 'include', // Include cookies in the request if needed
        })
        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("data",data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    }

};

export { clearpierCallService };


const clearpierGamePlayService = async (user) => {
    const utm_medium = user?.tracking?.utm_medium;
    const utm_term = user?.tracking?.utm_term;
    const startTimeString = new Date(user?.createdAt);
    let endTimeString = '';
    var jwt_token = '';
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

    console.log("utm_medium",utm_medium);
    console.log("utm_term",utm_term);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
    console.log("***************** Clearpier Game Played ********************");

    let totalGameplays = null;
    if (utm_medium == "cp" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {

        const response = axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/contest/custom-contest/user-gameplay-userid?userid=${user?.id}&startTime=${startTime}&endTime=${endTime}&page=1&pageSize=10&utmMedium=all&totalGameplayCount=3&totalGameplayCondition=>`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + jwt_token
                }
            }
        );
        console.log("***************** Waiting for Response ********************");
        if(response.data){
            console.log("***************** Clearpier Game Played ********************");
            console.log("TotalGameplays",response.data[0].totalGameplays);
            totalGameplays = Number(response.data[0]?.totalGameplays);
            /*wmadv = await axios.get(
                `http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=2222ad3b7bcc4e18cf90017ebe31251a&event_name=gameplay`
            );*/

            if(totalGameplays >= 3 ){
                fetch(`http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=2222ad3b7bcc4e18cf90017ebe31251a&event_name=gameplay`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                    mode: 'no-cors',
                    credentials: 'include',
                })
                .then(response => {
                    console.log("***************** Sent Tracking ********************",response);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("***************** Data Sent Tracking ********************",data);
                })
                .catch(error => {
                    console.error('There was a problem with your fetch operation:', error);
                });
            }
        }    
    }
};

export { clearpierGamePlayService };