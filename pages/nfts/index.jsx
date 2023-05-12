import strapi from "../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";

const defaultSEOData = {
    metaTitle:
        "Buy & Trade Exclusive Limited Edition NFTs Of Your Favorite Influencers",
    metaDescription:
        "Support Your Favorite Influencers By Buying And Trading Their NFTs. Get To Know More About Your Favorite Influencers On Lootmogul.com",
    canonicalURL: "https://lootmogul.com/nfts",
};

const CollectiblesComponent = dynamic(
    () => import("../../src/features/Collectibles"),
    { loading: () => <MyPageLoader /> }
);

export default function ColleNFTctiblePage({ nftCollections, seoData }) {
    return (
        <>
        
            <SEOContainer
                seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData}
            />
            <CollectiblesComponent
                data={nftCollections || []} 
                banner={seoData[0]?.banner?.data}
            />
        </>
    )
}

export async function getStaticProps() {
    // Fetch data from external API
    let pageNo = 1;
    let data = [];
    const res = await strapi.find("nft-collections", {
        sort: "priority",
        populate: {
            nftSet: {
                filters: {
                    isFeatured: true,
                },
                populate: {
                    nft_kred: {
                        fields: [
                            "slug",
                            "marketURL",
                            "front_image",
                            "back_image",
                            "name",
                            "isAuction",
                            "market_price",
                            "sale_price",
                        ],
                    },
                },
            },
            banner: { fields: ["url"] },
        },
        pagination: {
            page: pageNo,
            pageSize: 25,
        },
    });
    if (res?.meta) {
        data.push(res.data);
    }
    // Pass data to the page via props
    const nftCollections = data.flat();
    const seoData = await getSeoData("nfts");
    return {
        props: { nftCollections, seoData },
        revalidate: 600, // In seconds
    };
}