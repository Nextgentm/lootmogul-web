import React, { useState} from "react";
import {
  Box,
  Grid,
  Center,
  GridItem,
  Flex,
  Text,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Checkbox,
  useBreakpointValue,
  AlertDialog,
  AlertDialogBody,
  Heading,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import strapi from "../../../src/utils/strapi";
import { Image } from "@chakra-ui/react";

const CustomedFormLabel = ({ title, htmlFor, required }) => {
  return (
    <FormLabel htmlFor="email">
      <Flex>
        <Text color="white">{title}</Text>
        {required && (
          <Text pl={2} color="red">
            *
          </Text>
        )}
      </Flex>
    </FormLabel>
  );
};

const SectionHeader = ({ title, subtitle = "" }) => {
  const currentSize = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
  });

  return (
    <Flex
      my={[3, 6]}
      mt={[5, 10]}
      alignItems="center"
      flexDirection={["column", "row"]}
    >
      <Text
        color="white"
        fontSize={["18px", "24px"]}
        style={{
          fontWeight: "bold",
          textAlign: currentSize === "base" ? "center" : "left",
        }}
        fontFamily="Sora"
        pr={4}
      >
        {title}
      </Text>

      {subtitle !== "" && (
        <Text
          color="white"
          fontSize={["12px", "14px"]}
          textAlign={["left", "center"]}
          fontFamily="Sora"
          mt={currentSize === "base" ? 2 : 0}
        >
          {subtitle}
        </Text>
      )}
    </Flex>
  );
};

const Divider = () => {
  return <Box height="1px" bg="#98B7D2" my={[4, 12]} />;
};

