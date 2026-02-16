import type { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Loader from "../../components/common/Loader";

export default function AdminProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const User = localStorage.getItem("CurrUser");

  const handleGetUserDetails = async () => {
    const userId = localStorage.getItem("userID");
    if (!userId) return;

    const response = await dispatch(getUser({ userId }));
    if (getUser.fulfilled.match(response)) {
      navigate("/profile/details");
    }
  };

  const handleLogout = () => {
    const isConfirm = window.confirm("Are you sure to logged out?");

    if (isConfirm) {
      navigate("/");
    }
  };

  const getAllUser = () => navigate("/profile/admins");

  const handleDelete = async () => {
    const userId = localStorage.getItem("userID");
    if (!userId) return;

    if (window.confirm("Are you sure you want to delete this account?")) {
      const response = await dispatch(deleteUser(userId));

      if (deleteUser.fulfilled.match(response)) {
        navigate("/");
      }
    }
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* LEFT SIDE PANEL */}
        <Grid
          size={{ xs: 12, md: 4, lg: 3 }}
          sx={{
            bgcolor: "#2E7D32",
            color: "#fff",
            p: 4,
          }}
        >
          <Box>
            <Stack spacing={3} alignItems="center">
              <Avatar
                src="/broken-image.jpg"
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: "#fff",
                  color: "#2E7D32",
                }}
              />

              <Typography variant="h6">{User}</Typography>

              <Stack spacing={2} width="100%">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#fff", color: "#2E7D32" }}
                  onClick={handleGetUserDetails}
                >
                  {loading === "getUser" ? <Loader size={20} /> : "Details"}
                </Button>

                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#fff", color: "#2E7D32" }}
                  onClick={getAllUser}
                >
                  {loading === "getAllUser" ? (
                    <Loader size={20} />
                  ) : (
                    "Registered Users"
                  )}
                </Button>

                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ backgroundColor: "#fff", color: "#2E7D32" }}
                >
                  Logout
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  {loading === "deleteUser" ? (
                    <Loader size={20} />
                  ) : (
                    "Delete account"
                  )}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Grid>

        {/* RIGHT SIDE OUTLET */}
        <Grid
          size={{ xs: 12, md: 8, lg: 9 }}
          sx={{
            p: 4,
            bgcolor: "#f5f5f5",
            // overflowY: "auto",
          }}
        >
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
