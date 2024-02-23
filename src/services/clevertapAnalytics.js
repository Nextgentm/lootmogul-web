import axios from "axios";

export const pageview = async (url) => {
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
        let strapi_jwt = '';
        if (typeof window !== 'undefined') {
            strapi_jwt = window.localStorage?.getItem("token") ? window.localStorage?.getItem("token") : window.localStorage?.getItem("strapi_jwt");
        }
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

        const onUserLoginData =  await axios.get(
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

        if(onUserLoginData.data){
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
        
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
}

export const onUserLogin = async ({ action, params, jwt, pathname }) => {
    
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
        //console.log('onUserLogin Called');
        const utm_source = window.localStorage?.getItem("utm_source");
        const utm_medium = window.localStorage?.getItem("utm_medium");
        const utm_campaign = window.localStorage?.getItem("utm_campaign");
        const lm_user_location = window.localStorage?.getItem("lm_user_location");
        const lm_user_state = window.localStorage?.getItem("lm_user_state");
    
        
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

        const onUserTransactionData = await axios.get(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
                `/api/clevertap/transaction`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + jwt
                    }
                }
        );

        const onUserGameData = await axios.get(
            process.env.NEXT_PUBLIC_STRAPI_API_URL +
                `/api/clevertap/game`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + jwt
                    }
                }
        );
    
        if (onUserLoginData?.data && onUserGameData?.data && onUserTransactionData?.data) {
            //console.log('Updating onUserLoginData...');
            
            /*clevertap.notifications.push({
                "titleText":'Stay updated & power up your play!',
                "bodyText":'Enable push notifications for the latest updates! We assure you that we will send relevant content only.',
                "okButtonText":'Yes',
                "rejectButtonText":'No',
                "okButtonColor":'#e90a63',
                "askAgainTimeInSeconds":120,
                "notification_bgcolor":"#FF0000",
                "okButtonBgColor":"#FF0000",
                "okButtonCallback": function () {
                    console.log("User clicked OK");
                },
                "dismissCallback": function () {
                    console.log("User dismissed the notification");
                }
            });*/
            
            clevertap.event.push(action, {
                "Page Name":pathname ? pathname : '/',
                "Username": params.username,
                "Email": params.email,
                "Player Id": onUserLoginData?.data?.data?.playerId || '',
                "Mobile":onUserLoginData?.data?.data?.mobile || '',
                "Fname":onUserLoginData?.data?.data?.firstName || '',
                "Device":onUserLoginData?.data?.data?.registrationDevice || '',
                "First Visit":onUserLoginData?.data?.data?.firstLoginDate || '',
                "Last Visit":onUserLoginData?.data?.data?.lastLoginDate || '',
                "Device":onUserLoginData?.data?.data?.registrationDevice || '',
                "Client":onUserLoginData?.data?.data?.registrationClient || '',
                "OS":onUserLoginData?.data?.data?.registrationOs || '',

                "State":lm_user_state ? lm_user_state : "",          
                "Country":lm_user_location ? lm_user_location : "",
                "Source":utm_source ? utm_source : '',
                "Medium":utm_medium ? utm_medium : '',            
                "Campaign":utm_campaign ? utm_campaign : '',            
                /* IP Address | IMEI No. | Mac Adress | Windows Device ID*/
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
                    "State":lm_user_state ? lm_user_state : "",          
                    "Country":lm_user_location ? lm_user_location : "",
                    "Domain Name":pathname ? pathname : '/',
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
                    "Last login Date":onUserLoginData?.data?.data?.lastLoginDate || '',
                    
                    "Last Played Device":onUserGameData?.data?.data?.lastPlayedDevice || '',
                    "Last Played Client":onUserGameData?.data?.data?.lastPlayedClient || '',
                    "Last Played OS":onUserGameData?.data?.data?.lastPlayedOs || '',
                    "Last Played Game Type":onUserGameData?.data?.data?.lastPlayedGameType || '',
                    "Last Played Game Subtype":onUserGameData?.data?.data?.lastPlayedGameSubType || '',
                    "Last Played Game Category":onUserGameData?.data?.data?.lastPlayedGameCategory || '',
                    "First Game Date":onUserGameData?.data?.data?.firstGameDate || '',
                    "Last Game Date":onUserGameData?.data?.data?.lastGameDate || '',
                    "First Cash Game Date":onUserGameData?.data?.data?.firstCashGameDate || '',
                    "Last Cash Game Date":onUserGameData?.data?.data?.lastCashGameDate || '',
                    "First Free Game Date":onUserGameData?.data?.data?.firstFreeGameDate || '',
                    "Last Free Game Date":onUserGameData?.data?.data?.lastFreeGameDate || '',
                    "Total Game Play Count":onUserGameData?.data?.data?.totalGamePlayCount || '',
                    "Total Cash Play count":onUserGameData?.data?.data?.totalCashPlayCount || '',
                    "Total Free Play count":onUserGameData?.data?.data?.totalFreePlayCount || '',
                    "Total Games Won count":onUserGameData?.data?.data?.totalGamesWonCount || '',
                    "Total Games Cash Won Count":onUserGameData?.data?.data?.totalGamesCashWonCount || '',
                    "Total Games  Free Won Count":onUserGameData?.data?.data?.totalGamesFreeWonCount || '',
                    "Total Games Cash Lost Count":onUserGameData?.data?.data?.totalGamesCashLostCount || '',
                    "Total Games Lost count":onUserGameData?.data?.data?.totalGamesLostCount || '',
                    "Total Cash Won Amount":onUserGameData?.data?.data?.totalCashWonAmount || '',
                    "Last Win Date":onUserGameData?.data?.data?.lastWinDate || '',
                    "First Rejoin Date":onUserGameData?.data?.data?.firstRejoinDate || '',
                    "Last Rejoin Date":onUserGameData?.data?.data?.lastRejoinDate || '',
                    "Total Rejoin Count":onUserGameData?.data?.data?.totalRejoinCount || '',
                    "Total Rejoin Cash Game Count":onUserGameData?.data?.data?.totalRejoinCashGameCount || '',
                    "Total Rejoin Free Game Count":onUserGameData?.data?.data?.totalRejoinFreeGameCount || '',
                    "First Cash Game Won Date":onUserGameData?.data?.data?.firstCashGameWonDate || '',
                    "First Free Game Won Date":onUserGameData?.data?.data?.firstFreeGameDate || '',

                    "First Deposit Date":onUserTransactionData?.data?.data?.firstDepositSuccess?.date || '',
                    "Last Deposit Date":onUserTransactionData?.data?.data?.lastDepositSuccess?.date || '',
                    "Total Deposited Amount": onUserTransactionData?.data?.data?.totalDepositChips || '',
                    "Deposit Count": onUserTransactionData?.data?.data?.successDepositCount || '',
                    "First Withdrawal Date": onUserTransactionData?.data?.data?.firstWithdrawSuccess?.date || '',
                    "Last Withdrawal Date": onUserTransactionData?.data?.data?.lastWithdrawSuccess?.data || '',
                    "Total Withdrawaled Amount": onUserTransactionData?.data?.data?.totalWithdrawChips || '',
                    "Withdrawal Count": onUserTransactionData?.data?.data?.successWithdrawCount || ''
                    
                }
            });
        }
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
};

