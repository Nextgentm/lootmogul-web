import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    Heading,
    Text,
    Box
} from "@chakra-ui/react";

const LMNonCloseALert = ({
    isOpen,
    data,
    children,
    header,
    onClose,
    canClose
}) => {
    return (
        <AlertDialog
            motionPreset="slideInBottom"
            onClose={onClose}
            isOpen={isOpen}
            onClick={onClose}
            isCentered
            size={"xl"}
            bg="background"
            closeOnOverlayClick={false}
            closeOnEsc={false}
        >
            <AlertDialogOverlay />

            <AlertDialogContent p="10px" bg="background">
                <Box border="2.7033px dashed #515151">
                    <AlertDialogHeader>
                        <Heading color="white">{header}</Heading>
                    </AlertDialogHeader>
                    {canClose && (
                        <AlertDialogCloseButton
                            _focus={{ boxShadow: "none" }}
                        />
                    )}
                    <AlertDialogBody>
                        {data && <Text variant="hint">{data}</Text>}
                        {children && (
                            <Box width="100%" m="auto" textAlign={"center"}>
                                {children}
                            </Box>
                        )}{" "}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        {canClose && <Button onClick={onClose}>Close</Button>}
                    </AlertDialogFooter>
                </Box>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LMNonCloseALert;
