import { Box, Typography } from "@mui/material";

export default function Welcome() {
    return (
        <Box 
            sx={{ 
                textAlign: "center", 
                mt: 8, 
                p: 4, 
                maxWidth: 400, 
                mx: "auto",
                borderRadius: 2,
                backgroundColor: "#f5f5f5"
            }}
        >
            <Typography variant="h4" gutterBottom>
                Welcome!
            </Typography>
            <Typography variant="subtitle1">
                Please select an option - Login / Register
            </Typography>
        </Box>
    );
}
