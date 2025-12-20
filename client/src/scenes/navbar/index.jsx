import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Close,
  Light,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Box
      position="sticky"
      top="0"
      zIndex="1000"
      sx={{
        backgroundColor: alt,
        boxShadow: "0 2px 8px rgba(7, 7, 7, 1)",
      }}
    >
      <FlexBetween padding="0.75rem 6%">
        {/* LEFT */}
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="700"
            fontSize="clamp(1.1rem, 2rem, 2.2rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              letterSpacing: "0.5px",
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            LocalVoice
          </Typography>

          {isNonMobileScreens && (
            <FlexBetween
              backgroundColor={neutralLight}
              borderRadius="20px"
              gap="1rem"
              padding="0.2rem 1.2rem"
            >
              <InputBase placeholder="Search issues..." />
              <IconButton size="small">
                <Search />
              </IconButton>
            </FlexBetween>
          )}
        </FlexBetween>

        {/* RIGHT */}
        {isNonMobileScreens ? (
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: dark }} />
              )}
            </IconButton>

            <Notifications sx={{ fontSize: "22px", color: dark }} />

            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "160px",
                  borderRadius: "20px",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": { pr: "0.25rem" },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography fontWeight="500">{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}
      </FlexBetween>

      {/* MOBILE MENU */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          top="0"
          height="100%"
          zIndex="2000"
          width="300px"
          backgroundColor={background}
          boxShadow="-2px 0 10px rgba(0,0,0,0.1)"
        >
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(false)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            flexDirection="column"
            gap="2rem"
            p="2rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode />
              ) : (
                <LightMode sx={{ color: dark }} />
              )}
            </IconButton>

            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  borderRadius: "20px",
                  p: "0.25rem 1rem",
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
