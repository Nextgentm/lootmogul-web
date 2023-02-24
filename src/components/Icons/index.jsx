/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-key */
import { Icon, Button } from "@chakra-ui/react";
export const DepositAddIcon = (props) => (
    <Icon {...props}>
        <circle cx="0" cy="0" r="5" fill="white" />
        <rect x="14" y="7" width="4" height="18" rx="2" fill="currentColor" />
        <rect
            x="7"
            y="18"
            width="4"
            height="18"
            rx="2"
            transform="rotate(-90 7 18)"
            fill="currentColor"
        />
    </Icon>
);
export const FilterIcon = (props) => (
    <Icon {...props}>
        <path
            d="M8.14914 3.27322H13.8529C14.4351 3.27322 14.9731 2.96128 15.2642 2.45503C15.5552 1.94879 15.5552 1.32491 15.2642 0.81867C14.973 0.312426 14.435 0.000488281 13.8529 0.000488281H8.14914C7.56694 0.000488281 7.02893 0.312421 6.73779 0.81867C6.44678 1.32491 6.44678 1.94879 6.73779 2.45503C7.02897 2.96128 7.56699 3.27322 8.14914 3.27322ZM8.14914 0.81867H13.8529C14.144 0.81867 14.413 0.974634 14.5585 1.22776C14.704 1.48089 14.704 1.79282 14.5585 2.04594C14.413 2.29906 14.144 2.45503 13.8529 2.45503H8.14914C7.85795 2.45503 7.58897 2.29907 7.44346 2.04594C7.29796 1.79282 7.29796 1.48088 7.44346 1.22776C7.58897 0.974639 7.85796 0.81867 8.14914 0.81867Z"
            fill="white"
        />
        <path
            d="M5.70383 10.6365H16.2964C16.8786 10.6365 17.4167 10.3246 17.7078 9.81832C17.9988 9.31207 17.9988 8.6882 17.7078 8.18195C17.4166 7.67571 16.8786 7.36377 16.2964 7.36377H5.70383C5.12163 7.36377 4.58362 7.6757 4.29247 8.18195C4.00147 8.6882 4.00147 9.31207 4.29247 9.81832C4.58366 10.3246 5.12168 10.6365 5.70383 10.6365ZM5.70383 8.18195H16.2964C16.5876 8.18195 16.8566 8.33792 17.0021 8.59104C17.1476 8.84417 17.1476 9.1561 17.0021 9.40922C16.8566 9.66235 16.5876 9.81832 16.2964 9.81832H5.70383C5.41264 9.81832 5.14365 9.66235 4.99815 9.40922C4.85265 9.1561 4.85265 8.84416 4.99815 8.59104C5.14365 8.33792 5.41265 8.18195 5.70383 8.18195Z"
            fill="white"
        />
        <path
            d="M20.3704 14.7271H1.62961C1.04741 14.7271 0.5094 15.039 0.218254 15.5452C-0.0727515 16.0515 -0.0727515 16.6754 0.218254 17.1816C0.509442 17.6878 1.04746 17.9998 1.62961 17.9998H20.3704C20.9526 17.9998 21.4906 17.6878 21.7817 17.1816C22.0728 16.6754 22.0728 16.0515 21.7817 15.5452C21.4906 15.039 20.9525 14.7271 20.3704 14.7271ZM20.3704 17.1816H1.62961C1.33842 17.1816 1.06943 17.0256 0.923932 16.7725C0.778429 16.5194 0.778429 16.2074 0.923932 15.9543C1.06943 15.7012 1.33843 15.5452 1.62961 15.5452H20.3704C20.6616 15.5452 20.9306 15.7012 21.0761 15.9543C21.2216 16.2075 21.2216 16.5194 21.0761 16.7725C20.9306 17.0256 20.6616 17.1816 20.3704 17.1816Z"
            fill="white"
        />
    </Icon>
);
export const InfoIcon = (props) => (
    <Icon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 19.7085C13.9705 19.7085 18 15.5003 18 10.3093C18 5.11843 13.9705 0.910156 9 0.910156C4.02954 0.910156 0 5.11843 0 10.3093C0 15.5003 4.02954 19.7085 9 19.7085ZM9 17.9997C13.0668 17.9997 16.3636 14.5566 16.3636 10.3095C16.3636 6.06235 13.0667 2.61921 9 2.61921C4.93327 2.61921 1.63636 6.06235 1.63636 10.3095C1.63636 14.5566 4.93327 17.9997 9 17.9997ZM10.4318 6.25339C10.4318 6.60728 10.3154 6.90946 10.0814 7.15802C9.84779 7.40761 9.56627 7.53218 9.23743 7.53218C8.90726 7.53218 8.62532 7.40761 8.38904 7.15802C8.15333 6.90948 8.03519 6.60727 8.03519 6.25339C8.03519 5.89994 8.15333 5.59716 8.38904 5.34563C8.62474 5.09395 8.90727 4.96878 9.23743 4.96878C9.5663 4.96878 9.84781 5.09455 10.0814 5.34563C10.3154 5.59715 10.4318 5.89993 10.4318 6.25339ZM10.3146 14.6814C9.96336 14.8576 9.68241 14.9918 9.47327 15.0842C9.2641 15.1767 9.02067 15.2226 8.74359 15.2226C8.31799 15.2226 7.9868 15.0903 7.75066 14.8271C7.51453 14.5632 7.39639 14.2283 7.39639 13.8224C7.39639 13.665 7.4051 13.5033 7.42293 13.3387C7.44077 13.174 7.4693 12.9879 7.50825 12.7803L7.94784 10.8052C7.98679 10.616 8.02004 10.4366 8.04658 10.267C8.07354 10.0987 8.08667 9.94383 8.08667 9.80421C8.08667 9.55194 8.04558 9.37567 7.96368 9.27642C7.88178 9.17718 7.72569 9.12711 7.49385 9.12711C7.38013 9.12711 7.26342 9.15036 7.14442 9.19506C7.02486 9.23976 6.95452 8.71434 6.95452 8.71434C7.2423 8.56563 7.51738 8.43823 7.78063 8.33227C8.04373 8.22633 8.29243 8.17313 8.52754 8.17313C8.9503 8.17313 9.27647 8.30291 9.50546 8.56249C9.73431 8.82206 9.84903 9.15882 9.84903 9.57397C9.84903 9.65965 9.84132 9.81089 9.82548 10.0269C9.8095 10.2438 9.78011 10.4421 9.73731 10.6227L9.29973 12.5905C9.26406 12.7484 9.23167 12.929 9.2037 13.1323C9.17488 13.3343 9.1609 13.4887 9.1609 13.5921C9.1609 13.8536 9.2067 14.0317 9.29873 14.1266C9.39118 14.2215 9.5507 14.2686 9.77729 14.2686C9.88387 14.2686 10.0047 14.2448 10.1393 14.1977C10.2737 14.1505 10.3146 14.6814 10.3146 14.6814L10.3146 14.6814Z"
            fill="currentColor"
        />
    </Icon>
);

