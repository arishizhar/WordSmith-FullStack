import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import UserAvatarImage from "./UserAvatarImage";

const UserInfo = () => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <>
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserAvatarImage />
          <Box onClick={() => console.log("user cliced")}>
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              Arish Izhar
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              Unsure
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => console.log("button clicked")}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        </IconButton>
      </FlexBetween>
    </>
  );
};

export default UserInfo;
