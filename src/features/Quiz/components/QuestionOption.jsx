import {
    Box,
    Text,
    Heading,
    Avatar,
    AvatarGroup,
    Image,
    Center,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  
  import { useSpeechSynthesis } from "react-speech-kit";
  
  const QuestionOption = ({
    options,
    allUserOptions,
    voiceOver,
    question,
    imageURL,
    correctAns,
    selOption,
    handleOptionClicked,
  }) => {
    const { speak, cancel } = useSpeechSynthesis();
    const [pitch, setPitch] = useState(1);
    const [rate, setRate] = useState(1);
  
    useEffect(() => {
      if (voiceOver && question && options && options.length > 0) callVoiceOver();
    }, [options]);
    useEffect(() => {
      if (!voiceOver) cancel();
    }, [voiceOver]);
  
    const callVoiceOver = () => {
      if (question) {
        let voicedata = question.replace(/(_)\w+/g, "");
        speak({ text: voicedata, rate: rate, pitch: pitch });
      }
      if (options) {
        options.map((option) => {
          setTimeout(() => speak({ text: option }), 10);
        });
      }
    };
    return (
      <>
        <Box pt="60px">
          <Box
            textAlign="center"
            py={{
              base: "30px",
              sm: "11px",
              md: "60px",
              lg: "60px",
            }}
          >
            <Heading
              fontFamily="sora"
              color="white"
              fontWeight="600"
              LineHeight="16.38px"
              mb={
                imageURL
                  ? {
                      base: "10px",
                      sm: "10px",
                      md: "24px",
                      lg: "24px",
                    }
                  : { base: "25px", sm: "25px", md: "94px", lg: "94px" }
              }
              fontSize={{
                base: "14px",
                sm: "14px",
                md: "24px",
                lg: "24px",
              }}
            >
              {question}
            </Heading>
  
            {imageURL && (
              <Center
                mb={{
                  base: "15px",
                  sm: "15px",
                  md: "44px",
                  lg: "44px",
                }}
              >
                <Image
                  src={imageURL}
                  alt="question"
                  pos="relative"
                  h={["140px", "200px", "300px"]}
                  objectFit="cover"
                />
              </Center>
            )}
  
            <Box
              textAlign="center"
              d="flex"
              justifyContent="space-around"
              flexWrap="wrap"
              m="auto"
              width={{
                base: "auto",
                sm: "auto",
                md: "692px",
                lg: "800px",
              }}
            >
              {options.map((option, index) => (
                <>
                  <Box
                    key={index}
                    pos="relative"
                    mb={{
                      base: "4",
                      sm: "4",
                      md: "10",
                      lg: "10",
                    }}
                  >
                    <AvatarGroup
                      size="xs"
                      pos="absolute"
                      bottom={{
                        base: "29px",
                        sm: "29px",
                        md: "57px",
                        lg: "57px",
                      }}
                      right="-4px"
                    >
                      {allUserOptions?.length &&
                        allUserOptions[index].map(
                          (user) =>
                            user.is_active && (
                              <Avatar
                                name={user.username}
                                src={user.profile_pic}
                              />
                            )
                        )}
                    </AvatarGroup>
                    <Text
                      variant="optionText"
                      p={{
                        base: "11px 5px",
                        sm: "11px 5px",
                        md: "20px 5px",
                        lg: "20px 5px",
                      }}
                      width={{
                        base: "290px",
                        sm: "290px",
                        md: "300px",
                        lg: "300px",
                      }}
                      fontSize={{
                        base: "12px",
                        sm: "12px",
                        md: "16px",
                        lg: "16px",
                      }}
                      onClick={() => {
                        cancel();
                        handleOptionClicked(index, option);
                      }}
                      bg={
                        correctAns === index && selOption === index
                          ? "#45E470" // with checkmark
                          : correctAns === index
                          ? "#45E470" // without checkmark
                          : correctAns >= 0 && selOption === index
                          ? "#FF4848" // wrong answered
                          : selOption === index
                          ? "#f2b01c" // selected but no answer yet
                          : "#ffffff" // not selected yet
                      }
                    >
                      {option}
                    </Text>
                  </Box>
                </>
              ))}
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  export default QuestionOption;
  