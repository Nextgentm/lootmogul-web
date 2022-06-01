import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button, Heading, Text, Box
  } from '@chakra-ui/react'

const LMAlertDialog = ({isOpen, onClose})=>{
    return  <AlertDialog
    motionPreset='slideInBottom'
    onClose={onClose}
    isOpen={isOpen}
    onClick={onClose}
    isCentered
    size={["lg","xl"]}
    bg="background"
  >
    <AlertDialogOverlay />

    <AlertDialogContent p="10px" bg="background">
        <Box  border="2.7033px dashed #515151">
      <AlertDialogHeader><Heading color="white">Manish Agarwal</Heading></AlertDialogHeader>
      <AlertDialogCloseButton _focus={{boxShadow:"none"}} />
      <AlertDialogBody>
     <Text variant="hint"> Experienced Chief Executive Officer with a demonstrated history of working in the computer games industry. Strong business development professional skilled in Advertising, E-commerce, Business Development, Marketing Strategy, and Customer Relationship Management (CRM).

Manish Agarwal presently is the Chief Executive Officer of Nazar Technologies.  He holds a bachelor’s degree in technology from the Regional Engineering College, Warangal and a post graduate diploma in Management from the Indian Institute of Management, Ahmedabad. He has approximately 20 years of experience in various fields including the gaming space and marketing. He was associated with Reliance Games for more than four years, in the capacity of chief executive officer of Zapak Mobile Games Private Limited and chief operating officer of Zapak Digital Entertainment Limited. Manish is visionary leader with hard core execution and operational excellence, he has been adviser and mentor.
</Text>
      </AlertDialogBody>
      <AlertDialogFooter>
      <Button  onClick={onClose}>
                Close
              </Button>
      </AlertDialogFooter>
      </Box>
    </AlertDialogContent>
  </AlertDialog>
}

export default LMAlertDialog;