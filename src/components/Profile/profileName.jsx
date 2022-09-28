import { Text } from "@chakra-ui/react";

const ProfileName = (props) => {
    return (
        <Text
            width={["62px"]}
            height={[ "18px"]}
            fontSize={["12px", "14px"]}
            textColor={"#FFFFFF"}
            fontWeight="bold"
        >
            {props.profileName}
        </Text>
    );
};

export default ProfileName;