export const StatusIcon = (props) => (
    <Icon {...props}>
        <path
            d="M15.4271 3.70499V1.75254C15.4319 1.20532 15.1996 0.684962 14.7943 0.33553C14.451 0.0461661 13.9993 -0.0640237 13.5679 0.0362859L5.34016 1.98616C4.98038 2.08814 4.66399 2.31262 4.44162 2.62378C4.21923 2.93496 4.10372 3.31492 4.11395 3.70239V9.01666C4.11485 9.20982 4.14462 9.40149 4.20183 9.58513H1.54278C1.25887 9.58476 1.02877 9.34573 1.02841 9.0506V4.77388C1.02877 4.47874 1.25887 4.23974 1.54278 4.23935H2.57116C2.85525 4.23935 3.08535 3.99996 3.08535 3.70482C3.08535 3.40949 2.85524 3.17029 2.57116 3.17029H1.54278C1.13368 3.17067 0.741628 3.33977 0.452325 3.64051C0.16321 3.94106 0.000541784 4.34883 0 4.77391V15.4655C0 15.6073 0.0541648 15.7433 0.150653 15.8436C0.246966 15.9437 0.37789 16 0.514199 16H2.57119C2.7925 15.9998 2.9889 15.8527 3.05939 15.6346L4.08777 12.4272C4.17762 12.1469 4.03199 11.8439 3.76242 11.7505C3.49286 11.6571 3.2014 11.8087 3.11155 12.0889L2.20099 14.9309H1.02839V10.5558C1.19321 10.6192 1.36719 10.6526 1.54277 10.6542H5.14232C5.14842 10.6542 5.15362 10.6509 5.15954 10.6507C5.21783 10.6824 5.27827 10.7098 5.34015 10.7325L13.5679 12.6824V12.6826C13.6718 12.7072 13.7779 12.7197 13.8843 12.7195C14.2155 12.7182 14.5366 12.5996 14.7943 12.3833C15.1996 12.0341 15.4321 11.5138 15.427 10.9665V9.05059C16.1167 9.07763 16.7858 8.80486 17.2738 8.29755C17.7618 7.79023 18.0242 7.09461 17.9982 6.3777C18.0244 5.6608 17.762 4.9648 17.274 4.45766C16.786 3.95034 16.1167 3.67737 15.427 3.70482L15.4271 3.70499ZM14.3987 10.9667C14.405 11.1889 14.3146 11.4024 14.1524 11.5476C14.054 11.6338 13.9229 11.6681 13.797 11.6407L5.5692 9.69079V9.6906C5.2982 9.59048 5.12387 9.31547 5.14234 9.01718V3.70243C5.12387 3.40393 5.2982 3.12909 5.5692 3.02881L13.797 1.07894V1.07913C13.8264 1.07204 13.8563 1.0685 13.8865 1.06831C13.9838 1.07036 14.0776 1.10672 14.1524 1.17179C14.3146 1.31685 14.405 1.53033 14.3987 1.75257V10.9667ZM15.4271 7.98147V4.77405C15.8426 4.75112 16.248 4.91258 16.5423 5.21854C16.8364 5.5245 16.9919 5.94585 16.9698 6.37786C16.9919 6.80985 16.8366 7.23122 16.5423 7.53717C16.2481 7.84313 15.8426 8.00459 15.4271 7.98147V7.98147Z"
            fill="white"
        />
    </Icon>
);

export const WalletIcon = (props) => (
    <Icon viewBox="0 0 40 40" {...props}>
        <path
            d="M18.7586 22.0475C17.5404 22.0475 16.5517 21.0078 16.5517 19.7268V17.406C16.5517 16.1239 17.5404 15.0852 18.7586 15.0852H32V22.0475H18.7586ZM20.4138 16.9222C19.5003 16.9222 18.7586 17.7021 18.7586 18.6627C18.7586 19.6247 19.5003 20.4033 20.4138 20.4033C21.3286 20.4033 22.069 19.6247 22.069 18.6627C22.069 17.7021 21.3286 16.9222 20.4138 16.9222ZM15.4483 17.406V19.7268C15.4483 21.6484 16.9313 23.2079 18.7586 23.2079H29.7931V27.8494C29.7931 29.771 28.3111 31.3306 26.4828 31.3306H3.31034C1.48303 31.3306 0 29.771 0 27.8494V5.80218C0 3.87952 1.48303 2.32103 3.31034 2.32103H13.9388L11.3467 3.45708H2.75994C1.84642 3.45708 1.10477 4.23699 1.10477 5.19765C1.10477 6.15832 1.84642 6.93823 2.75994 6.93823H29.7932V13.9251H18.7587C16.9314 13.9251 15.4483 15.4835 15.4483 17.4062L15.4483 17.406ZM4.41505 9.28332H2.20816V11.6041H3.31161V10.4437H4.41505V9.28332ZM4.41505 12.7645H2.20816V15.0852H3.35694L3.31162 13.9249L4.41507 13.9492L4.41505 12.7645ZM4.41505 16.2456H2.20816V18.5664H3.33475L3.31159 17.406H4.41504L4.41505 16.2456ZM4.41505 19.7268H2.20816V22.0475H3.33475L3.31159 20.8871L4.41504 20.9115L4.41505 19.7268ZM4.41505 23.2079H2.20816V25.5287H3.31161V24.3683H4.41505V23.2079ZM4.41505 26.6891H2.20816V29.0098H3.33475L3.31159 27.8738H4.41504L4.41505 26.6891ZM8.82885 5.7299L21.7941 0L24.2768 5.7299H8.82885ZM23.8856 2.32077H26.4831C27.4496 2.32077 28.3104 2.7629 28.9161 3.45681H24.4129L23.8856 2.32077Z"
            fill="currentColor"
        />
    </Icon>
);

