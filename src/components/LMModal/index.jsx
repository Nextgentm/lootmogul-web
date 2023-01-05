/* eslint-disable react/jsx-key */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Heading,
    Image
} from "@chakra-ui/react";

const LMModal = ({
    isShow,
    handleClose,
    headerText,
    children,
    style,
    size,
    mode,
    scrollBehavior
}) => {
    return (
        <Modal
            isCentered
            isOpen={isShow}
            onClose={handleClose}
            zIndex={99999}
            size={size ? size : "xl"}
            blockScrollOnMount={true}
            closeOnOverlayClick={false}
            lockFocusAcrossFrames={false}
            scrollBehavior={scrollBehavior ? scrollBehavior : "inside"}
            borderRadius="12"
        >
            <ModalOverlay />
            <ModalContent
                minW={
                    mode === "add" || mode === "deposit"|| mode ==="sub"
                        ? ["375px","400px", "760px"]
                        : ""
                }
                style={style}
                borderRadius="14"
                background="transparent"
            >
                <ModalCloseButton
                    color="#fff"
                    background="transparent linear-gradient(90deg, #E90A63 0%, #481A7F 100%) 0% 0% no-repeat padding-box"
                    borderRadius="full"
                    outline="#303030"
                    boxShadow="inset 0px 3px 18px #481A7F73, 0px 0px 20px #FF0080CF"
                />
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LMModal;
