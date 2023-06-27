export const pageview = (url) => {
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url
    });
};

export const event = ({ action, params }) => {
    window.gtag('event', action, params);
};

export const eventTracking = ({ action, params }) => {
    window.gtag('event', action, params);
    clevertap.event.push(action,params);
};