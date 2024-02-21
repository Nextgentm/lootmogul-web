import { Text } from "@chakra-ui/react";
/* by default works as error message */

const ErrOrSuccessMsg = ({ msg, message, align = "left", success = "" }) => (
    <>
        {
            (msg || message) &&
            <Text color={success ? "green.300" : "red.500"} align={align} style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
                {msg || message}
            </Text>
        }
    </>
)

export default ErrOrSuccessMsg