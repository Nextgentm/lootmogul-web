import strapi from "../../src/utils/strapi";

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
      return res.status(401).json({ message: 'Invalid token' })
    }

    const FetchData=async (api)=>{
      let pageNo=1;
      let pageCount = 1;
      let data = [];
      try{
      do {
        const res = await strapi.find(api, {
         sort: "id",
         fields: ["slug"],
         pagination: {
           page: pageNo,
           pageSize: 100,
         },
       });
       if(res?.meta){
         data.push(res.data);
         if(pageCount==1){
           pageCount = res.meta.pagination.pageCount
         }
       }
        pageNo++;
       } while (pageNo<=pageCount);
       data = data.flat();
       return data;
      }
      catch(error){
        return [];
      }
    }
    
  try {
       res.unstable_revalidate('/')
       res.unstable_revalidate('/influencers')
       res.unstable_revalidate('/nfts')
       res.unstable_revalidate('/games')
       res.unstable_revalidate('/about-us')
       res.unstable_revalidate('/founder-nfts')

      const allInf = await FetchData("influencers")
      allInf?.map(async inf=>{
          if(inf.slug)
             res.unstable_revalidate('/influencer/'+inf.slug)
        }
      )

      const allContests = await FetchData("contestmasters")

      allContests?.map(async contest=>
        { if(contest.slug)
             res.unstable_revalidate('/games/'+ contest.slug)
        }

      )
      const allNfts = await FetchData("nft-kreds")

  
      allNfts?.map(async nft=>
        {
          if(nft.slug)
             res.unstable_revalidate('/nfts/'+ nft.slug)
        }

      )
      const allPromos = await FetchData("campaigns")

      allPromos?.map(async pro=>{
        if(pro.slug)
           res.unstable_revalidate('/promotions/'+ pro.slug)
      }

      )
      const totalPages = allInf?.length + allContests?.length + allNfts?.length + allPromos?.length + 5;
      return res.json({ revalidated: true , pages: totalPages})

    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send('Error revalidating')
    }
  }
  