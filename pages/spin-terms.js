import React from "react";
import {
  Box,
  Text,
  Link,
  OrderedList,
  UnorderedList, Image,
  ListItem
} from "@chakra-ui/react";

const spinTerms = () => {
  const TcData = [
    { id: 1, name: "All users can play spin wheel for free once every 24 hours." },
    { id: 2, name: "There are 6 prize options in the spin wheel" },
    { id: 3, name: " $5 cash bonus : $5 reward in bonus wallet which will be automatically given after claim button is clicked" },
    { id: 4, name: "$1 deposit cash : $1 reward in deposit wallet to be automatically given after claim button is clicked" },
    { id: 5, name: "Spin Again : Get another free spin instantly!" },
    { id: 6, name: "Goodies (eg. iPhone currently) will be sent to your address manually. You will receive mail within 24 hours asking for your physical delivery address. Once you share that, LootMogul team will get it delivered to your address." },
    { id: 7, name: "20% off on Deposit : A coupon for 20% cash back on deposit of $50 or more will be sent to you within 24 hours. You have to redeem it within 7 days of receiving it." },
    { id: 8, name: "Free NFT : Voila! You will receive an email from Lootmogul asking for your Crypto wallet address. Once you send it, based on which we will give a NFT on Opensea." },
    { id: 9, name: "If the management team traces multiple accounts then such user and account will be blocked and may not stand eligible for winning any prizes." },
    { id: 10, name: "Employees of NextGenTM Inc., all subsidiaries and its partners are not eligible to participate or opt for these Offers" },
    { id: 11, name: "All Lootmogul.comTerms of Service and its Privacy policy will be applicable." },
    { id: 12, name: "These Offers are subject to the sole discretion of management at Lootmogul.com & NextGenTM Inc.; management holds the right to withdraw/modify any of these Offers anytime without prior notice. Management retains the right to decide the outcome of any disputes" },
    { id: 13, name: "Lootmogul.com & NextGenTM Inc. management will have the right to publish the list of beneficiaries of these Offers on its website, social media, or any other media at any time it deems fit." },
    { id: 14, name: "This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk." },

  ];
  return (
    <Box
      m="4%"
      mt="2%"
      paddingLeft={["4%", "6%"]}
      paddingRight={["4%", "6%"]}
      color="white"
      background={"#1c1c1c"}
      fontFamily={"Sora"}
      textAlign="justify"
      pb="4%"
    >
      <Text
        color="white"
        fontFamily="Blanch"
        fontSize={["28px", "28px", "58px", "58px"]}
        mt="2%"
        pt="4%"
        mb="2%"
      >
        SPIN WHEEL TERMS AND CONDITIONS
      </Text>
      <OrderedList
        color="white"
        fontFamily="Sora"
        fontSize={"16px"}
        mt={["5%", "2%"]}
        mb={["5%", "2%"]}
        role="list"
      >
        <ListItem>
          <Text variant="staticText">Spin the Wheel is an in-app feature that allows logged in users to collect bonus cash, win free NFTs, win free spins or get coupons and other offers by playing spin wheel daily (gap of 24 hours)..  </Text>
        </ListItem>
        <ListItem>
          <Text variant="staticText">First step to playing spin wheel is to login daily on the LootMogul platform. </Text>
        </ListItem>
        <ListItem>
          <Text display="flex" variant="staticText">Click on the logo <Image mx="1%" width={["35px", "50px"]} height={["35px", "50px"]} alt="spin" src="/assets/spin.webp" /> to play spin wheel for free once every 24 hours. </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">There are 8 options in the spin wheel. </Text>
          <UnorderedList
            color="#C7C7C7"
            ml="5%"


            role="list"
          >
            <ListItem>
            Metaverse Seats NFT
            </ListItem>
            <ListItem>
            Platinum Cards NFT
            </ListItem>
            <ListItem>
            Meta Avatars NFT
            </ListItem>
            <ListItem>
            Monster Series NFT
            </ListItem>
            <ListItem>Trading Cards NFT
            </ListItem>
            <ListItem>
            Sports Items NFT
            </ListItem>
            <ListItem>
              Free Spin again

            </ListItem>
            <ListItem>
              Try again next time!


            </ListItem>
          </UnorderedList>
        </ListItem>   <ListItem>
          <Text variant="staticText">In case you win free NFTs, we will send out an emailer instantly to your registered email ID on LootMogul with directions/steps to claim. </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">Free NFT redemption steps:</Text>
          <UnorderedList
            color="#C7C7C7"
            ml="5%"


            role="list"
          >
            <ListItem>
              You will receive an email from LootMogul requesting to share your Crypto wallet address via email
            </ListItem>
            <ListItem>
              Email us at support@lootmogul.com your crypto wallet address within 3 working days from the date of receiving the winning email.

            </ListItem>
            <ListItem>
              Once we receive your crypto wallet address, we will transfer the winning NFT to your crypto wallet on  Opensea within 3 working days from the date of receiving your email with the wallet details.
            </ListItem>
          </UnorderedList>
        </ListItem>   <ListItem>
          <Text variant="staticText">Any registered user on LootMogul platform can win a maximum of 5 NFTs in a period of 3 months. Once the waiting period is over, users can spin to win more NFTs.</Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">We at LootMogul do not share, reveal your personal or wallet details with any external agencies, companies or with anyone internally or externally. </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">Wallet addresses shared by players are only for transferring winning NFT and for no other purpose. The LootMogul team and/or management is not responsible for loss or theft of any information which is not related to our platform.
          </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">Only those wallet addresses which are supported by Opensea and/or LootMogul will be accepted for NFT or prize transfer.
          </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">If the management team traces multiple accounts then such user and account will be blocked and may not stand eligible for winning any prizes or winning NFT may be forfeited. </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">Employees of NextGenTM Inc., all subsidiaries and its partners are not eligible to participate or opt for these Offers.
          </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">All Lootmogul.comTerms of Service and its Privacy policy will be applicable. </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">These Offers are subject to the sole discretion of management at Lootmogul.com & NextGenTM Inc.; management holds the right to withdraw/modify any of these Offers anytime without prior notice. Management retains the right to decide the outcome of any disputes.</Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">Lootmogul.com & NextGenTM Inc. management will have the right to publish the list of beneficiaries of these Offers on its website, social media, or any other media at any time it deems fit.
          </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">These terms and conditions are additional to and operate in conjunction with the LootMogul Terms and Conditions. Defined terms in the LootMogul Terms and Conditions shall apply in these terms and conditions, unless otherwise defined.
          </Text>
        </ListItem>   <ListItem>
          <Text variant="staticText">We cannot accept liability for any lost, incomplete, indecipherable or delayed entries caused by technical factors beyond our reasonable control.
          </Text>
        </ListItem>
      </OrderedList>
    </Box>
  );
};
export default spinTerms;
