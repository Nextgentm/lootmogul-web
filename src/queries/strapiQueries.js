import strapi from "../utils/strapi";

const getstripeSession = async (data) => {
    return await strapi.create("configs");
};

const getSeoData = async(slug)=>{
   
        const { data } = await strapi.find("landing-page-seos", {
          publicationState:'preview',
          filters: { slug: slug },        
          populate: ["sharedSeo","sharedSeo.metaImage"]
        });      
        return data;
    
}
export { getstripeSession, getSeoData };
