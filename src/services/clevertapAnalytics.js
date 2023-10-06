import axios from "axios";

export const pageview = async (url) => {
    const strapi_jwt = window.localStorage?.getItem("strapi_jwt");
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
            "Browser Information":userAgent,
            "Device Type":deviceType,
            "Os Type":osType ? osType : '',
        });
    }
    else{
        clevertap.event.push("Page View",{
            "Page Name":url,
            "State":lm_user_state ? lm_user_state : "",
            "Country":lm_user_location ? lm_user_location : "",
            "Source":utm_source ? utm_source : '',
            "Medium":utm_medium ? utm_medium : '',            
            "Campaign":utm_campaign ? utm_campaign : '',
            "Browser Information":userAgent,
            "Device Type":deviceType,
            "Os Type":osType ? osType : '',
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
            "MSG-sms": false, // Enable sms notifications
            "MSG-whatsapp": false // Enable WhatsApp notifications
        }
    });
    //console.log(clevertap);
};

export const onUserLoginRegistrationEvent = ({ action, params, pathname, transaction }) => {
   
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
        "Source":utm_source ? utm_source : '',
        "Medium":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
        "Browser Information":userAgent,
        "Device Type":deviceType,
        "Os Type": osType ? osType : '',
        "Signup_Login Source": utm_medium ? utm_medium : ''
      });
      //console.log(clevertap);
};

export const onGamePlayNowButton = async ({ action, params }) => {
    const utm_source = window.localStorage?.getItem("utm_source");
    const utm_medium = window.localStorage?.getItem("utm_medium");
    const utm_campaign = window.localStorage?.getItem("utm_campaign");
    const lm_user_location = window.localStorage?.getItem("lm_user_location");
    const lm_user_state = window.localStorage?.getItem("lm_user_state");

    const strapi_jwt = window.localStorage?.getItem("strapi_jwt");
    
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

    if(strapi_jwt != null){
        //console.log('Great to see play');
        const onUserGameData = await axios.get(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
                `/api/clevertap/game`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + strapi_jwt
                    }
                }
        );
        
        if(onUserGameData.data?.data){
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
                "Medium":utm_medium ? utm_medium : '',            
                "Campaign":utm_campaign ? utm_campaign : '',
                "First Game Date":onUserGameData.data?.data.firstGameDate,
                "Last Game Date":onUserGameData.data?.data.lastGameDate,
                "First Cash Game Date":onUserGameData.data?.data.firstCashGameDate,
                "Last Cash Game Date":onUserGameData.data?.data.lastCashGameDate,
                "First Free Game Date":onUserGameData.data?.data.firstFreeGameDate,
                "Last Free Game Date":onUserGameData.data?.data.lastFreeGameDate,
                "Total Game Play Count":onUserGameData.data?.data.totalGamePlayCount,
                "Total Cash Play count":onUserGameData.data?.data.totalCashPlayCount,
                "Total Free Play count":onUserGameData.data?.data.totalFreePlayCount,
                "Total Games Won count":onUserGameData.data?.data.totalGamesWonCount,
                "Total Games Cash Won Count":onUserGameData.data?.data.totalGamesCashWonCount,
                "Total Games Free Won Count":onUserGameData.data?.data.totalGamesFreeWonCount,
                "Total Games Cash Lost Count":onUserGameData.data?.data.totalGamesCashLostCount,
                "Total Games Lost count":onUserGameData.data?.data.totalGamesLostCount,
                "Total Cash Won Amount":onUserGameData.data?.data.totalCashWonAmount,
                "Last Win Date":onUserGameData.data?.data.lastWinDate,
                "First Rejoin Date":onUserGameData.data?.data.firstRejoinDate,
                "Last Rejoin Date":onUserGameData.data?.data.lastRejoinDate,
                "Total Rejoin Count":onUserGameData.data?.data.totalRejoinCount,
                "Total Rejoin Cash Game Count":onUserGameData.data?.data.totalRejoinCashGameCount,
                "Total Rejoin Free Game Count":onUserGameData.data?.data.totalRejoinFreeGameCount,
                "First Cash Game Won Date":onUserGameData.data?.data.firstCashGameWonDate,
                "First Free Game Won Date":onUserGameData.data?.data.firstFreeGameWonDate,
                "Last Played Device":onUserGameData.data?.data.lastPlayedDevice,
                "Last Played Client":onUserGameData.data?.data.lastPlayedClient,
                "Last Played OS":onUserGameData.data?.data.lastPlayedOs,
                "Last Played Game Type":onUserGameData.data?.data.lastPlayedGameType,
                "Last Played Game Subtype":onUserGameData.data?.data.lastPlayedGameSubType,
                "Last Played Game Category":onUserGameData.data?.data.lastPlayedGameCategory,
                "Browser Information": userAgent,
                "Device Type": deviceType,
                "Os Type": osType ? osType : '',
            });

            //console.log(clevertap);
        }
    }
    else{
        //console.log('Please login and play');
        clevertap.event.push("Game Play Now Button", {
            "Button Name": params.ButtonName,
            "Collection Name": params.CollectionName,
            "Game Name": params.GameName,
            "State":lm_user_state ? lm_user_state : "",
            "Country":lm_user_location ? lm_user_location : "",
            "Source":utm_source ? utm_source : '',
            "Source":utm_medium ? utm_medium : '',            
            "Campaign":utm_campaign ? utm_campaign : '',
            "Browser Information": userAgent,
            "Device Type": deviceType,
            "Os Type": osType ? osType : '',
        });
    }
    
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

export const onUserLogout = ({ action, params }) => {
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
        "Username": params.username,
        "Player ID": params.id,
        "Email ID":  params.email,
        "Mobile No": params.mobileNumber,
        "First name": params.fullName,
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


export const onDepositInitiate = ({ action, params }) => {
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
        "Medium":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
        "Browser Information": userAgent,
        "Device Type": deviceType,
        "Os Type": osType ? osType : '',
        "Signup_Login Source": utm_medium ? utm_medium : ''
      });
};


export const onWithdrawalRequest = ({ action, params }) => {
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
        "Medium":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
        "Browser Information": userAgent,
        "Device Type": deviceType,
        "Os Type": osType ? osType : '',
        "Signup_Login Source": utm_medium ? utm_medium : ''
      });
};


export const onAmbassadorCategory  = ({ action, params }) => {
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
        "Category name": params.Category,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID":  params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.Firstname,
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

export const onGameGameOver = ({ action, params }) => {
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
        "Medium":utm_medium ? utm_medium : '',            
        "Campaign":utm_campaign ? utm_campaign : '',
        "Browser Information": userAgent,
        "Device Type": deviceType,
        "Os Type": osType ? osType : '',
    });
};
