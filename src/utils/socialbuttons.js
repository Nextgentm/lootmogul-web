import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
    LineIcon,
    LineShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    LivejournalShareButton,
    LivejournalIcon,
    TelegramShareButton,
    TelegramIcon,
    TumblrShareButton,
    TumblrIcon,
    MailruShareButton,
    MailruIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    ViberShareButton,
    ViberIcon,
    VKShareButton,
    VKIcon,
    WeiboShareButton,
    WeiboIcon,
    WorkplaceShareButton,
    WorkplaceIcon,
    PocketShareButton,
    PocketIcon,
    InstapaperShareButton,
    InstapaperIcon,
    HatenaShareButton,
    HatenaIcon,
    EmailShareButton,
    EmailIcon
} from "next-share";

import { Box, Divider, Wrap, Text } from "@chakra-ui/layout";
import {
    Portal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverCloseButton,
    PopoverBody
} from "@chakra-ui/react";
import strapi from "./strapi";

const NextShare = ({ link, caption, hashtag , type="none", influencer=null,user = null}) => {
   
    const LogShareClick = ()=>{
        if(type === "influencer" && influencer){
            // record share event
            strapi.request(
                "get",
                "connection/recordInfluencerShare?influencer=" +
                    influencer.id,
                {}
            );
        }
    }
    return (
        <Portal>
            <PopoverContent
                bg="#303030"
                borderRadius="10px"
                color="white"
                borderColor={"black"}
                _focus={{ border: "none", boxShadow: "none" }}
            >
                <PopoverArrow bg="black" />
                <PopoverHeader>Share with</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody border={"black"}>
                    <Box display="flex" flexDir="column" gridGap="5px">
                        <Wrap>
                            <FacebookShareButton
                                url={link}
                                quote={caption}
                                hashtag={hashtag}
                                onClick={LogShareClick}
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <LinkedinShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>

                            <TwitterShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            <PinterestShareButton url={link} media={caption}    onClick={LogShareClick}>
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <LineShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <LineIcon size={32} round />
                            </LineShareButton>
                            <FacebookMessengerShareButton url={link} appId={""}    onClick={LogShareClick}>
                                <FacebookMessengerIcon size={32} round />
                            </FacebookMessengerShareButton>
                            <MailruShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <MailruIcon size={32} round />
                            </MailruShareButton>

                            <LivejournalShareButton
                                url={link}
                                title={caption}
                                description={""}
                                onClick={LogShareClick}
                            >
                                <LivejournalIcon size={32} round />
                            </LivejournalShareButton>
                            <TelegramShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <TelegramIcon size={32} round />
                            </TelegramShareButton>
                            <TumblrShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <TumblrIcon size={32} round />
                            </TumblrShareButton>

                            <RedditShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <RedditIcon size={32} round />
                            </RedditShareButton>
                            <ViberShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <ViberIcon size={32} round />
                            </ViberShareButton>

                            <VKShareButton
                                url={link}
                                image={
                                    process.env.NEXT_PUBLIC_SITE_URL + "/assets/lm_logo.png"
                                }
                                onClick={LogShareClick}
                            >
                                <VKIcon size={32} round />
                            </VKShareButton>
                            <WeiboShareButton
                                url={link}
                                title={caption}
                                image={
                                    process.env.NEXT_PUBLIC_SITE_URL + "/assets/lm_logo.png"
                                }
                                onClick={LogShareClick}
                            >
                                <WeiboIcon size={32} round />
                            </WeiboShareButton>

                            <WorkplaceShareButton url={link} quote={caption}    onClick={LogShareClick}>
                                <WorkplaceIcon size={32} round />
                            </WorkplaceShareButton>
                            <PocketShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <PocketIcon size={32} round />
                            </PocketShareButton>
                            <InstapaperShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <InstapaperIcon size={32} round />
                            </InstapaperShareButton>

                            <HatenaShareButton url={link} title={caption}    onClick={LogShareClick}>
                                <HatenaIcon size={32} round />
                            </HatenaShareButton>

                            <EmailShareButton
                                url={link}
                                subject={caption}
                                body={caption}
                                onClick={LogShareClick}
                            >
                                <EmailIcon size={32} round />
                            </EmailShareButton>
                        </Wrap>
                        <Divider my="1rem" />
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Portal>
    );
};

export default NextShare;
