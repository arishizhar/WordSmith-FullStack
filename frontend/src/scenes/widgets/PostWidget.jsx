import { useState, useEffect } from "react";
import { FavoriteOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";

import FlexBetween from "../../components/FlexBetween";
import UserInfo from "../../components/UserInfo";
import WidgetWrapper from "../../components/WidgetWrapper";

const PostWidget = () => {
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;

  return (
    <>
      <WidgetWrapper m="2rem 0">
        <UserInfo />
        <Typography colo={main} sx={{ mt: "1rem" }}>
          Unsure
        </Typography>
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src="https://images.unsplash.com/photo-1745972036912-3e7ccc236922?q=80&w=1922&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <FlexBetween mt="0.25rem">
          <FlexBetween gap="1rem">
            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => console.log("like cliked")}>
                <FavoriteOutlined sx={{ color: primary }} />
              </IconButton>
            </FlexBetween>

            <FlexBetween gap="0.3rem">
              <IconButton onClick={() => console.log("like cliked")}>
                <FavoriteOutlined sx={{ color: primary }} />
              </IconButton>
            </FlexBetween>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
    </>
  );
};

export default PostWidget;
