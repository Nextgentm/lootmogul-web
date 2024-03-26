import Strapi from "strapi-sdk-js";

const strapiInstanceWithCustomHeader = (customHeaders = {}) => {
const strapi = new Strapi({
  url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api`,
  store: {
    key: "strapi_jwt",
    useLocalStorage: true,
    cookieOptions: { path: "/" }
  },
  axiosOptions: {headers: customHeaders}
});
strapi.axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    
    if (error.response) {
      const { status } = error.response;
      switch (status) {
        case 401: case 403: {

          strapi.logout();
          if (location.pathname != "/")
            window.location.replace("/");
          break;
        }
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

return strapi;
};

export default strapiInstanceWithCustomHeader;
