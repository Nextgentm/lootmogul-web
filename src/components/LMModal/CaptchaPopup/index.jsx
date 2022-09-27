import ReCAPTCHA from "react-google-recaptcha";
import React, { useEffect } from "react";
const CaptchaPopup = ({ onChange }) => {
    const recaptchaRef = React.createRef();
    useEffect(() => {
        if (recaptchaRef) recaptchaRef.current?.execute();
    }, [recaptchaRef]);

    const onReCAPTCHAChange = async (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        try {
            const response = await fetch("/api/verifyCaptcha", {
                method: "POST",
                body: JSON.stringify({ captcha: captchaCode }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                onChange();
            } else {
                const error = await response.json();
                throw new Error(error.message);
            }
        } catch (error) {
        } finally {
            recaptchaRef.current?.reset();
        }
    };
    return (
        <ReCAPTCHA
            theme="dark"
            style={{ textAlign: "center", margin: "auto", marginTop: "1%" }}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onReCAPTCHAChange}
        />
    );
};
export default CaptchaPopup;
