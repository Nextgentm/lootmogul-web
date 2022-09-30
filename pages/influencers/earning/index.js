import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Flex,
  Text,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

const CustomedFormLabel = ({ title, required }) => {
  return (
    <FormLabel htmlFor="email">
      <Flex>
        <Text color="white">{title}</Text>
        {required && (
          <Text pl={2} color="red">
            *
          </Text>
        )}
      </Flex>
    </FormLabel>
  );
};

const SectionHeader = ({ title, subtitle = "" }) => {
  const currentSize = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
  });

  return (
    <Flex
      my={[3, 6]}
      mt={[5, 10]}
      alignItems="center"
      flexDirection={currentSize === "base" ? "column" : "row"}
    >
      <Text
        color="white"
        fontSize={["18px", "24px"]}
        style={{
          fontWeight: "bold",
          textAlign: currentSize === "base" ? "center" : "left",
          textTransform: "uppercase",
        }}
        fontFamily="Sora"
        pr={4}
      >
        {title}
      </Text>

      {subtitle !== "" && (
        <Text
          color="white"
          fontFamily="Sora"
          textAlign={currentSize === "base" ? "center" : "left"}
          mt={currentSize === "base" ? 2 : 0}
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );
};

const Divider = () => {
  return <Box height="1px" bg="#98B7D2" my={[4, 12]} />;
};

const Page = () => {
  const [followers, setFollowers] = useState();
  const [followersCR, setFollowersCR] = useState();
  const [followersC, setFollowersC] = useState();

  const [entryFee, setEntryFee] = useState();
  const [gamesPlayed, setGamesPlayed] = useState();
  const [platformShare, setPlatformShare] = useState();
  const [dailyRevenue, setDailyRevenue] = useState();
  const [monthlyRevenue, setMonthlyRevenue] = useState();
  const [nftCR, setNftCR] = useState();
  const [nftPrice, setNftPrice] = useState();
  const [weeklyNftPurchase, setWeeklyNftPurchase] = useState();

  const [commissionFee, setCommissionFee] = useState();
  const [weeklyRev, setWeeklyRev] = useState();
  const [monthlyRev, setMonthlyRev] = useState();
  const [totalRev, setTotalRev] = useState();
  const [nftOV, setNftOV] = useState();
  const [royaltyPC, setRoyaltyPc] = useState();
  const [nftGrowth, setNftGrowth] = useState();

  const [timeElapsed, setTimeElapsed] = useState();
  const [nftRoyalties, setNftRoyalties] = useState();

  useEffect(() => {
    if (followers && followersCR)
      setFollowersC(parseInt((followers * followersCR) / 100));
  }, [followers, followersCR]);

  useEffect(() => {
    if (followersC && entryFee && gamesPlayed && platformShare) {
      setDailyRevenue(
        (followersC * entryFee * gamesPlayed * platformShare) / 100
      );
    }
  }, [followersC, entryFee, gamesPlayed, platformShare]);

  useEffect(() => {
    if (dailyRevenue) {
      setMonthlyRevenue(dailyRevenue * 30);
    }
  }, [dailyRevenue]);

  useEffect(() => {
    if (followersC && nftCR && nftPrice && weeklyNftPurchase && commissionFee) {
      setWeeklyRev(
        (followersC * nftCR * nftPrice * weeklyNftPurchase * commissionFee) /
          100
      );
    }
  }, [followersC, nftCR, nftPrice, weeklyNftPurchase, commissionFee]);

  useEffect(() => {
    if (weeklyRev) {
      setMonthlyRev(weeklyRev * 4);
    }
  }, [weeklyRev]);

  useEffect(() => {
    if (monthlyRev && monthlyRevenue) {
      setTotalRev(monthlyRev + monthlyRevenue);
    }
  }, [monthlyRev, monthlyRevenue]);

  useEffect(() => {
    if (nftOV && royaltyPC && nftGrowth && timeElapsed) {
      if (timeElapsed > 0)
        setNftRoyalties(
          ((nftOV * royaltyPC) / 100 +
            (((nftOV * royaltyPC) / 100) * nftGrowth) / 100) *
            Math.pow(2, timeElapsed - 1)
        );
      else setNftRoyalties((nftOV * royaltyPC) / 100);
    }
  }, [nftOV, royaltyPC, nftGrowth, timeElapsed]);

  return (
    <Box
      py={[5, 10]}
      position="relative"
      overflowX="hidden"
      className="custom-earning"
    >
      <Box position="absolute" top="0" left="-250px" zIndex="-1">
        <Image src="/assets/bg-wave.png" alt="wave" />
      </Box>

      <Box
        bg="rgba(72, 26, 127, .36)"
        width={"90%"}
        style={{
          margin: "0 auto",
        }}
        p={["10px", "0"]}
        borderRadius={"8px"}
      >
        <Box
          p={["10px", "40px"]}
          border="3px solid #481A7F8F"
          borderRadius={"8px"}
        >
          <Box mb={"30px"}>
            <Text
              fontSize={["28px", "58px"]}
              textAlign="center"
              fontWeight="bold"
              textTransform="uppercase"
              fontFamily="Blanch"
              color="white"
            >
              Influencer Earnings Potential
            </Text>

            <Text
              textAlign="center"
              color="white"
              fontWeight={600}
              fontSize={["12px", "16px"]}
              fontFamily="Sora"
            >
              By gamification of your NFTs and Meta Avatars
            </Text>
          </Box>

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={2}
          >
            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="followers" title="Followers" />
                <Input
                  id="followers"
                  type="number"
                  placeholder="ex: 10000"
                  value={followers}
                  onChange={(e) => setFollowers(e.target.value)}
                  style={styles.input}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Total number of followers across all social channels (e.g.
                  Instagram + TikTok + YouTube)
                </FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          <Divider />

          {/* Game Revenue */}

          <SectionHeader title="Game Revenue" />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="followers"
                  title="Conversion Ratio (%)"
                />
                <Input
                  id="followersc"
                  type="number"
                  placeholder="ex: 4"
                  style={styles.input}
                  value={followersCR}
                  onChange={(e) => setFollowersCR(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Typical ratio for automated influencer branded games is 3% to
                  7% of total influencer followers
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="follower_conversion"
                  title="Follower Conversion"
                />
                <Input
                  id="follower_conversion"
                  type="number"
                  defaultValue={0}
                  value={followersC}
                  onChange={(e) => setFollowersC(e.target.value)}
                  style={styles.input}
                  _placeholder={{ color: "#707070" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel htmlFor="entry_fee" title="Entry Fee ($)" />
                <Input
                  id="entry_fee"
                  type="number"
                  placeholder="ex: 1"
                  style={styles.input}
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Average fee is $1 to $3 per 60 second battle
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="entry_fee"
                  title="Games Played Per Day"
                />
                <Input
                  id="entry_fee"
                  type="number"
                  placeholder="ex: 3"
                  style={styles.input}
                  value={gamesPlayed}
                  onChange={(e) => setGamesPlayed(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Typically gamers will play 2 to 7 rounds
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="platform_fee_share"
                  title="Platform Fee Share (50%)"
                />
                <Input
                  id="platform_fee_share"
                  type="number"
                  placeholder="50"
                  style={styles.input}
                  value={platformShare}
                  onChange={(e) => setPlatformShare(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  There is a 50/50 split platform fee
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="game_daily_revenue"
                  title="Daily Revenue ($)"
                />
                <Input
                  id="game_daily_revenue"
                  type="number"
                  defaultValue={0}
                  style={styles.input}
                  value={dailyRevenue}
                  onChange={(e) => setDailyRevenue(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Daily Revenue Calculation</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="game_monthly_revenue"
                  title="Monthly Revenue ($)"
                />
                <Input
                  id="game_monthly_revenue"
                  type="number"
                  defaultValue={0}
                  style={styles.input}
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Monthly Revenue Calculation</FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          {/* NFT Revenue */}

          <SectionHeader title="NFT Revenue" />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="conversion_ratio"
                  title="Conversion Ratio (%)"
                />
                <Input
                  id="conversion_ratio"
                  type="number"
                  placeholder="ex: 1"
                  style={styles.input}
                  value={nftCR}
                  onChange={(e) => setNftCR(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Typical 0.5% to 1%</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel htmlFor="nft_price" title="NFT Price ($)" />
                <Input
                  id="nft_price"
                  type="number"
                  placeholder="ex: $25"
                  style={styles.input}
                  value={nftPrice}
                  onChange={(e) => setNftPrice(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="weekly_nft_purchases"
                  title="Weekly NFT Purchases"
                />
                <Input
                  id="weekly_nft_purchases"
                  type="number"
                  placeholder="ex: 1"
                  style={styles.input}
                  value={weeklyNftPurchase}
                  onChange={(e) => setWeeklyNftPurchase(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Typically gamers will play 1 to 4 rounds with the influencer
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="commionsionfee"
                  title="Commission Fee (%)"
                />
                <Input
                  id="commionsionfee"
                  type="number"
                  placeholder="75"
                  style={styles.input}
                  value={commissionFee}
                  onChange={(e) => setCommissionFee(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Loot Mogul gives 75% of NFT Purchase Price
                </FormHelperText>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="weekly_revenue"
                  title="Weekly Revenue ($)"
                />
                <Input
                  id="weekly_revenue"
                  type="number"
                  defaultValue={0}
                  color="white"
                  style={styles.input}
                  value={weeklyRev}
                  onChange={(e) => setWeeklyRev(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Daily Revenue Calculation</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="monthly_revenue"
                  title="Monthly Revenue ($)"
                />
                <Input
                  id="monthly_revenue"
                  type="number"
                  defaultValue={0}
                  color="white"
                  style={styles.input}
                  value={monthlyRev}
                  onChange={(e) => setMonthlyRev(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Monthly Revenue Calculation</FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          {/* Grand Total */}

          <SectionHeader title="Grand Total" />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="monthly_grand_total"
                  title="Grand Total Monthly Revenue ($)"
                />
                <Input
                  id="monthly_grand_total"
                  type="number"
                  placeholder="ex: 100%"
                  style={styles.input}
                  value={totalRev}
                  onChange={(e) => setTotalRev(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>Monthly - Game + NFT Revenue</FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          {/* NFT Royalties */}

          <SectionHeader
            title="NFT Royalties"
            subtitle="(Calculate your Lifetime Value (LTV) of your NFT Royalties over X months.)"
          />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="nft_original_value"
                  title="NFT Original Value"
                />
                <Input
                  id="nft_original_value"
                  type="number"
                  placeholder="ex: $25"
                  style={styles.input}
                  value={nftOV}
                  onChange={(e) => setNftOV(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="smart_contract_royalty"
                  title="Royalty (%) in Smart Contract"
                />
                <Input
                  id="smart_contract_royalty"
                  type="number"
                  placeholder="ex: 10%"
                  style={styles.input}
                  value={royaltyPC}
                  onChange={(e) => setRoyaltyPc(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="nft_increase"
                  title="Increase of NFT (%)"
                />
                <Input
                  id="nft_increase"
                  type="number"
                  placeholder="ex: 100%"
                  style={styles.input}
                  value={nftGrowth}
                  onChange={(e) => setNftGrowth(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>The % growth for the NFT</FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="time_elapsed"
                  title="Time Elapsed (Months)"
                />
                <Input
                  id="time_elapsed"
                  type="number"
                  placeholder="ex: 23"
                  style={styles.input}
                  value={timeElapsed}
                  onChange={(e) => setTimeElapsed(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
                <FormHelperText>
                  Number of months you would like to see in value of the NFT
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl mb={["12px", "24px"]}>
                <CustomedFormLabel
                  htmlFor="nft_royalties"
                  title="NFT Royalties (Per Month)"
                />

                <Input
                  id="nft_royalties"
                  type="number"
                  defaultValue={0}
                  style={styles.input}
                  value={nftRoyalties}
                  onChange={(e) => setNftRoyalties(e.target.value)}
                  _placeholder={{ color: "#707070" }}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box position="absolute" bottom="0" right="-700px" zIndex="-1">
        <Image src="/assets/bg-bottom-wave.png" alt="wave" />
      </Box>
    </Box>
  );
};

const styles = {
  helperText: {
    color: "#9E9E9E",
  },
  input: {
    background: "#FCFCFD",
    color: "#111",
  },
};

export default Page;
