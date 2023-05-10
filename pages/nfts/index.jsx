import strapi from "../../src/utils/strapi";
import dynamic from "next/dynamic";
import MyPageLoader from "../../src/components/MyPageLoader";
import SEOContainer from "../../src/features/SEOContainer";
import { getSeoData } from "../../src/queries/strapiQueries";
import CookieConsent from "react-cookie-consent";

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
        <CookieConsent
            location="bottom"
            buttonText="Accept"
            cookieName="myAwesomeCookieName2"
            style={{ background: "#100026", fontSize: "45px",fontFamily:"Blanch",lineHeight:"50px" }}
            buttonStyle={{ color:"#fff", background: "#e90a63", fontSize: "25px",lineHeight:"1", width:"100px" }}
            expires={150}
            >
            We value your privacy
            {" "}
            <br/><span style={{ fontSize: "25px",width:"75%",display:"block",lineHeight:"25px" }}>We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept”, you consent to the use of ALL the cookies.</span>
        </CookieConsent>
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