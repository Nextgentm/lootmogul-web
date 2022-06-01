import Strapi from "strapi-sdk-js";

const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const strapi = new Strapi(apiUrl);
export default strapi;
export { apiUrl };