export const CouponIcon = (props) => (
    <Icon {...props}>
        <path
            d="M14.3857 8.21845L13.7931 7.1862C13.7271 7.07187 13.7271 6.92854 13.7931 6.81258L14.3873 5.78033C14.6224 5.37129 14.4823 4.84632 14.0717 4.6096L13.0362 4.01377C12.9203 3.94775 12.8494 3.82375 12.8494 3.6901V2.50649C12.8494 2.03305 12.4645 1.64977 11.9927 1.64977H10.8091C10.6754 1.64977 10.5514 1.57731 10.4854 1.46297L9.88959 0.429129C9.65286 0.0200869 9.12789 -0.12161 8.71885 0.115111L7.6866 0.709343C7.57065 0.775368 7.42894 0.775368 7.31298 0.709343L6.28073 0.115111C6.08266 0.000775904 5.85075 -0.029822 5.63014 0.0297631C5.40952 0.0893454 5.22434 0.231057 5.11 0.429118L4.51417 1.46458C4.44815 1.58052 4.32415 1.65138 4.1905 1.65138H3.00689C2.53345 1.65138 2.15017 2.03625 2.15017 2.5081V3.69171C2.15017 3.82537 2.07771 3.94936 1.96337 4.01538L0.929528 4.6112C0.520486 4.84793 0.378789 5.3729 0.61389 5.78194L1.20812 6.81419C1.27415 6.93014 1.27415 7.07185 1.20812 7.18781L0.61389 8.22006C0.499555 8.41814 0.468957 8.65004 0.528542 8.87065C0.588125 9.09127 0.729836 9.27646 0.927897 9.3908L1.96336 9.98662C2.0793 10.0526 2.15016 10.1766 2.15016 10.3103V11.4939C2.15016 11.9673 2.53503 12.3506 3.00688 12.3506H4.19048C4.32415 12.3506 4.44814 12.4231 4.51416 12.5374L5.10998 13.5713C5.34671 13.9803 5.87168 14.122 6.28072 13.8853L7.31297 13.2911C7.42892 13.225 7.57063 13.225 7.68659 13.2911L8.71884 13.8853C8.85089 13.961 8.99743 13.9996 9.14558 13.9996C9.21966 13.9996 9.29534 13.99 9.36942 13.969C9.59004 13.9094 9.77522 13.7677 9.88957 13.5697L10.4854 12.5342C10.5514 12.4183 10.6754 12.3474 10.8091 12.3474H11.9927C12.4661 12.3474 12.8494 11.9625 12.8494 11.4907V10.3071C12.8494 10.1734 12.9219 10.0494 13.0362 9.9834L14.0717 9.38758C14.4807 9.15408 14.6224 8.6275 14.3857 8.21846L14.3857 8.21845ZM4.82674 4.32944C5.0538 4.10238 5.35496 3.97838 5.67539 3.97838C5.99586 3.97838 6.29698 4.10399 6.52404 4.32944C6.99104 4.79643 6.99104 5.55816 6.52404 6.02677C6.29054 6.26027 5.98296 6.37783 5.67539 6.37783C5.36782 6.37783 5.06184 6.26028 4.82674 6.02677C4.35975 5.55816 4.35975 4.79805 4.82674 4.32944ZM5.32274 9.62924L4.867 9.17349L9.67062 4.36987L10.1264 4.82562L5.32274 9.62924ZM10.1682 9.66789C9.93467 9.90139 9.6271 10.0189 9.31953 10.0189C9.01196 10.0189 8.70436 9.90139 8.47088 9.66789C8.00226 9.20089 8.00226 8.43917 8.47088 7.97056C8.93787 7.50356 9.69959 7.50356 10.1682 7.97056C10.6368 8.43755 10.6368 9.19927 10.1682 9.66789H10.1682Z"
            fill="currentColor"
        />
    </Icon>
);

