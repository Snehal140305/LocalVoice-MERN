import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg,#eef2f3,#d9e4f5)",
      }}
    >
      <Box
        width="420px"
        p="2.5rem"
        borderRadius="16px"
        backgroundColor="#ffffff"
        boxShadow="0 15px 40px rgba(0,0,0,0.1)"
      >
        <Typography fontSize="2rem" fontWeight="700" mb="0.5rem">
          Welcome to <span style={{ color: "#1976d2" }}>LocalVoice</span>
        </Typography>

        <Typography mb="1.5rem" color="gray">
          Together for better local solutions.
        </Typography>

        {/* ✅ THIS FIXES EVERYTHING */}
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
