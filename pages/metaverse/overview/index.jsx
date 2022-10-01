import { Box } from "@chakra-ui/react";
const MetaverseOverView = () => {
  return (
    <Box w="100%" h="100vh" pos="relative">
      <iframe
        id="3dview"
        src="https://momento360.com/e/u/92756b5ad63f49489e79c0761ed8a264?utm_campaign=embed&utm_source=other&heading=-35.37&pitch=19.81&field-of-view=100&size=medium"
        scrolling="no"
        allowtransparency="true"
        allowFullScreen="true"
        style={{ width: "100%", height: "100%", border: 0, overflow: "hidden" }}
      ></iframe>
    </Box>
  );
};

export default MetaverseOverView;
