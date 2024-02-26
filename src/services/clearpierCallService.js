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


const clearpierGamePlayService = async () => {
    const utm_medium = localStorage.getItem("logged_utm_medium");
    const utm_term = localStorage.getItem("logged_utm_term");

    let wmadv = null;
    if (utm_medium == "cp" && process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging') {
        console.log("***************** Clearpier Game Played ********************");
        /*wmadv = await axios.get(
            `http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=2222ad3b7bcc4e18cf90017ebe31251a&event_name=gameplay`
        );*/
        fetch(`http://tracking.hangmytracking.com/conv.php?cid=${utm_term}&stoken=2222ad3b7bcc4e18cf90017ebe31251a&event_name=gameplay`, {
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

export { clearpierGamePlayService };