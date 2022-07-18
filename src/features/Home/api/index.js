import strapi from "../../../utils/strapi";
import { useQuery, useQueryClient } from "react-query";

export const apiBanners = async () => {
    const { data } = await strapi.find("campaigns", {
        filters: { position: "home_top" },
        fields: ["callToAction", "redirectURL", "slug"],
        sort: "priority",
        populate: {
            bannerImage: {
                fields: ["name", "url"]
            }
        }
    });
    return data;
};

export const apiPromotionBanners = async () => {
    const { data } = await strapi.find("campaigns", {
        filters: { position: "promotion_top" },
        fields: ["callToAction", "redirectURL", "slug", "status", "overlay"],
        sort: "priority",
        populate: {
            bannerImage: {
                fields: ["name", "url"]
            }
        }
    });
    return data;
};

export const apiPromotionBannersDetails = async () => {
    const { data } = await strapi.find("campaigns", {
        filters: { position: "promotion_top" },
        sort: "priority",
        populate: {
            bannerImage: {
                fields: ["name", "url"]
            }
        }
    });
    return data;
};

export const apiInfluencers = async () => {
    const { data } = await strapi.find("influencers", {
        filters: { featured: true },
        fields: ["name", "slug", "tagline"],
        sort: "order",
        populate: {
            contestmasters: {
                fields: ["entryFee"],
                populate: {
                    feeWallet: {
                        populate: {
                            currency: {
                                fields: ["type"]
                            }
                        }
                    }
                }
            },
            icon: {
                fields: ["name", "url"]
            }
        }
    });
    return data;
};

export const apiGames = async () => {
    const { data } = await strapi.find("games", {
        sort: "priority",
        populate: { 1: "icon" }
    });
    return data;
};

export const apiContestsFeatured = async () => {
    const { data } = await strapi.find("contestmasters", {
        filters: { isFeatured: true, status: "active" },
        fields: ["name", "slug", "entryFee","retries"],
        sort: "priority",
        populate: {
            feeWallet: {
                populate: {
                    currency: {
                        fields: ["type"]
                    }
                }
            },
            icon: {
                fields: ["name", "url"]
            }
        }
    });

    return data;
};

const apiContestsAll = async () => {
    const { data } = await strapi.find("contestmasters", {
        filters: { status: "active" },
        sort: "priority",
        populate: "*"
    });
    return data;
};

const apiNftsRelated = async (id) => {
    if (id) {
        const { data } = await strapi.findOne("nft-kreds", id, {
            populate: ["related_nfts"]
        });
        return data;
    }
    return [];
};

const apiActiveContests = async (contestmaster) => {
    if (contestmaster) {
        const { data } = await strapi.find("contests", {
            sort: "createdAt:DESC",
            filters: { contestmaster: constestmaster }
        });
        return data;
    }
    return [];
};

export const apiFaqs = async () => {
    const { data } = await strapi.find("blog-articles", {
        filters: {
            blog_category: { blog_category: { slug: "faq" } },
            featured: true
        },
        sort: "order"
    });
    return data;
};

export const apiFaqPage = async () => {
    const { data } = await strapi.find("blog-categories", {
        filters: { blog_category: { slug: "faq" } },
        populate: "blog_articles",
        sort: "priority"
    });
    return data;
};

export const apiNews = async (options) => {
    const { data } = await strapi.find("blog-categories", {
        ...options,
        sort: "blog_articles.order"
    });
    return data;
};

export const apiTestimonials = async () => {
    const { data } = await strapi.find("blog-categories", {
        filters: { slug: "testimonials" },
        populate: {
            blog_articles: {
                sort: "order",
                filters: { featured: true },
                fields: ["content"],
                populate: {
                    author: {
                        fields: "name",
                        populate: {
                            picture: {
                                fields: "url"
                            }
                        }
                    }
                }
            }
        }
    });
    return data[0].blog_articles.data;
};

export const apiLikeRequests = async (user) => {
    if (user) {
        const resp = await strapi.find("connections", {
            filters: { sender: user.id },
            populate: ["influencer"]
        });
        const inf = resp?.data?.map((con) => con.influencer?.data?.id);
        return inf;
    }
    return [];
};

export const Invalidate = (tag) => {
    // Get QueryClient from the context
    // const queryClient = useQueryClient();
    // queryClient.invalidateQueries(tag);
};

const FETCH_BANNERS = "FETCH_BANNERS";
const FETCH_PROMO_BANNERS = "FETCH_PROMO_BANNERS";
const FAQ = "FAQ";
const FAQPAGE = "FAQPAGE";
const NEWS = "NEWS";
const TESTIMONIALS = "TESTIMONIALS";
const FEATURED_INFLUENCERS = "FEATURED_INFLUENCERS";
const TRENDING_GAMES = "TRENDING_GAMES";
const TRENDING_CONTESTS = "TRENDING_CONTESTS";
const ALL_CONTESTS = "ALL_CONTESTS";
const NFTS_RELATED = "NFTS_RELATED";
const CONTESTS_OF_CONTESTMASTERS = "CONTESTS_OF_CONTESTMASTERS";
export const INFLUENCER_LIKE = "INFLUENCER_LIKE";

export const useBanners = () => useQuery(FETCH_BANNERS, apiBanners);
export const usePromotionBanners = () =>
    useQuery(FETCH_PROMO_BANNERS, apiPromotionBannersDetails);

export const useFAQs = () => useQuery(FAQ, apiFaqs);
export const useFAQPage = () => useQuery(FAQPAGE, apiFaqPage);
export const useNews = (activeFilter, options) =>
    useQuery([NEWS, activeFilter], () => apiNews(options));
export const useTestimonials = () => useQuery(TESTIMONIALS, apiTestimonials);
export const useFeaturedInfluencers = () =>
    useQuery(FEATURED_INFLUENCERS, apiInfluencers);
export const useTrendingGames = () => useQuery(TRENDING_GAMES, apiGames);
export const useTrendingContests = () =>
    useQuery(TRENDING_CONTESTS, apiContestsFeatured);
export const useAllContests = () => useQuery(ALL_CONTESTS, apiContestsFeatured);
export const useApiLikeRequests = (user, enabled = false) => {
    return useQuery([INFLUENCER_LIKE, user?.id], () => apiLikeRequests(user), {
        refetchOnWindowFocus: false,
        enabled: !!enabled
    });
};
export const useApiNftsRelated = (id) =>
    useQuery([NFTS_RELATED, id], () => apiNftsRelated(id));

export const useApiContests = (contestmaster) =>
    useQuery([CONTESTS_OF_CONTESTMASTERS, contestmaster], () =>
        apiActiveContests(contestmaster)
    );