export const CategoryIcon = (props) => (
    <Icon viewBox="0 0 15 18" {...props}>
        <path
            d="M12.7315 18H2.26849C1.01857 18 0 16.9885 0 15.7472V15.2185C0 13.9771 1.01857 12.9656 2.26849 12.9656H12.7315C13.9814 12.9656 15 13.9771 15 15.2185V15.7472C15 16.9885 13.9814 18 12.7313 18H12.7315ZM2.26849 14.2988C1.75923 14.2988 1.34264 14.7125 1.34264 15.2183V15.747C1.34264 16.2527 1.75923 16.6665 2.26849 16.6665H12.7315C13.2408 16.6665 13.6574 16.2527 13.6574 15.747V15.2183C13.6574 14.7125 13.2408 14.2988 12.7315 14.2988H2.26849ZM12.7315 11.5171H2.26849C1.01857 11.5171 0 10.5056 0 9.26427V8.73557C0 7.49426 1.01857 6.48272 2.26849 6.48272H12.7315C13.9814 6.48272 15 7.49426 15 8.73557V9.26427C15 10.5056 13.9814 11.5171 12.7313 11.5171H12.7315ZM2.26849 7.81594C1.75923 7.81594 1.34264 8.22965 1.34264 8.7354V9.2641C1.34264 9.76985 1.75923 10.1836 2.26849 10.1836H12.7315C13.2408 10.1836 13.6574 9.76985 13.6574 9.2641V8.7354C13.6574 8.22965 13.2408 7.81594 12.7315 7.81594H2.26849ZM12.7315 5.03439H2.26849C1.01857 5.03439 0 4.02285 0 2.78155V2.25285C0 1.01154 1.01857 0 2.26849 0H12.7315C13.9814 0 15 1.01154 15 2.25285V2.78155C15 4.0458 13.9814 5.03439 12.7313 5.03439H12.7315ZM2.26849 1.33322C1.75923 1.33322 1.34264 1.74693 1.34264 2.25268V2.78138C1.34264 3.28713 1.75923 3.70085 2.26849 3.70085H12.7315C13.2408 3.70085 13.6574 3.28713 13.6574 2.78138V2.25268C13.6574 1.74693 13.2408 1.33322 12.7315 1.33322H2.26849Z"
            fill="currentColor"
        />
    </Icon>
);
export const SaletypeIcon = (props) => (
    <Icon viewBox="0 0 18 16" {...props}>
        <path
            d="M15.4271 3.70499V1.75254C15.4319 1.20532 15.1996 0.684962 14.7943 0.33553C14.451 0.0461661 13.9993 -0.0640237 13.5679 0.0362859L5.34016 1.98616C4.98038 2.08814 4.66399 2.31262 4.44162 2.62378C4.21923 2.93496 4.10372 3.31492 4.11395 3.70239V9.01666C4.11485 9.20982 4.14462 9.40149 4.20183 9.58513H1.54278C1.25887 9.58476 1.02877 9.34573 1.02841 9.0506V4.77388C1.02877 4.47874 1.25887 4.23974 1.54278 4.23935H2.57116C2.85525 4.23935 3.08535 3.99996 3.08535 3.70482C3.08535 3.40949 2.85524 3.17029 2.57116 3.17029H1.54278C1.13368 3.17067 0.741628 3.33977 0.452325 3.64051C0.16321 3.94106 0.000541784 4.34883 0 4.77391V15.4655C0 15.6073 0.0541648 15.7433 0.150653 15.8436C0.246966 15.9437 0.37789 16 0.514199 16H2.57119C2.7925 15.9998 2.9889 15.8527 3.05939 15.6346L4.08777 12.4272C4.17762 12.1469 4.03199 11.8439 3.76242 11.7505C3.49286 11.6571 3.2014 11.8087 3.11155 12.0889L2.20099 14.9309H1.02839V10.5558C1.19321 10.6192 1.36719 10.6526 1.54277 10.6542H5.14232C5.14842 10.6542 5.15362 10.6509 5.15954 10.6507C5.21783 10.6824 5.27827 10.7098 5.34015 10.7325L13.5679 12.6824V12.6826C13.6718 12.7072 13.7779 12.7197 13.8843 12.7195C14.2155 12.7182 14.5366 12.5996 14.7943 12.3833C15.1996 12.0341 15.4321 11.5138 15.427 10.9665V9.05059C16.1167 9.07763 16.7858 8.80486 17.2738 8.29755C17.7618 7.79023 18.0242 7.09461 17.9982 6.3777C18.0244 5.6608 17.762 4.9648 17.274 4.45766C16.786 3.95034 16.1167 3.67737 15.427 3.70482L15.4271 3.70499ZM14.3987 10.9667C14.405 11.1889 14.3146 11.4024 14.1524 11.5476C14.054 11.6338 13.9229 11.6681 13.797 11.6407L5.5692 9.69079V9.6906C5.2982 9.59048 5.12387 9.31547 5.14234 9.01718V3.70243C5.12387 3.40393 5.2982 3.12909 5.5692 3.02881L13.797 1.07894V1.07913C13.8264 1.07204 13.8563 1.0685 13.8865 1.06831C13.9838 1.07036 14.0776 1.10672 14.1524 1.17179C14.3146 1.31685 14.405 1.53033 14.3987 1.75257V10.9667ZM15.4271 7.98147V4.77405C15.8426 4.75112 16.248 4.91258 16.5423 5.21854C16.8364 5.5245 16.9919 5.94585 16.9698 6.37786C16.9919 6.80985 16.8366 7.23122 16.5423 7.53717C16.2481 7.84313 15.8426 8.00459 15.4271 7.98147V7.98147Z"
            fill="currentColor"
        />
    </Icon>
);
export const PriceRangeIcon = (props) => (
    <Icon viewBox="0 0 11 18" {...props}>
        <path
            d="M5.5001 13.9283C4.39726 13.9283 3.50041 13.1592 3.50041 12.2142C3.50041 11.3874 2.71565 10.7141 1.7503 10.7141C0.784957 10.7141 0.000198596 11.3875 0.000198596 12.2142C0.000198596 14.2538 1.52944 16.0477 3.76317 16.6831C3.86888 17.4244 4.60808 18 5.5001 18C6.39227 18 7.13148 17.4244 7.23703 16.6831C9.47076 16.0479 11 14.2539 11 12.2142C11 9.61495 8.53251 7.49981 5.4999 7.49981C4.39706 7.49981 3.50021 6.73069 3.50021 5.78577C3.50021 4.84084 4.39706 4.07173 5.4999 4.07173C6.60274 4.07173 7.49959 4.84084 7.49959 5.78577C7.49959 6.61257 8.28435 7.28587 9.2497 7.28587C10.215 7.28587 10.9998 6.61254 10.9998 5.78577C10.9998 3.74623 9.47056 1.95226 7.23683 1.31692C7.13127 0.575553 6.39223 0 5.4999 0C4.60757 0 3.86852 0.575553 3.76297 1.31692C1.52924 1.95213 0 3.74613 0 5.78577C0 8.38504 2.46749 10.5002 5.5001 10.5002C6.60294 10.5002 7.49979 11.2693 7.49979 12.2142C7.49979 13.1592 6.60294 13.9283 5.5001 13.9283V13.9283ZM5.5001 9.64274C3.01869 9.64274 1.00074 7.91292 1.00074 5.78611C1.00074 4.02918 2.38848 2.49516 4.37528 2.05566C4.596 2.0073 4.75054 1.83618 4.75054 1.64088V1.50045C4.75054 1.14625 5.08689 0.857789 5.5003 0.857789C5.91353 0.857789 6.25006 1.1461 6.25006 1.50045V1.64088C6.25006 1.83605 6.40475 2.00729 6.62532 2.05566C8.61179 2.49503 9.99985 4.02914 9.99985 5.78611C9.99985 6.14031 9.6635 6.42877 9.25009 6.42877C8.83686 6.42877 8.50033 6.14046 8.50033 5.78611C8.50033 4.36821 7.15414 3.21462 5.5003 3.21462C3.84646 3.21462 2.50026 4.36825 2.50026 5.78611C2.50026 7.20397 3.84646 8.3576 5.5003 8.3576C7.98171 8.3576 9.99966 10.0874 9.99966 12.2142C9.99966 13.9712 8.61191 15.5049 6.62512 15.9447C6.40439 15.993 6.24986 16.1642 6.24986 16.3595V16.4999C6.24986 16.8541 5.9135 17.1425 5.5001 17.1425C5.08687 17.1425 4.75034 16.8542 4.75034 16.4999V16.3595C4.75034 16.1643 4.59565 15.993 4.37508 15.9447C2.3886 15.505 1.00054 13.9712 1.00054 12.2142C1.00054 11.86 1.3369 11.5716 1.7503 11.5716C2.16353 11.5716 2.50006 11.8599 2.50006 12.2142C2.50006 13.6319 3.84626 14.7857 5.5001 14.7857C7.15394 14.7857 8.50013 13.6318 8.50013 12.2142C8.50013 10.7966 7.15394 9.64274 5.5001 9.64274V9.64274Z"
            fill="white"
        />
    </Icon>
);
export const SortIcon = (props) => (
    <Icon {...props}>
        <path
            d="M8.14865 3.27273H13.8524C14.4346 3.27273 14.9726 2.96079 15.2637 2.45455C15.5547 1.9483 15.5547 1.32443 15.2637 0.818182C14.9725 0.311938 14.4345 0 13.8524 0H8.14865C7.56646 0 7.02844 0.311933 6.7373 0.818182C6.44629 1.32443 6.44629 1.9483 6.7373 2.45455C7.02848 2.96079 7.5665 3.27273 8.14865 3.27273ZM8.14865 0.818182H13.8524C14.1436 0.818182 14.4125 0.974146 14.558 1.22727C14.7035 1.4804 14.7035 1.79233 14.558 2.04545C14.4125 2.29858 14.1435 2.45455 13.8524 2.45455H8.14865C7.85747 2.45455 7.58848 2.29858 7.44298 2.04545C7.29747 1.79233 7.29747 1.48039 7.44298 1.22727C7.58848 0.974151 7.85747 0.818182 8.14865 0.818182Z"
            fill="currentColor"
        />
        <path
            d="M5.70358 10.636H16.2962C16.8784 10.636 17.4164 10.3241 17.7076 9.81783C17.9986 9.31158 17.9986 8.68771 17.7076 8.18146C17.4164 7.67522 16.8784 7.36328 16.2962 7.36328H5.70358C5.12139 7.36328 4.58337 7.67521 4.29223 8.18146C4.00122 8.68771 4.00122 9.31158 4.29223 9.81783C4.58342 10.3241 5.12143 10.636 5.70358 10.636ZM5.70358 8.18146H16.2962C16.5874 8.18146 16.8564 8.33743 17.0019 8.59055C17.1474 8.84368 17.1474 9.15561 17.0019 9.40874C16.8564 9.66186 16.5874 9.81783 16.2962 9.81783H5.70358C5.4124 9.81783 5.14341 9.66186 4.99791 9.40874C4.8524 9.15561 4.8524 8.84368 4.99791 8.59055C5.14341 8.33743 5.41241 8.18146 5.70358 8.18146Z"
            fill="currentColor"
        />
        <path
            d="M20.3704 14.7275H1.62961C1.04741 14.7275 0.5094 15.0395 0.218254 15.5457C-0.0727515 16.052 -0.0727515 16.6758 0.218254 17.1821C0.509442 17.6883 1.04746 18.0003 1.62961 18.0003H20.3704C20.9526 18.0003 21.4906 17.6883 21.7817 17.1821C22.0728 16.6758 22.0728 16.052 21.7817 15.5457C21.4906 15.0395 20.9525 14.7275 20.3704 14.7275ZM20.3704 17.1821H1.62961C1.33842 17.1821 1.06943 17.0261 0.923932 16.773C0.778429 16.5199 0.778429 16.2079 0.923932 15.9548C1.06943 15.7017 1.33843 15.5457 1.62961 15.5457H20.3704C20.6616 15.5457 20.9306 15.7017 21.0761 15.9548C21.2216 16.2079 21.2216 16.5199 21.0761 16.773C20.9306 17.0261 20.6616 17.1821 20.3704 17.1821Z"
            fill="currentColor"
        />
    </Icon>
);

