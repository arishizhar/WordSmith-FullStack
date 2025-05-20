import { useMediaQuery, Box } from "@mui/material";
import UserWidget from "../widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width-1000px)");
  const userId = 5;
  const picturePath = "";
  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
    >
      <Box
        flexBasis={isNonMobileScreens ? "26%" : "100%"}
        maxWidth={isNonMobileScreens ? undefined : "300px"}
        mx={isNonMobileScreens ? undefined : "auto"}
      >
        <UserWidget />
      </Box>

      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        {/* Main content goes here */}
      </Box>

      {isNonMobileScreens && <Box flexBasis="26%"></Box>}
    </Box>
  );
};

export default HomePage;
