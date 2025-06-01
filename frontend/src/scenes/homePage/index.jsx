import { useMediaQuery, Box } from "@mui/material";
import UserWidget from "../widgets/UserWidget";
import PostWidget from "../widgets/PostWidget";
import useAuthStore from "../../stores/authStore";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const userId = 5;
  const picturePath = "";

  //check stores and auth status
  const { user, isAuthenticated } = useAuthStore();

  //if auth then do api logic andn pass data

  return (
    <Box
      width="100%"
      padding="2rem 6%"
      display={isNonMobileScreens ? "flex" : "block"}
      gap="2rem" // Increased gap for better spacing
      justifyContent="center" // Changed to center instead of space-between
    >
      {/* Left Column - User Widget */}
      {isAuthenticated && user && (
        <Box
          flexBasis={isNonMobileScreens ? "26%" : undefined}
          sx={{ maxWidth: isNonMobileScreens ? "300px" : undefined }}
        >
          <UserWidget
            firstname={user.firstname}
            lastname={user.lastname}
            username={user.username}
            avatar={user.avatarImage}
          />
        </Box>
      )}

      {/* Middle Column - Post Widget */}
      <Box
        flexBasis={isNonMobileScreens ? "42%" : undefined}
        mt={isNonMobileScreens ? undefined : "2rem"}
      >
        <PostWidget />
      </Box>

      {/* Right Column - Optional */}
      {isNonMobileScreens && (
        <Box flexBasis="26%" sx={{ maxWidth: "300px" }}>
          {/* Right column content can go here */}
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