export const AboutInfoIcon = (props) => (
    <Icon {...props}>
        <path
            d="M13.0541 8.4967L13.5378 7.19286C13.643 6.91942 13.4326 6.625 13.1382 6.625H3.96898C2.49689 6.625 1.2771 7.71861 1.12981 9.1907L0.75134 12.6818C0.709238 13.0183 0.94058 13.3337 1.2771 13.4179C1.65557 13.502 2.16037 13.5652 2.66514 13.6283L2.98053 19.1803C3.00151 19.6429 3.4011 20.0005 3.8638 20.0005H6.53469C6.99736 20.0005 7.37583 19.643 7.41796 19.1803L7.88063 9.65354C7.88063 9.16988 8.28025 8.79126 8.74291 8.79126H12.6335C12.8437 8.77013 12.991 8.66495 13.0541 8.49669L13.0541 8.4967Z"
            fill="currentColor"
        />
        <path
            d="M8.1541 2.92321C8.1541 4.53759 6.84527 5.84643 5.23089 5.84643C3.61651 5.84643 2.30768 4.53759 2.30768 2.92321C2.30768 1.30884 3.61651 0 5.23089 0C6.84527 0 8.1541 1.30884 8.1541 2.92321Z"
            fill="currentColor"
        />
        <path
            d="M16.2718 10.4727H10.9511C10.1731 10.4727 9.56311 11.1036 9.56311 11.8607V18.5694C9.56311 19.3474 10.1941 19.9574 10.9511 19.9574H16.2508C17.0289 19.9574 17.6388 19.3265 17.6388 18.5694L17.6387 11.8817C17.6598 11.1036 17.0289 10.4727 16.2718 10.4727L16.2718 10.4727ZM14.7155 17.5178C14.4421 17.8122 14.0005 18.338 13.2014 18.338C12.7808 18.338 12.4652 17.9384 12.5704 17.5178L13.2223 15.1625C13.2644 15.0363 13.1592 14.9311 13.0331 14.9521C12.8858 14.9731 12.7177 15.0573 12.5283 15.1834C12.4442 15.2465 12.36 15.2255 12.297 15.1625C12.2549 15.0994 12.2549 15.0152 12.297 14.9521C12.5704 14.6577 13.012 14.1319 13.8111 14.1319C14.2317 14.1319 14.5473 14.5315 14.4421 14.9521L13.7902 17.3074C13.7481 17.4336 13.8533 17.5388 13.9794 17.5178C14.1267 17.4968 14.2948 17.4126 14.4842 17.2865C14.5683 17.2234 14.6525 17.2444 14.7155 17.3074C14.7786 17.3705 14.7786 17.4757 14.7155 17.5178ZM14.2319 13.5431C13.8323 13.5431 13.5169 13.2277 13.5169 12.8281C13.5169 12.4285 13.8323 12.1131 14.2319 12.1131C14.6315 12.1131 14.9469 12.4285 14.9469 12.8281C14.9469 13.2276 14.6315 13.5431 14.2319 13.5431Z"
            fill="currentColor"
        />
    </Icon>
);

