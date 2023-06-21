import { NextSeo } from "next-seo";

const SEOContainer = ({ seoData, content, pageName }) => {
  return (
    <>
      {seoData && (
        <NextSeo
          title={seoData.metaTitle || content?.name}
          description={seoData.metaDescription || content?.description}
          canonical={
            seoData.canonicalURL ||
            process.env.NEXT_BASE_URL + "/" + pageName + "/" + content?.slug
          }
          openGraph={{
            url:
              seoData.canonicalURL ||
              process.env.NEXT_BASE_URL + "/" + pageName + "/" + content?.slug,
            title: seoData.metaTitle || content?.name,
            description: seoData.metaDescription || content?.description,
            images: [
              {
                url:
                  seoData.metaImage?.data?.url ||
                  (content?.icon?.data.length > 0 &&
                    content?.icon?.data[0].url),
                alt: content?.name,
                type: "image/jpeg",
              },
            ],
            site_name: "LootMogul",
          }}
          twitter={{
            handle: "@lootmogul",
            site: "@lootmogul.com",
            cardType: "summary_large_image",
          }}
        />
      )}
    </>
  );
};
export default SEOContainer;
