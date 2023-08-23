export const pageview = (url) => {
    clevertap.event.push("Page View",{
        "Page Name":url
    });
};

export const onUserLogin = ({ action, params }) => {
    clevertap.onUserLogin.push({
        Site: {
            Name: params.username, // String
            Identity: params.username, // String or number
            Email: params.email, // Email address of the user
            Phone: params.mobileNumber, // Phone (with the country code)
            Gender: "M", // Can be either M or F
            DOB: new Date(), // Date of Birth. Date object
            // optional fields. controls whether the user will be sent email, push etc.
            "MSG-email": false, // Disable email notifications
            "MSG-push": true, // Enable push notifications
            "MSG-sms": true, // Enable sms notifications
            "MSG-whatsapp": true // Enable WhatsApp notifications
        }
    });
};

export const onUserLoginRegistrationEvent = ({ action, params }) => {
    clevertap.event.push(action, {
        "Username": params.username,
        "Player ID": params.id,
        "Email ID": params.email,
        "Mobile No.": params.mobileNumber,
        "First name": params.fullName,
        "Last Name": "",
        "First Visit": new Date().toISOString()
      });
};

export const onGamePlayNowButton = ({ action, params }) => {
    clevertap.event.push("Game Play Now Button", {
        "Button Name": params.ButtonName,
        "Collection Name": params.CollectionName,
        "Game Name": params.GameName,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID": params.EmailID,
        "Mobile No": params.MobileNo
    });
};

export const onGameplayStart = ({ action, params }) => {
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
    });
};

export const onUserLogout = ({ action, params }) => {
    clevertap.event.push(action, {
        "Username": params.username,
        "Player ID": params.id,
        "Email ID":  params.email,
        "Mobile No": params.mobileNumber,
        "First name": params.fullName,
      });
};


export const onDepositInitiate = ({ action, params }) => {
    
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
      });
};


export const onWithdrawalRequest = ({ action, params }) => {
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
      });
};


export const onAmbassadorCategory  = ({ action, params }) => {
    clevertap.event.push(action, {
        "Category name": params.Category,
        "Username": params.Username,
        "Player ID": params.PlayerID,
        "Email ID":  params.EmailID,
        "Mobile No": params.MobileNo,
        "First name": params.Firstname,
      });
};

export const onGameGameOver = ({ action, params }) => {
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
    });
};