export const YouTubeIcon = (props) => (
    <Icon {...props}>
        <path
            d="M3.99061 0.200195C1.89133 0.200195 0.201172 1.9206 0.201172 4.05731V14.3431C0.201172 16.4799 1.89139 18.2002 3.99061 18.2002H20.4117C22.511 18.2002 24.2012 16.4798 24.2012 14.3431V4.05731C24.2012 1.92054 22.511 0.200195 20.4117 0.200195H3.99061ZM9.359 5.02165L16.938 9.20031L9.359 13.379V5.02165Z"
            fill="currentColor"
        />
    </Icon>
);
export const ReviewStarsIcon = (props) => (
    <Icon {...props}>
        <path
            d="M18.3482 0.864094C18.0159 0.848655 17.7148 1.05457 17.6088 1.36895L16.5755 4.43335H13.3742C13.0539 4.43335 12.7695 4.63815 12.6683 4.94173C12.5671 5.24531 12.6718 5.57992 12.9278 5.77264L15.5005 7.70122L14.5719 10.7739C14.4802 11.0775 14.5909 11.4049 14.8468 11.5919C15.1039 11.7775 15.4505 11.7799 15.7099 11.5989L18.3149 9.77973L20.9185 11.5989C21.178 11.7799 21.5245 11.7775 21.7816 11.5919C22.0375 11.4049 22.1482 11.0775 22.0565 10.7739L21.1281 7.70122L23.7009 5.77264C23.9568 5.57974 24.0615 5.2453 23.9603 4.94173C23.8591 4.63816 23.5745 4.43335 23.2544 4.43335H20.053L19.0197 1.36881C18.9209 1.07826 18.6542 0.877189 18.3482 0.863951L18.3482 0.864094ZM18.3279 1.30941C18.4505 1.31536 18.5565 1.39516 18.5957 1.51179L19.7316 4.87976H23.2543C23.3828 4.87976 23.4959 4.96198 23.5365 5.08326C23.577 5.20472 23.5354 5.3381 23.4329 5.41548L20.6101 7.5323L21.6293 10.9026C21.7115 11.1729 21.4055 11.3943 21.1745 11.2336L18.3149 9.23465L15.454 11.2336C15.223 11.3943 14.917 11.1729 14.9992 10.9026L16.0184 7.5323L13.1956 5.41548C12.967 5.24397 13.0885 4.87976 13.3742 4.87976H16.8969L18.0328 1.51179C18.0744 1.38568 18.1959 1.30346 18.328 1.30941H18.3279Z"
            fill="currentColor"
        />
        <path
            d="M18.3144 0.865234C17.9966 0.865234 17.7117 1.06575 17.6092 1.36933L16.5759 4.43335H13.3742C13.0539 4.43335 12.7697 4.63833 12.6683 4.94211C12.5671 5.24587 12.6715 5.5803 12.9276 5.7725L15.5004 7.70203L14.5714 10.774C14.4797 11.0774 14.5904 11.4056 14.8469 11.5916C15.1036 11.7776 15.4498 11.7807 15.7096 11.5992L18.3141 9.77962L18.3144 0.865234Z"
            fill="currentColor"
        />
        <path
            d="M5.71624 0.864056C5.38496 0.848988 5.08362 1.05509 4.97738 1.36944L3.94428 4.43345H0.742459C0.422143 4.43345 0.137932 4.63844 0.0367412 4.94222C-0.0644497 5.24598 0.0399033 5.58041 0.296042 5.77275L2.86858 7.70228L1.93981 10.7743C1.84811 11.0777 1.95879 11.4058 2.21548 11.592C2.47218 11.778 2.81834 11.7812 3.0782 11.5996L5.68255 9.78006L8.28709 11.5996C8.54694 11.781 8.89328 11.778 9.1498 11.592C9.40631 11.406 9.51699 11.0779 9.42548 10.7743L8.49671 7.70228L11.0692 5.77275C11.3254 5.58059 11.4297 5.24598 11.3285 4.94222C11.2274 4.63846 10.9429 4.43345 10.6228 4.43345H7.42081L6.38771 1.36944C6.2895 1.0787 6.02294 0.878008 5.71638 0.864056H5.71624Z"
            fill="currentColor"
        />
    </Icon>
);

export const PlusIcon = (props) => (
    <Icon {...props}>
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="40.000000pt"
            height="40.000000pt"
            viewBox="0 0 40.000000 40.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,40.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
            >
                <path
                    d="M150 243 c0 -3 7 -15 17 -25 15 -17 15 -19 -2 -38 -24 -26 -11 -39
15 -15 19 17 21 17 40 0 26 -24 39 -11 15 15 -17 19 -17 21 0 40 24 26 11 39
-15 15 -19 -17 -21 -17 -38 -2 -19 18 -32 22 -32 10z"
                />
            </g>
        </svg>
    </Icon>
);

export const CrossIcon = (props) => (
    <Icon {...props}>
        <path
            d="M150 243 c0 -3 7 -15 17 -25 15 -17 15 -19 -2 -38 -24 -26 -11 -39
15 -15 19 17 21 17 40 0 26 -24 39 -11 15 15 -17 19 -17 21 0 40 24 26 11 39
-15 15 -19 -17 -21 -17 -38 -2 -19 18 -32 22 -32 10z"
        />
    </Icon>
);
export const HorizontalLine = (props) => (
    <Icon viewBox="0 0 440 24" {...props}>
        <svg
            width="440"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="-6" cy="12" r="12" fill="currentColor" />
            <circle cx="446" cy="12" r="12" fill="currentColor" />
            <line
                x1="6"
                y1="11"
                x2="440"
                y2="11"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
            />
        </svg>
    </Icon>
);

export const VerticalLine = (props) => (
    <Icon viewBox="0 0 24 270" {...props}>
        <svg
            width="24"
            height="270"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle
                cx="-6"
                cy="250"
                r="12"
                transform="rotate(-90 12 250)"
                fill="currentColor"
            />
            <circle
                cx="24"
                cy="12.5"
                r="12"
                transform="rotate(-90 12 12.5)"
                fill="currentColor"
            />
            <line
                x1="11"
                y1="265"
                x2="11"
                y2="11"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="6 6"
            />
        </svg>
    </Icon>
);

