import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserAvatarImage from "../../components/UserAvatarImage";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = () => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  // logic to get user
  const getUser = async () => {
    //logic
  };

  useEffect(() => {
    getUser();
  }, []);

  //   if (!user) return null;

  //   const { firstname, lastname, userId } = user;

  return (
    <WidgetWrapper>
      {/* First row */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => console.log("profile clicked")}
      >
        <UserAvatarImage image={"some path"} />
        <Box>
          <Typography
            variant="h4"
            color={dark}
            fontWeight="500"
            sx={{
              "&:hover": { color: palette.primary.light, cursor: "pointer" },
            }}
          >
            Arish Izhar
          </Typography>

          <Typography color={medium}>@arishzihar</Typography>
        </Box>
      </FlexBetween>

      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>My Posts</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>

        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Liked Posts</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>

        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Saved Posts</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* Second Row */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Following</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>

        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Followers</Typography>
          <Typography color={main} fontWeight="500">
            10
          </Typography>
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
