import {
  LocationOnOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const getUser = async () => {
    const response = await fetch(`http://localhost:6001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  const { firstName, lastName, location } = user;

  return (
    <WidgetWrapper>
      {/* 🔹 USER HEADER */}
      <FlexBetween gap="1rem" pb="1rem">
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h5"
              color={dark}
              fontWeight="500"
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>
              Citizen
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* 🔹 LOCATION */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem">
          <LocationOnOutlined fontSize="medium" sx={{ color: main }} />
          <Typography color={medium}>
            {location || "Location not provided"}
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* 🔹 PLATFORM INFO */}
      <Box p="1rem 0">
        <Typography color={medium} fontSize="0.9rem">
          Raising local issues to improve community life.
        </Typography>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
