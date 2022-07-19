import ReCAPTCHA from "react-google-recaptcha";
import React ,{useEffect} from "react";
const CaptchaPopup = ({onChange})=>{
  const recaptchaRef = React.createRef();
  //  const captchaOptions = {
  //       useRecaptchaNet: true,
  //     };
      useEffect(()=>{
        if(recaptchaRef)
        recaptchaRef.current?.execute();
      },[recaptchaRef])

      const onReCAPTCHAChange = async (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
          return;
        }
        try {
          const response = await fetch("/api/verifyCaptcha", {
            method: "POST",
            body: JSON.stringify({ captcha: captchaCode }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            // If the response is ok than show the success alert
             onChange();
          } else {
            // Else throw an error with the message returned
            // from the API
            const error = await response.json();
            throw new Error(error.message)
          }
        } catch (error) {
          //console.log(error?.message || "Something went wrong");
        } finally {
        
          recaptchaRef.current?.reset();
        }
      };
return  <ReCAPTCHA theme="dark" style={{textAlign:"center", margin:"auto",marginTop:"1%"}}
    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
    onChange={onReCAPTCHAChange}
  />

}
export default CaptchaPopup;