import { Text } from "@chakra-ui/react";

import strapi from "../../../src/utils/strapi";
import GameDetails from "../../../src/features/GamesDetails";
import { GamePixDetail } from "../../../src/features/Games/GamePixDetail";
import { useRouter } from "next/router";

export default function Gamepix({ data, error }) {
    console.log("data", data)
    const { query } = useRouter();
    console.log('query', query)
    return (
        <GamePixDetail gameSlug={query.gameslug} gameid={query.id} />
    );
}

