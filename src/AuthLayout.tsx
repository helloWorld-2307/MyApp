import { Link, Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { styled} from "@mui/material/styles";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function AuthLayout() {
  return (
    <div style={{}}>
      <Box sx={{ flexGrow: 1, height: "100vh" }}>
        <Grid container sx={{ height: "100%" }}>
          <Grid size={4} sx={{ height: "100%" }}>
            <Item
              sx={{
                height: "100%",
                boxSizing: "border-box",
                backgroundColor: "#2E7D32",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p style={{ color: "#fff" }}>Welcom to auth login/register </p>
              <div>
                <ButtonGroup
                  variant="contained"
                  disableElevation
                  aria-label="auth buttons"
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "80%",
                      md: "60%",
                      lg: "40%",
                    },
                  }}
                >
                  <Button
                    component={Link}
                    to="/login"
                    sx={{
                      backgroundColor: "#fff",
                      color: "#2E7D32",
                      "&:hover": { backgroundColor: "#efeeee" },
                      fontSize: {
                        xs: "10px", 
                        sm: "14px", 
                        md: "16px", 
                        lg: "18px", 
                      },
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    component={Link}
                    to="/register"
                    sx={{
                      backgroundColor: "#fff",
                      color: "#2E7D32",
                      "&:hover": { backgroundColor: "#efeeee" },
                      fontSize: {
                        xs: "10px", 
                        sm: "14px", 
                        md: "16px", 
                        lg: "18px", 
                      },
                    }}
                  >
                    Register
                  </Button>
                </ButtonGroup>
              </div>
            </Item>
          </Grid>
          <Grid size={8} sx={{ height: "100%" }}>
            <Item sx={{ height: "100%", boxSizing: "border-box" ,display: "flex",
                flexDirection: "column",
                justifyContent: "center",}}>
              <Outlet />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
