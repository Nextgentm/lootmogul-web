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
                        ? ["375px", "760px"]
                        : ""
                }
                style={style}
                borderRadius="14"
                background="transparent"
            >
                <ModalCloseButton
                    color="black"
                    background="#303030"
                    borderRadius="full"
                    outline="#303030"
                />
                <ModalBody>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default LMModal;
