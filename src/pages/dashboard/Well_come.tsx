import { Box, Typography, Paper, Avatar, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function WelcomeProfile() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          textAlign: "center",
          maxWidth: 500,
          width: "100%",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
                bgcolor:"#fff",
              color: "#2E7D32",
              width: 50,
              height: 50,
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>

          <Typography variant="h4" fontWeight="bold">
            Welcome to Your Profile
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Manage your account settings, view user details,
            and explore dashboard features from here.
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