const Page = () => {
  const [accepted, setAccepted] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});

  const ShowAlert = () => {
    return (
      <AlertDialog
        isOpen={alertMsg?.isOpen}
        motionPreset="slideInBottom"
        isCentered
        size={"xl"}
        bg="background"
        closeOnOverlayClick={true}
        closeOnEsc={true}
        onClose={() => {
          setAlertMsg({});
        }}
      >
        <AlertDialogOverlay />

        <AlertDialogContent p="10px" bg="background">
          <Box border="2.7033px dashed #515151">
            <AlertDialogHeader>
              <Heading color="white">{alertMsg?.title}</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text variant="hint">{alertMsg?.message}</Text>
            </AlertDialogBody>
          </Box>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const formik = useFormik({
    initialValues: {
      accountNumber: "",
      bankName: "",
      email: "",
      facebookURL: "",
      firstName: "",
      instagramURL: "",
      lastName: "",
      paypalEmail: "",
      personalBio: "",
      routingNumber: "",
      twitterURL: "",
      youtubeURL: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (
        values.firstName !== "" &&
        values.lastName !== "" &&
        values.email !== ""
      ) {
        const resp = await strapi.create("influencer-signups", values);
        // //console.log(resp);
        if (resp.data) {
          setAlertMsg({
            isOpen: true,
            title: "Success",
            message: "Your information has been sent!",
          });

          resetForm();
        } else {
          setAlertMsg({
            isOpen: true,
            title: "Error",
            message: "There is an error while sending your information!",
          });
        }
      } else {
        setAlertMsg({
          isOpen: true,
          title: "Error",
          message: "Required fields must not be left blank!",
        });
      }
    },
  });

  const toggleAccepted = () => {
    setAccepted(!accepted);
  };

  return (
    <Box py={[5, 10]} position="relative" overflowX="hidden">
      <Box position="absolute" top="0" left="-250px" zIndex="-1">
        <Image src="/assets/bg-wave.png" alt="wave" />
      </Box>

      <Box
        bg="rgba(72, 26, 127, .36)"
        width={"90%"}
        style={{
          margin: "0 auto",
        }}
        p={["10px", "0"]}
        borderRadius={"8px"}
      >
        <Box
          p={["10px", "40px"]}
          border="2px solid #481A7F"
          borderRadius={"8px"}
        >
          <Text
            mb={"30px"}
            fontSize={["28px", "58px"]}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            fontFamily="Blanch"
            color="white"
          >
            Influencer Partnership Signup
          </Text>

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <Grid
              templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              gap={6}
            >
              <GridItem>
                <FormControl style={{ marginBottom: "12px" }}>
                  <CustomedFormLabel
                    htmlFor="first_name"
                    title="First Name"
                    required
                  />
                  <Input
                    id="first_name"
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    onChange={formik.handleChange}
                    value={formik.values.firstName}
                    style={styles.input}
                    _placeholder={{ color: "#7C7C7C" }}
                    required
                  />
                  <FormHelperText style={styles.helperText}>
                    First Name
                  </FormHelperText>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl style={{ marginBottom: "12px" }}>
                  <CustomedFormLabel
                    htmlFor="last_name"
                    title="Last Name"
                    required
                  />
                  <Input
                    id="last_name"
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    style={styles.input}
                    _placeholder={{ color: "#7C7C7C" }}
                    required
                  />
                  <FormHelperText style={styles.helperText}>
                    Last Name
                  </FormHelperText>
                </FormControl>
              </GridItem>
            </Grid>

            <FormControl style={{ marginBottom: "12px" }}>
              <CustomedFormLabel htmlFor="email" title="Email" required />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                style={styles.input}
                _placeholder={{ color: "#7C7C7C" }}
                required
              />
              <FormHelperText style={styles.helperText}>
                example@example.com
              </FormHelperText>
            </FormControl>
          </Grid>

          <Divider />

          <SectionHeader
            title="Social Media Accounts"
            subtitle="* Leave blank if you don't have a specific accounts."
          />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="instagram" title="Instagram URL" />
                <Input
                  id="instagram"
                  name="instagramURL"
                  type="text"
                  placeholder="Instagram URL"
                  onChange={formik.handleChange}
                  value={formik.values.instagramURL}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="facebook" title="Facebook URL" />
                <Input
                  id="facebook"
                  name="facebookURL"
                  type="text"
                  placeholder="Facebook URL"
                  onChange={formik.handleChange}
                  value={formik.values.facebookURL}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="youtube" title="Youtube URL" />
                <Input
                  id="youtube"
                  name="youtubeURL"
                  type="text"
                  placeholder="Youtube URL"
                  onChange={formik.handleChange}
                  style={styles.input}
                  value={formik.values.youtubeURL}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="twitter" title="Twitter URL" />
                <Input
                  id="twitter"
                  name="twitterURL"
                  type="text"
                  placeholder="Twitter URL"
                  onChange={formik.handleChange}
                  value={formik.values.twitterURL}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Divider />

          <SectionHeader title="Personal Bio" />

          <FormControl style={{ marginBottom: "12px" }}>
            <CustomedFormLabel
              htmlFor="about_you"
              title="Tell us more about you"
            />
            <Textarea
              id="about_you"
              name="personalBio"
              type="email"
              placeholder="Tell us something about you"
              rows={5}
              onChange={formik.handleChange}
              value={formik.values.personalBio}
              style={styles.input}
              _placeholder={{ color: "#7C7C7C" }}
            />
          </FormControl>

          <Divider />

          <SectionHeader title="PayPal Payment Information" />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel
                  htmlFor="paypal_email_id"
                  title="Paypal Email ID"
                />
                <Input
                  id="paypal_email_id"
                  name="paypalEmail"
                  type="email"
                  placeholder="Paypal email ID"
                  onChange={formik.handleChange}
                  value={formik.values.paypalEmail}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
                <FormHelperText style={styles.helperText}>
                  example@example.com
                </FormHelperText>
              </FormControl>
            </GridItem>
          </Grid>

          <Divider />

          <SectionHeader
            title="Bank Direct Deposit Information"
            subtitle="(OPTIONAL, if you do not have a PayPal account)"
          />

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gap={6}
            columnGap={[2, 24]}
          >
            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel htmlFor="bank_name" title="Bank Name" />
                <Input
                  id="bank_name"
                  name="bankName"
                  type="text"
                  placeholder="Bank name"
                  onChange={formik.handleChange}
                  value={formik.values.bankName}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel
                  htmlFor="routing_number"
                  title="Routing Number"
                />
                <Input
                  id="routing_number"
                  name="routingNumber"
                  type="text"
                  placeholder="Bank routing number"
                  onChange={formik.handleChange}
                  value={formik.values.routingNumber}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl style={{ marginBottom: "12px" }}>
                <CustomedFormLabel
                  htmlFor="account_number"
                  title="Account Number"
                />
                <Input
                  id="account_number"
                  name="accountNumber"
                  type="text"
                  placeholder="Bank account number"
                  onChange={formik.handleChange}
                  value={formik.values.accountNumber}
                  style={styles.input}
                  _placeholder={{ color: "#7C7C7C" }}
                />
              </FormControl>
            </GridItem>
          </Grid>

          <Center>
            <Checkbox
              isChecked={accepted}
              style={{ marginBottom: "12px", color: "white" }}
              onChange={toggleAccepted}
            >
              <Flex fontSize={["12px", "14px"]}>
                <Text>I agree to</Text>{" "}
                <Text color="#FFD43E" fontWeight="bold" pl={1}>
                  Terms &amp; conditions.
                </Text>{" "}
                <Text color="red" pl={1}>
                  *
                </Text>
              </Flex>
            </Checkbox>
          </Center>

          <Flex justifyContent="center" alignItems="center">
            <Button
              disabled={!accepted}
              onClick={formik.handleSubmit}
              width={240}
              bgImage="linear-gradient(90deg, #E90A63 0%, #481A7F 100%)"
              opacity="1 !important"
              filter="drop-shadow(0 0 20px #FF0080)"
              boxShadow="inset 0 0 3px -10px #481A7F !important"
            >
              Submit
            </Button>
          </Flex>
        </Box>
      </Box>
      {ShowAlert()}

      <Box position="absolute" bottom="150px" right="-700px" zIndex="-1">
        <Image src="/assets/bg-bottom-wave.png" alt="wave" />
      </Box>
    </Box>
  );
};

const styles = {
  helperText: {
    color: "#9E9E9E",
  },
  input: {
    background: "#FCFCFD",
    color: "#111",
  },
};

export default Page;
