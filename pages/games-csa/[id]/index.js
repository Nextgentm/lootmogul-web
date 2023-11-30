import { Text } from "@chakra-ui/react";

import strapi from "../../../src/utils/strapi";
import GameDetails from "../../../src/features/GamesDetails";

export default function GameById({ data, error }) {
  if (error) {
    return (
      <Text fontFamily={"Sora"} fontSize="20px" color="white" p="20px">
        {error}
      </Text>
    );
  }
  return (
    <GameDetails gameData={data?.data?.length > 0 ? data?.data[0] : {} || {}} />
  );
}

export async function getStaticProps(context) {
  // Fetch data from external API

  const { id = "" } = context.params;
  const filter = isNaN(id) ? { slug: id } : { id: id };
  const data = await strapi.find("contestmasters", {
    filters: filter,
    populate: [
      "icon",
      "banner",
      "influencer",
      "reward.rewardrange",
      "contest_section",
      "feeWallet.currency",
      "game",
    ],
  });
  if (data) {
    return {
      props: { data: data },
      revalidate: 600, // In seconds
    };
  }
}

export async function getStaticPaths() {
  // Fetch data from external API
  let pageNo = 1;
  let pageCount = 1;
  let data = [];
  do {
    const res = await strapi.find("contestmasters", {
      sort: "priority",
      pagination: {
        page: pageNo,
        pageSize: 100,
      },
    });

    if (res?.meta) {
      data.push(res.data);
      if (pageCount == 1) {
        pageCount = res.meta.pagination.pageCount;
      }
    }
    pageNo++;
  } while (pageNo <= pageCount);
  // Pass data to the page via props
  data = data.flat();

  const paths = data?.map((game) => ({
    params: { id: game.slug || game.id.toString() },
  }));

  return { paths, fallback: "blocking" };
}