export const VolumeIcon = (props) => (
    <Icon {...props}>
        <path
            d="M20 0C14.6956 0 9.60865 2.10713 5.85796 5.85796C2.10713 9.6085 0 14.6958 0 20C0 25.3042 2.10713 30.3914 5.85796 34.142C9.6085 37.8929 14.6958 40 20 40C25.3042 40 30.3914 37.8929 34.142 34.142C37.8929 30.3915 40 25.3042 40 20C40 14.6958 37.8929 9.60865 34.142 5.85796C30.3915 2.10713 25.3042 0 20 0ZM20.9969 29.9484C20.9969 30.1498 20.8755 30.3314 20.6892 30.4079C20.6295 30.4327 20.5653 30.4453 20.5006 30.4447C20.368 30.4447 20.2408 30.3914 20.1476 30.2971L13.3212 23.4869H10.0392C9.51016 23.4869 9.00318 23.2768 8.62932 22.9029C8.25547 22.529 8.04534 22.0218 8.04534 21.4931V18.5065C8.04534 17.9778 8.25544 17.4705 8.62932 17.0967C9.00321 16.7228 9.51017 16.5127 10.0392 16.5127H13.3212L20.1476 9.68602C20.2896 9.54261 20.5045 9.49936 20.6908 9.57693C20.8775 9.65421 20.9983 9.83697 20.9969 10.039L20.9969 29.9484ZM23.7784 23.8767C23.6939 23.9386 23.5917 23.9715 23.4871 23.971C23.2695 23.9735 23.0756 23.8343 23.0089 23.627C22.9419 23.4199 23.0178 23.1937 23.1958 23.0684C24.0164 22.4777 24.9846 21.4601 24.9846 19.9833C24.9846 18.5066 24.0122 17.4931 23.1958 16.8983C23.087 16.8204 23.0136 16.7027 22.9916 16.5707C22.9698 16.4387 23.0011 16.3034 23.0789 16.1946C23.241 15.968 23.556 15.9159 23.7826 16.0777C25.1939 17.1279 25.9774 18.523 25.9774 19.9998C25.9774 21.4767 25.1939 22.8717 23.7785 23.889L23.7784 23.8767ZM25.7968 26.3382C25.6953 26.4224 25.5641 26.4629 25.4324 26.4506C25.301 26.4383 25.1796 26.3742 25.0954 26.2726C24.9199 26.0608 24.9492 25.7467 25.1609 25.5709C26.8677 24.1596 27.967 21.9649 27.967 19.9791C27.967 17.9934 26.8635 15.7944 25.1609 14.3874C25.0594 14.3031 24.9952 14.182 24.9829 14.0503C24.9706 13.9189 25.0111 13.7878 25.0954 13.6859C25.2709 13.4742 25.585 13.4449 25.7968 13.6204C27.7209 15.208 28.9639 17.723 28.9639 19.9794C28.9639 22.2355 27.7209 24.767 25.7968 26.3588L25.7968 26.3382ZM28.2952 28.3197H28.2954C28.0881 28.5011 27.7731 28.4799 27.5918 28.2726C27.4104 28.0653 27.4316 27.7503 27.6389 27.5689C29.7815 25.64 30.9907 22.8826 30.9578 19.9997C30.9994 17.1088 29.7912 14.3409 27.6431 12.4061C27.4358 12.2248 27.4146 11.9098 27.596 11.7025C27.7771 11.4952 28.0921 11.4739 28.2994 11.6553C30.6626 13.7803 31.9936 16.8221 31.9508 19.9995C31.9924 23.1781 30.6599 26.2196 28.2954 28.3438L28.2952 28.3197Z"
            fill="currentColor"
        />
    </Icon>
);
export const HelpIcon = (props) => (
    <Icon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.9994 40.4375C14.8748 40.4375 10.2026 38.5065 6.66083 35.3377L13.16 28.9133C15.0287 30.4249 17.4084 31.3304 19.9995 31.3304C22.5909 31.3304 24.9703 30.4252 26.839 28.9133L33.3381 35.3377C29.7957 38.5062 25.1238 40.4375 19.9996 40.4375H19.9994ZM28.7951 26.8624C30.1117 25.0644 30.8924 22.8426 30.8924 20.4379C30.8924 18.0333 30.1117 15.8118 28.7951 14.0135L35.3068 7.57264C38.2345 11.0484 39.9995 15.5378 39.9995 20.4381C39.9995 25.3382 38.2345 29.8278 35.3068 33.3035L28.7951 26.8624ZM4.69271 33.3032C1.765 29.8274 0 25.3381 0 20.4378C0 15.5377 1.765 11.0481 4.69271 7.57234L11.2043 14.0132C9.88776 15.8112 9.10711 18.033 9.10711 20.4376C9.10711 22.8423 9.88776 25.0638 11.2043 26.8621L4.69271 33.3032ZM26.8396 11.9617C24.9709 10.4501 22.5913 9.54461 20.0001 9.54461C17.4087 9.54461 15.0293 10.4498 13.1607 11.9617L6.6615 5.53726C10.204 2.36876 14.8758 0.4375 20.0001 0.4375C25.1247 0.4375 29.7969 2.36847 33.3386 5.53726L26.8396 11.9617Z"
            fill="currentColor"
        />
    </Icon>
);
export const CloseIcon = (props) => (
    <Icon {...props}>
        <path
            d="M19.9995 0C8.95448 0 -0.000518799 8.955 -0.000518799 20C-0.000518799 31.045 8.95448 40 19.9995 40C31.0445 40 39.9995 31.045 39.9995 20C39.9995 8.955 31.0445 0 19.9995 0ZM17.4995 5H22.4995V17.5H17.4995V5ZM19.9995 33.2521C12.6945 33.2521 6.75234 27.3096 6.75234 20C6.75234 14.7509 9.87263 9.995 14.6966 7.87571L14.9994 7.74374V12.2898C12.3381 14.0085 10.7513 16.8504 10.7513 19.9998C10.7513 25.1025 14.9016 29.2527 19.9991 29.2527C25.1019 29.2527 29.252 25.1023 29.252 19.9998C29.252 16.8502 27.6602 14.0085 24.9989 12.2898V7.74402L25.3017 7.876C30.1309 9.99514 33.251 14.751 33.251 20.0003C33.251 27.3096 27.3037 33.2517 19.9988 33.2517L19.9995 33.2521Z"
            fill="currentColor"
        />
    </Icon>
);
export const CollapsibleCloseIcon = (props) => (
    <Icon viewBox="0 0 40 40" {...props}>
        <rect width="40" height="40" rx="20" fill="currentColor" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.6569 15.7573L24.2426 14.3431L20 18.5857L15.7574 14.3431L14.3431 15.7573L18.5858 20L14.3431 24.2426L15.7574 25.6568L20 21.4142L24.2426 25.6568L25.6569 24.2426L21.4142 20L25.6569 15.7573Z"
            fill="transparent"
        />
    </Icon>
);
export const PointIcon = (props) => (
    <Icon {...props}>
        <path
            d="M26 8L43.3205 18V38L26 48L8.67949 38V18L26 8Z"
            fill="currentColor"
        />
        <path
            d="M9.67949 18.5773L26 9.1547L42.3205 18.5773V37.4226L26 46.8453L9.67949 37.4226V18.5773Z"
            stroke="#7C54DC"
            strokeWidth="2"
        />
    </Icon>
);

