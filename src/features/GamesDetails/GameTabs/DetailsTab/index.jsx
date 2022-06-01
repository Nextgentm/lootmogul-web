import {Box, Heading, Text, Table, Thead, Th, Tbody, Tr, Td,UnorderedList,ListItem} from "@chakra-ui/react";
import dynamic from 'next/dynamic'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const newMarkDownTheme = {
  p: props => {
    const { children } = props;
    return (
      <Text mb={2} fontSize={'14px'}>
        {children}
      </Text>
    );
  },
};

const DetailsTab = ({gameData})=>{
      
      return <Box mt="2%" width="100%">
            {gameData?.reward && (<>
        <Heading color="white"> Prizing</Heading>
        
        {gameData?.type=='battle' && (
              <Table mt="2%" w = "100%" bg="#1C1C1C" variant="striped" color="#C7C7C7" colorScheme="stripedTable">
        <Thead key="thead_1">
            <Th color= "white">No of Players</Th>
            <Th color= "white" textAlign="right"> WINNINGS</Th>
        </Thead>
        {gameData?.reward?.data?.rewardrange &&
       ( <Tbody key="tbody_1">
      
            {gameData.reward.data.rewardrange.map((rr, index) =>

                  (<Tr key={"reward--"+index}>
                    <Td > {rr.name} Players</Td>
                    <Td textAlign="right">${rr.amount}</Td>               
               
              </Tr>)
            )}
        </Tbody>)
       }
        
      </Table>

        )}
        {gameData?.type=='leaderboard' && (
                  <Table mt="2%" w = "100%" bg="#1C1C1C" variant="striped" color="#C7C7C7" colorScheme="stripedTable">
        <Thead key="thead_1">
            <Th color= "white">Rank</Th>
            <Th color= "white" textAlign="right"> WINNINGS</Th>
        </Thead>

        {gameData?.reward?.data?.rewardrange &&
       ( <Tbody key="tbody_1">
      
            {gameData.reward.data.rewardrange.map( (rr,index)=>

                  (<Tr key={"reward2--"+index}>             
                    <Td > {rr.rankFrom} - {rr.rankTo}</Td>
                    <Td textAlign="right">{rr.name}</Td>               
               
              </Tr>)
            )}
        </Tbody>)
       }
            </Table>
        )}
      
      
      </>)}


        <Heading mt="2%" color="white"> How to Play</Heading>
        <UnorderedList mt="2%" color="textual" variant="textualVal">
  <ListItem>Open your preferred browser from mobile or desktop/laptop and visit website https://lootmogul.com</ListItem>
  <ListItem>You can Sign Up/Register if it is your first time, or else Login if already registered either with Facebook or Google.</ListItem>
  <ListItem>Message will pop to allow for location capturing (for regulatory purpose), you may click on “ALLOW” when prompted. It is a mandatory requirement for legal compliance.</ListItem>
  <ListItem>For playing Cash contests you will first need to deposit and add money to LootMogul.com wallet. Click on Wallet Symbol top right corner in the application from the game lobby page.</ListItem>
  <ListItem>Once you click the Wallet you will see the My Account page. Click on the “ADD MONEY” button. You may either select denomination for deposit or enter your denomination/amount for deposit. You will be redirected to the payment aggregator page for completing the deposit process. Once the deposit transaction is successfully completed you are ready to play cash games.</ListItem>
  <ListItem>Once deposit is completed you may return to the main game lobby page and select to play any contest or game listed under “Game of Week / Influencer Tournaments / Advanced Premium Tournaments”. You can play the cash game and WIN cash prizes.</ListItem>
  <ListItem>When you join the trivia battle contest, you will be shown, searching for the opponent player(s) screen. Minimum 2 players to start a contest, maximum 5 players </ListItem>
  <ListItem>When matched, the game starts :) ; if not matched with any opponent, money gets refunded (in case of paid contests)</ListItem>
  <ListItem>You will receive timed questions. Depending on the contest there will be 4 to 5 questions per contest.</ListItem>
  <ListItem>If you answer within 2 seconds you get 6 points</ListItem>
  <ListItem>If you answer in T &gt;	2 and T &lt; 5 seconds you get 4 points</ListItem>
  <ListItem>If you answer in T &gt;	4 and T &lt; 9 seconds you get 2 points</ListItem>
  <ListItem>If you answer in T &gt; 8 and T &lt; 11 seconds you get 1 points</ListItem>
  <ListItem>At the end of each contest, you can rejoin the same contest or go back to home &amp; browse other contest categories.</ListItem>
</UnorderedList>
       
<Heading mt="2%" color="white"> Contest Terms &amp; Conditions</Heading>
{gameData?.tandc  && 
 (<Box  color="white" > <ReactMarkdown rehypePlugins={[rehypeRaw]}  components={ChakraUIRenderer(newMarkDownTheme)} remarkPlugins={[remarkGfm]} skipHtml>{gameData.tandc}</ReactMarkdown> </Box>
 )} 
{!gameData?.tandc  &&   (    <UnorderedList mt="2%" color="textual" variant="textualVal">
        
        <ListItem>The contest joining is $1/$2/$5 to play as shown above in the entry fee.</ListItem>
        <ListItem>If the contest gets canceled, the entry fee amount gets refunded back immediately.</ListItem>
        <ListItem>Only one account per user is permitted on Lootmogul.com . If we detect multiple accounts of the same Player, then the entire Bonus/amount credited in each account would be debited and nullified, nor will such player(s) be eligible for any offer or contest winnings.</ListItem>
        <ListItem>Top players will be eligible to win Prizes from the total kitty.</ListItem>
        <ListItem>In case of Tie - amount will be split /refunded back to the source of the money. Eg. if money was deducted from the Deposit wallet, it will be credited back instantly.</ListItem>
<ListItem>Winning players will be informed on the battle result screen immediately.</ListItem>
<ListItem>If the management team traces multiple accounts then such user and account will be blocked and may not stand eligible for winning any prizes.</ListItem>
<ListItem>All winnings will be credited instantly</ListItem>
<ListItem>Employees of NextGenTM Inc., all subsidiaries and its partners are not eligible to participate or opt for these Offers.</ListItem>
<ListItem>All Lootmogul.comTerms of Service and its Privacy policy will be applicable.</ListItem>
<ListItem>These Offers are subject to the sole discretion of management at Lootmogul.com &amp; NextGenTM Inc.; management holds the right to withdraw/modify any of these Offers anytime without prior notice. Management retains the right to decide the outcome of any disputes.
</ListItem>
<ListItem>Lootmogul.com &amp; NextGenTM Inc. management will have the right to publish the list of beneficiaries of these Offers on its website, social media, or any other media at any time it deems fit.
</ListItem>
<ListItem>This game involves an element of financial risk and may be addictive. Please play responsibly and at your own risk.
</ListItem>
<ListItem>Only Winnings are withdrawable subject to the terms and conditions.</ListItem>
</UnorderedList>
)}
    </Box>
}

export default DetailsTab;