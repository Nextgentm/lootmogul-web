import strapi from "../../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../../src/components/MyPageLoader";
import SEOContainer from "../../../src/features/SEOContainer";
import NotFound from "../../../src/features/404";
import { getSeoData } from "../../../src/queries/strapiQueries";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";

const defaultSEOData = {
    metaTitle:
        "Buy & Trade Exclusive Limited Edition NFTs Of Your Favorite Influencers",
    metaDescription:
        "Support Your Favorite Influencers By Buying And Trading Their NFTs. Get To Know More About Your Favorite Influencers On Lootmogul.com",
    canonicalURL: "https://lootmogul.com/nfts",
};

const CollectiblesComponent = dynamic(
    () => import("../../../src/features/Collectibles"),
    { loading: () => <MyPageLoader /> }
);

export default function CollectibleDetailsPage({ nftCollections, seoData }) {
    
    const router = useRouter();
    const [isValidCollection, setIsValidCollection] = useState(null);
    
    
    useEffect(()=>{
        const isValid = nftCollections.find(c => c.slug.toLowerCase() === router.query.slug.toLowerCase());
        setIsValidCollection(isValid);
    });

    return (
        <>
            <SEOContainer
                seoData={seoData ? seoData[0]?.sharedSeo : defaultSEOData}
            />
            
            {isValidCollection != undefined ?  <CollectiblesComponent
                data={nftCollections || []}
                banner={seoData[0]?.banner?.data}
            /> : <NotFound isNfts={true}></NotFound>}
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

export async function getStaticPaths() {

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

    data = data.flat();
    const paths = data?.map((nft) => ({
        params: { slug: nft.slug || nft.id.toString() },
    }));

    return { paths, fallback: "blocking" };
}


