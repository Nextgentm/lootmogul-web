import React from "react";

import { VisibilityContext } from "react-horizontal-scrolling-menu";
import {Image, Box}  from "@chakra-ui/react";
function Arrow({
  children,
  disabled,
  onClick
}) {
  return (
    <Box
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
       
        zIndex: 1

      }}
      marginRight={["-20px","-40px","-40px"]}
      marginLeft={["-20px","-40px","-40px"]}
      
    >
      {children}
    </Box>
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
      
      <Image  
      width={["50px","90px","100px","120px"]} p={"0px"}
      src={ disabled ? `/assets/designupdate1/arrow-left-selected.svg` : `/assets/designupdate1/arrow-left-selected.svg`}  />
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

  // NOTE: for scroll 1 item
  const clickHandler = () => {
    const nextItem = getNextItem();
    scrollToItem(nextItem?.entry?.target, "smooth", "end");
    // OR
    // scrollToItem(
    //   getItemById(visibleItemsWithoutSeparators[1]),
    //   "smooth",
    //   "start"
    // );
  };

  return (
    <Arrow disabled={disabled} onClick={clickHandler}>
      <Image width={["50px","90px","100px","120px"]} p={"0px"} src={ disabled ? `/assets/designupdate1/arrow-right-selected.svg` : `/assets/designupdate1/arrow-right-selected.svg`}  />
    </Arrow>
    
  );
}