export const onGameplayStart = ({ action, params, currentContest, score = '' }) => {
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
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
            "Contest Name":currentContest?.name,
            "Game Type": currentContest?.contest_section?.data?.name,
            "Game Subtype": currentContest?.game?.data?.name,
            "Game Price": currentContest?.entryFee != 0 ? currentContest?.entryFee + ' Chips' : 'Free',
            "Max Players": "",
            "Players Actually Played": currentContest?.game?.data?.config?.game == "marketjs"
                ? currentContest?.allTimePlayCount
                : currentContest?.allTimeRoomsCount
            ,
            "Total Score": action == 'Gameplay Completed' ? score[0]?.score : '',
            "Total Points":  action == 'Gameplay Completed' ? score[0]?.points : '',
            // "Total game play duration": params.Username,
            // "Rejoin counts": params.Username,
            "Username": params?.username,
            "Player Id": params?.id || '',
            "Email ID": params?.email || '',
            "Mobile": params?.mobileNumber || '',
            "Fname":params?.fullName || '',
            "Device":deviceType || '',
            "Client":userAgent || '',
            "OS":osType || '',
            "State":lm_user_state ? lm_user_state : "",          
            "Country":lm_user_location ? lm_user_location : "",
            "Source":utm_source ? utm_source : '',
            "Medium":utm_medium ? utm_medium : '',            
            "Campaign":utm_campaign ? utm_campaign : ''           
        });
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
};

export const onUserLogout = ({ action, params, pathname }) => {
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
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
            "Page Name": pathname ? pathname : '/',
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
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
};

export const onDepositInitiate = ({ action, params, deposit, pathname }) => {
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
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
            "Total LM Chips":deposit.Chip,
            "Amount": deposit.Amount,
            "Payment Gateway": deposit.PaymentGateway,
            "Payment Type": deposit.PaymentType,
            "Payment Currency":deposit.currency,
            "Payment SubType": deposit.PaymentSubType,
            "Page Name":pathname ? pathname : '/',

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
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
};

export const onWithdrawalRequest = ({ action, params, withdrawalData }) => {
    if(process.env.NEXT_PUBLIC_CLEVER_TAP_STATUS == 'true'){
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
            "Withdrawal Status": "Requested",
            "Withdrawal Amount": withdrawalData.Amount,
            "Withdrawal Chip": withdrawalData.Chip,
            "Payment Type": withdrawalData.PaymentType,
            "Payment SubType": withdrawalData.PaymentSubType,
            "Payment Currency": withdrawalData.currency,
            "Crypto Token": withdrawalData.cryptoToken,
            "Crypto Currency": withdrawalData.cryptocurrency,
            "Wallet Address": withdrawalData.walletAddress,
            "Beneficiary": withdrawalData.beneficiary,
            "Swift Code": withdrawalData.swiftcode,
            "Bank Name": withdrawalData.bankName,
            "Account Number": withdrawalData.accountnumber,
            "Beneficiary": withdrawalData.beneficiary,
            "Withdrawal Processing Time":"3 to 4 weeks",
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
            "Os Type": osType ? osType : ''        
        });
    }
    else{
        console.log('Error : CleverTap Disable from System');
    }
};