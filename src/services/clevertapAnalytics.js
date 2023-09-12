import axios from "axios";

export const pageview = (url) => {
    const strapi_jwt = window.localStorage?.getItem("strapi_jwt");
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    if(strapi_jwt){
        
        const onUserLoginData =  axios.get(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
                `/api/clevertap/user`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + strapi_jwt
                    }
                }
        );

        clevertap.event.push("Page View",{
            "Page Name":url,
            "Username": onUserLoginData.data?.data.username,
            "Player ID": onUserLoginData.data?.data.playerId,
            "Email": onUserLoginData.data?.data.email,
            "Mobile": onUserLoginData.data?.data.mobile,
            "Fname": onUserLoginData.data?.data.firstName,
            "Lname": onUserLoginData.data?.data.lastName,
            "State":lm_user_state ? lm_user_state : "",
            "Country":lm_user_location ? lm_user_location : "",
            "Source":utm_source ? utm_source : '',
            "Medium":utm_medium ? utm_medium : '',
            "Campaign":utm_campaign ? utm_campaign : '',
        });
    }
    else{
        clevertap.event.push("Page View",{
            "Page Name":url,
            "State":lm_user_state ? lm_user_state : "",
            "Country":lm_user_location ? lm_user_location : "",
            "Source":utm_source ? utm_source : '',
            "Source":utm_medium ? utm_medium : '',            
            "Campaign":utm_campaign ? utm_campaign : '',
        });
    }
       
    
};

export const onUserLogin = ({ action, params }) => {
    
    
    clevertap.onUserLogin.push({
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
            "MSG-sms": true, // Enable sms notifications
            "MSG-whatsapp": true // Enable WhatsApp notifications
        }
    });
};

export const onUserLoginRegistrationEvent = ({ action, params, pathname, transaction }) => {
    var lm_user_location = window.localStorage?.getItem("lm_user_location");
    var lm_user_state = window.localStorage?.getItem("lm_user_state");
    
    clevertap.event.push(action, {
        "Username": params.username,
        "Player ID": params.playerId,
        "Email": params.email,
        "Mobile": params.mobile,
        "Fname": params.firstName,
        "Lname": params.lastName,
        "State":lm_user_state ? lm_user_state : "",
        "City":"",
        "Domain Name":pathname ? pathname : '/',
        "Country":lm_user_location ? lm_user_location : "",
        "Last Login IP":params.lastLoginIp,
        "Registration_IP":params.registrationIp,
        "Registration_date":params.registrationDate,
        "Email Verified":params.emailVerified,
        "Mobile Verified":params.mobileVerfied,
        "Profile Complete":params.profileComplete,
        "Registration Device":params.registrationDevice,
        "Registration Client":params.registrationClient,
        "Registration OS": params.registrationOs,
        "Login Count":params.loginCount,
        "First login Date":params.firstLoginDate,
        "Last login Date":params.lastLoginDate,
        "First Deposit Date":transaction.firstDepositSuccess.date,
        "Last Deposit Date":transaction.lastDepositSuccess.date,
        "Deposit Count":transaction.successDepositCount,
        "First Withdrawal Date":transaction.firstWithdrawSuccess.date,
        "Last Withdrawal Date":transaction.lastWithdrawSuccess.date,
        "Total Withdrawaled Amount":transaction.totalDepositChips,
        "Withdrawal Count":transaction.successWithdrawCount,
      });
};

export const onGamePlayNowButton = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");

    clevertap.event.push("Game Play Now Button", {
        "Button Name": params.ButtonName,
        "Collection Name": params.CollectionName,
        "Game Name": params.GameName,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID": params.EmailID,
        "Mobile No": params.MobileNo,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
    });
};

export const onGameplayStart = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
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
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
    });
};

export const onUserLogout = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    clevertap.event.push(action, {
        "Username": params.username,
        "Player ID": params.id,
        "Email ID":  params.email,
        "Mobile No": params.mobileNumber,
        "First name": params.fullName,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
      });
};


export const onDepositInitiate = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    clevertap.event.push(action, {
        "Amount": params.Amount,
        "Chip": params.Chip,
        "Payment Gateway": params.PaymentGateway,
        "Payment Type": params.PaymentType,
        "Payment SubType": params.PaymentSubType,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID":  params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.Firstname,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
      });
};


export const onWithdrawalRequest = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    clevertap.event.push(action, {
        "Withdrawal Status": "Request",
        "Withdrawal Amount": params.Amount,
        "Withdrawal Chip": params.Chip,
        "Payment Type": params.PaymentType,
        "Payment SubType": params.PaymentSubType,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID":  params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.Firstname,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
      });
};


export const onAmbassadorCategory  = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    clevertap.event.push(action, {
        "Category name": params.Category,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID":  params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.Firstname,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
      });
};

export const onGameGameOver = ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");
    clevertap.event.push(action, {
        "Category": params.Category,
        "Game Type": params.GameType,
        "Game Subtype": params.GameSubtype,
        "Total Winnings":params.TotalWinnings,
        "Max Players": params.MaxPlayers,
        "Players Actually Played": params.PlayersPlayed,
        "Game Play Duration":params.GamePlayDuration,
        "Total Points":params.TotalPoints,
        "Rejoin Count":params.RejoinCount,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID": params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.FullName,
        "State":lm_user_state ? lm_user_state : "",
        "Country":lm_user_location ? lm_user_location : "",
        "Source":utm_source ? utm_source : '',
        "Source":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
    });
};
