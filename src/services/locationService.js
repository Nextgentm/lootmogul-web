import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAaEf2eeCw8mtgV8F-rG3_ISQY7Gbt7fnU");
const getPosition = () => {
    return new Promise((resolve, reject) => {
        if (navigator?.geolocation?.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let coordinates = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    resolve(coordinates);
                },
                (error) => reject(error),
                { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
            );
        }
    });
};
const getAddress = () => {
    return new Promise(
        (resolve, reject) => {
            getPosition().then((res) => {
                if (res) {
                    Geocode.fromLatLng(res.lat, res.lng).then((address) => {
                        if (address) {
                            let state =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some(
                                            (m) =>
                                                m ===
                                                "administrative_area_level_1"
                                        )
                                ).long_name;
                            let country =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some((m) => m === "country")
                                ).short_name;
                            let city =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some((m) => m === "locality")
                                )?.short_name;
                            let city1 =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some(
                                            (m) =>
                                                m ===
                                                "administrative_area_level_1"
                                        )
                                )?.long_name;
                            let location = { state: state, country: country };
                            resolve(location);
                        } else
                            resolve({
                                state: "No State defined",
                                country: "No Country defined"
                            });
                    });
                } else
                    resolve({
                        state: "No State defined",
                        country: "No Country defined"
                    });
            });
        },
        (error) => reject(error),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
};
export const CheckAvailableLocation = (isByPass = false) => {
    isByPass = true;
    let promise = new Promise((resolve, reject) => {
        if (!isByPass)
            getAddress().then((res) => {
                if (res) {
                    if (res.country !== "No Country defined") {
                        isBlocked(res).then((value) => {
                            if (value) {
                                resolve({
                                    isBan: true,
                                    isBanText: `Sorry! Cash games are not permitted in ${res.state}`
                                });
                            } else {
                                resolve({
                                    isBan: false,
                                    isBanText: ``,
                                    res: res
                                });
                            }
                        });
                    } else {
                        resolve({
                            isBan: true,
                            isBanText: `Please enable your location`
                        });
                    }
                }
            });
        else {
            resolve({ isBan: false, isBanText: ``, res: {} });
        }
    });
    return promise;
};
const isBlocked = (req) => {
    const bannedStates = [
        "Arizona",
        "Arkansas",
        "Connecticut",
        "Delaware",
        "Louisiana",
        "Montana",
        "South Carolina",
        "South Dakota",
        "Tennessee"
    ];
    let promise = new Promise((resolve, reject) => {
        // if(req.country === "US" || req.country == 'IN')
        {
            const isExist = bannedStates.find((m) => m === req.state);
            if (!isExist) {
                resolve(false);
            } else {
                resolve(true);
            }
        }
        // else {
        //   resolve(true);
        // }
    });
    return promise;
};

export const getCurremtLocation = () => {
    return new Promise(
        (resolve, reject) => {
            getPosition().then((res) => {
                if (res) {
                    Geocode.fromLatLng(res.lat, res.lng).then((address) => {
                        if (address) {
                            let state =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some(
                                            (m) =>
                                                m ===
                                                "administrative_area_level_1"
                                        )
                                ).long_name;
                            let country =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some((m) => m === "country")
                                ).short_name;
                            let city =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some((m) => m === "locality")
                                )?.short_name;
                            let city1 =
                                address.results[0].address_components.find(
                                    (im) =>
                                        im.types.some(
                                            (m) =>
                                                m ===
                                                "administrative_area_level_1"
                                        )
                                )?.long_name;
                            let location = { state: state, country: country };
                            resolve(location);
                        } else
                            resolve({
                                state: "No State defined",
                                country: "No Country defined"
                            });
                    });
                } else
                    resolve({
                        state: "No State defined",
                        country: "No Country defined"
                    });
            });
        },
        (error) => reject(error),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
    );
};