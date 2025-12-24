import { Box, Typography, useMediaQuery, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import CityStatsWidget from "scenes/widgets/CityStatsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const { palette } = useTheme();

  const [showStats, setShowStats] = useState(false);

  return (
    <Box>
      <Navbar />

      <Box
        width="100%"
        padding="2rem 6%"
        display="flex"
        gap="2rem"
        justifyContent="center"
      >
        {/* LEFT PROFILE PANEL */}
        {isNonMobileScreens && (
          <Box flexBasis="22%">
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
        )}

        {/* CENTER FEED */}
        <Box flexBasis={isNonMobileScreens ? "50%" : "100%"}>
          <MyPostWidget picturePath={picturePath} />

          

          <PostsWidget userId={_id} />
        </Box>

        {/* RIGHT CITY STATS PANEL - DESKTOP */}
        {isNonMobileScreens && (
          <Box flexBasis="22%">
            <CityStatsWidget />
          </Box>
        )}
      </Box>

      {/* 📊 FLOATING BUTTON - MOBILE */}
      {!isNonMobileScreens && (
        <Box position="fixed" bottom="20px" right="20px" zIndex="2000">
          <Button
            variant="contained"
            onClick={() => setShowStats(true)}
            sx={{
              borderRadius: "30px",
              padding: "0.6rem 1.2rem",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            📊 View City Stats
          </Button>
        </Box>
      )}

      {/* 📊 CITY STATS POPUP - MOBILE */}
      {showStats && !isNonMobileScreens && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(0,0,0,0.4)"
          zIndex="3000"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="90%">
            <CityStatsWidget />

            <Button
              fullWidth
              onClick={() => setShowStats(false)}
              sx={{ mt: "1rem" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