export const ScoreIcon = (props) => (
    <Icon {...props}>
        <path
            d="M26 8L43.3205 18V38L26 48L8.67949 38V18L26 8Z"
            fill="#E90A63"
        />
        <path
            d="M9.67949 18.5773L26 9.1547L42.3205 18.5773V37.4226L26 46.8453L9.67949 37.4226V18.5773Z"
            stroke="#E90A63"
            strokeWidth="2"
            fill="#E90A63"
        />
        <text
            x="55%"
            y="60%"
            fontSize="16"
            dominantBaseline="middle"
            fill="white"
            textAnchor="middle"
        >
            {props.score}
        </text>
    </Icon>
);
export const CircleIcon = (props) => (
    <Icon {...props}>
        <path
            d="M47.5129 95C38.1172 95.0026 28.9318 92.2186 21.1185 87.0002C13.3052 81.7818 7.21499 74.3635 3.61822 65.6834C0.0214537 57.0034 -0.920296 47.4517 0.912089 38.2364C2.74447 29.0211 7.26867 20.5562 13.9124 13.9124C20.5562 7.26867 29.0211 2.74447 38.2364 0.912089C47.4517 -0.920296 57.0034 0.0214537 65.6834 3.61822C74.3635 7.21499 81.7818 13.3052 87.0002 21.1185C92.2186 28.9318 95.0026 38.1172 95 47.5129C94.9829 60.102 89.9743 72.1706 81.0724 81.0724C72.1706 89.9743 60.102 94.9829 47.5129 95ZM47.5129 3.85802C38.8783 3.85546 30.4368 6.4136 23.256 11.2089C16.0753 16.0042 10.4779 22.8213 7.17182 30.798C3.8657 38.7746 2.99934 47.5526 4.68231 56.0217C6.36528 64.4907 10.522 72.2705 16.6267 78.3771C22.7315 84.4836 30.51 88.6426 38.9786 90.3281C47.4472 92.0136 56.2254 91.1498 64.203 87.8461C72.1807 84.5423 78.9994 78.947 83.7969 71.7677C88.5943 64.5884 91.1549 56.1476 91.1549 47.5129C91.131 35.9481 86.5245 24.8642 78.3445 16.689C70.1644 8.51388 59.0778 3.91396 47.5129 3.89686V3.85802Z"
            fill="currentColor"
        />
    </Icon>
);

export const ShareIcon = (props) => (
    <Icon
        viewBox="0 0 20 22"
        {...props}
        width={["14px", "18px"]}
        height={["16px", "20px"]}
    >
        <path
            d="M15.5589 1.00014C13.6678 1.00014 12.1178 2.50163 12.1178 4.33347C12.1178 4.6885 12.1756 5.03744 12.2832 5.35901L6.60017 8.41977C6.00805 7.95403 5.258 7.66662 4.44116 7.66662C2.55006 7.66662 1 9.16811 1 11C1 12.8318 2.55006 14.3333 4.44116 14.3333C5.25781 14.3333 6.008 14.0539 6.60017 13.5882L12.2912 16.6491C12.183 16.9714 12.1177 17.3105 12.1177 17.6667C12.1177 19.4985 13.6677 21 15.5588 21C17.4499 21 19 19.4985 19 17.6667C19 15.8348 17.4499 14.3333 15.5588 14.3333C14.609 14.3333 13.7433 14.7179 13.1186 15.3269L7.58449 12.346C7.77356 11.9343 7.88231 11.4771 7.88231 11C7.88231 10.5202 7.77559 10.0673 7.58449 9.65396L13.1101 6.67314C13.7353 7.28696 14.6046 7.66667 15.5586 7.66667C17.4497 7.66667 18.9998 6.16518 18.9998 4.33333C18.9998 2.50149 17.4497 1 15.5586 1L15.5589 1.00014ZM15.5589 2.53867C16.5916 2.53867 17.4118 3.33316 17.4118 4.33347C17.4118 5.33378 16.5916 6.12827 15.5589 6.12827C14.5262 6.12827 13.7061 5.33378 13.7061 4.33347C13.7061 3.33316 14.5263 2.53867 15.5589 2.53867V2.53867ZM4.44149 9.20524C5.4742 9.20524 6.29435 9.99974 6.29435 11C6.29435 12.0004 5.47415 12.7948 4.44149 12.7948C3.40878 12.7948 2.58863 12.0004 2.58863 11C2.58863 9.99974 3.40883 9.20524 4.44149 9.20524ZM15.5589 15.8718C16.5916 15.8718 17.4118 16.6663 17.4118 17.6666C17.4118 18.667 16.5916 19.4614 15.5589 19.4614C14.5263 19.4614 13.7061 18.6669 13.7061 17.6666C13.7061 16.6663 14.5263 15.8718 15.5589 15.8718Z"
            fill="white"
            stroke="currentColor"
            strokeWidth="0.5"
        >
            <Button
                color="white"
                textTransform="normal"
                style={{ background: "#2D2D2D" }}
                mr={2}
            >
                Share
            </Button>
        </path>
    </Icon>
);

export const Pauseicon = (props) => {
    return <Icon viewBox="0 0  79 79"
        {...props}
        width="120" height="120"
    >
        <defs>
            <linearGradient id="linear-gradient" x1="0.416" y1="0.5" x2="1.448" y2="0.5" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#e90a63" />
                <stop offset="1" stopColor="#481a7f" />
            </linearGradient>
            <filter id="Ellipse_281" x="0" y="0" width="79" height="79" filterUnits="userSpaceOnUse">
                <feOffset input="SourceAlpha" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodColor="#ff0080" floodOpacity="0.812" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
            </filter>
            <filter id="Ellipse_281-2" x="0" y="0" width="79" height="79" filterUnits="userSpaceOnUse">
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="9" result="blur-2" />
                <feFlood floodColor="#481a7f" floodOpacity="0.451" result="color" />
                <feComposite operator="out" in="SourceGraphic" in2="blur-2" />
                <feComposite operator="in" in="color" />
                <feComposite operator="in" in2="SourceGraphic" />
            </filter>
        </defs>
        <g id="Group_3619" data-name="Group 3619" transform="translate(-21481 7019)">
            <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, 21481, -7019)" filter="url(#Ellipse_281)">
                    <circle id="Ellipse_281-3" data-name="Ellipse 281" cx="24.5" cy="24.5" r="24.5" transform="translate(15 15)" fill="url(#linear-gradient)" />
                </g>
                <g transform="matrix(1, 0, 0, 1, 21481, -7019)" filter="url(#Ellipse_281-2)">
                    <circle id="Ellipse_281-4" data-name="Ellipse 281" cx="24.5" cy="24.5" r="24.5" transform="translate(15 15)" fill="#fff" />
                </g>
            </g>
            <g id="Group_3618" data-name="Group 3618">
                <rect id="Rectangle_2370" data-name="Rectangle 2370" width="6" height="20" transform="translate(21512 -6989)" fill="#fff" />
                <rect id="Rectangle_2371" data-name="Rectangle 2371" width="6" height="20" transform="translate(21524 -6989)" fill="#fff" />
            </g>
        </g>
    </Icon>
}