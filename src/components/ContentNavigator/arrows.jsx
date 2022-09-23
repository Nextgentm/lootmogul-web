import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { Box, Image } from "@chakra-ui/react";
function Arrow({ children, disabled, onClick }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                right: "1%",
                opacity: disabled ? "0" : "1",
                userSelect: "none",
                marginRight: "-40px",
                marginLeft: "-40px",
                zIndex: 1
            }}
        >
            {children}
        </button>
    );
}

export function LeftArrow() {
    const {
        // getItemById,
        getPrevItem,
        isFirstItemVisible,
        scrollToItem,
        visibleItemsWithoutSeparators,
        initComplete
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

    // NOTE: for scroll 1 item
    const clickHandler = () => {
        const prevItem = getPrevItem();
        scrollToItem(prevItem?.entry?.target, "smooth", "start");
        // OR
        // scrollToItem(
        //   getItemById(visibleItemsWithoutSeparators.slice(-2)[0]),
        //   "smooth",
        //   "end"
        // );
    };

    return (
        <Arrow disabled={disabled} onClick={clickHandler}>
            <Box width={["75px", "90px", "100px", "120px"]} overflow="hidden">
                <Image
                    width={["100%"]}
                    p={"0px"}
                    src={
                        disabled
                            ? `/assets/designupdate1/arrow-left-selected.svg`
                            : `/assets/designupdate1/arrow-left-selected.svg`
                    }
                />
            </Box>
        </Arrow>
    );
}

export function RightArrow() {
    const {
        // getItemById,
        getNextItem,
        isLastItemVisible,
        scrollToItem,
        visibleItemsWithoutSeparators
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !visibleItemsWithoutSeparators.length && isLastItemVisible
    );
    React.useEffect(() => {
        if (visibleItemsWithoutSeparators.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleItemsWithoutSeparators]);

    const clickHandler = () => {
        const nextItem = getNextItem();
        scrollToItem(nextItem?.entry?.target, "smooth", "end");
    };

    return (
        <Arrow disabled={disabled} onClick={clickHandler}>
            <Image
                alt="rightArrow"
                width={["75px", "90px", "100px", "120px"]}
                overflow="hidden"
                p={"0px"}
                src={
                    disabled
                        ? `/assets/designupdate1/arrow-right-selected.svg`
                        : `/assets/designupdate1/arrow-right-selected.svg`
                }
            />
        </Arrow>
    );
}
