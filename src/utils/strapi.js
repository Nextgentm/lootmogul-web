import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: `${process.env.NEXT_PUBLIC_STRAPI_API_URL|| "https://gamification.tpix.in"}/api`,
  store: {
    key: "strapi_jwt",
    useLocalStorage: true,
    cookieOptions: { path: "/" }
  },
  axiosOptions: {}
});
strapi.axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    const { status } = error.response;
    switch (status) {
      case 401: case 403:{
        console.log("user not found");
        
        // localStorage.removeItem('user-storage');
        window.location.replace("/");
        break;
      }
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default strapi;
