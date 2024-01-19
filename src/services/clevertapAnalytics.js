import axios from "axios";

export const pageview = (url) => {
    clevertap.event.push("Page View",{
        "Page Name":url,
    });
}

export const pageRequest = (url) => {
    clevertap.event.push("Page Request",{
        "Page Name":url,
    });
}

export const onUserLogin = async ({ action, params, jwt }) => {
    console.log('onUserLogin Called');
    
    
    const onUserLoginData = await axios.get(
        process.env.NEXT_PUBLIC_STRAPI_API_URL +
            `/api/clevertap/user`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Bearer " + jwt
                }
            }
    );

    //console.log(onUserLoginData);
   
    if (process.env.NEXT_PUBLIC_SENTRY_ENV === 'staging' && onUserLoginData?.data) {
        console.log('Updating onUserLoginData...');
        clevertap.event.push("Login", {
            "User":params.username,
        });
        clevertap.profile.push({
            Site: {
                Name: params.username, // String
                Identity: params.username, // String or number
                Email: params.email, // Email address of the user
                Phone: '', // Phone (with the country code)
                Gender: "M", // Can be either M or F
                DOB: new Date(), // Date of Birth. Date object
                // optional fields. controls whether the user will be sent email, push etc.
                "MSG-email": true, // Disable email notifications
                "MSG-push": true, // Enable push notifications
                "MSG-sms": false, // Enable sms notifications
                "MSG-whatsapp": false, // Enable WhatsApp notifications
               
                "Player Id": onUserLoginData?.data?.data?.playerId || '',
                "Mobile":onUserLoginData?.data?.data?.mobile || '',
                "Fname":onUserLoginData?.data?.data?.firstName || '',
                //"State":onUserLoginData?.data?.data?.playerId || '',
                //"City":onUserLoginData?.data?.data?.playerId || '',
                //"Country":onUserLoginData?.data?.data?.playerId || '',
                "Last Login IP":onUserLoginData?.data?.data?.lastLoginIp || '',
                "Registration_IP":onUserLoginData?.data?.data?.registrationIp || '',
                "Registration_date":onUserLoginData?.data?.data?.registrationDate || '',
                "Email Verified":onUserLoginData?.data?.data?.emailVerified == true ? 'Yes' : 'No',
                "Mobile Verified":onUserLoginData?.data?.data?.mobileVerfied == true ? 'Yes' : 'No',
                "Profile Complete":onUserLoginData?.data?.data?.profileComplete == true ? 'Yes' : 'No',
                "Registration Device":onUserLoginData?.data?.data?.registrationDevice || '',
                "Registration Client":onUserLoginData?.data?.data?.registrationClient || '',
                "Registration OS":onUserLoginData?.data?.data?.registrationOs || '',
                "Login Count":onUserLoginData?.data?.data?.loginCount || '',
                "First login Date":onUserLoginData?.data?.data?.firstLoginDate || '',
                "Last login Date":onUserLoginData?.data?.data?.lastLoginDate || ''                
            }
        });
    }
    //console.log(clevertap);
};

export const onGameplayStart = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");

    const userAgent = navigator.userAgent;
    const osType = navigator.platform;    
    let deviceType = "Unknown";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        deviceType = "Mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
        deviceType = "Tablet";
    } else if (/Windows|Mac|Linux/i.test(userAgent)) {
        deviceType = "Desktop";
    }

    clevertap.event.push(action, {
        "Category": params.Category,
        "Game Type": params.GameType,
        "Game Subtype": params.GameSubtype,
        "Game Denomination": params.GameDenomination,
        "Max Players": params.MaxPlayers,
        "Players Actually Played": params.PlayersPlayed,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID": params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.FullName,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Medium":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
        "Browser Information": userAgent,
        "Device Type": deviceType,
        "Os Type": osType ? osType : '',
    });
};