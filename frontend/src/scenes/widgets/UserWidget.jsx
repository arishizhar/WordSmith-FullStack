import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, userImage }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigateate();
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

  if (!user) return null;

  const {
    firstname, lastname, userId, 
  } = user;

  return (
    <WidgetWrapper>
          
    </WidgetWrapper>
  )
};
