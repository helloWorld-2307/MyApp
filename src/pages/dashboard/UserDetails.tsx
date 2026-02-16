// import { useState } from "react";
// import type { AppDispatch } from "../../app/store";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUser } from "../../features/auth/authThunks";

import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSelectors";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function UserDetails() {
  const [openContact, setOpenContact] = useState(false);
  const [task, setTask] = useState("");
  const [message, setMessage] = useState("");

  const data = useSelector(selectUser);
  const [learnMore, setLearMore] = useState(false);

  const handleSubmit = async () => {

    if (!data) return;

    try {
      await fetch("https://hook.eu1.make.com/uaey9qv3dub4g4igpix8uv4rlr89gvqf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email, // logged in user
          name: data.name,
          task,
          message,
          type: "contact_request",
          submitted_at: new Date().toISOString(),
        }),
      });

      alert("to do added!");
      setOpenContact(false);
      setTask("");
      setMessage("");
    } catch (error) {
      console.error("Error sending webhook:", error);
    }
  };

  return (
    <>
      {data && (
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              unique id : {data.id}
            </Typography>
            <Typography variant="h5" component="div" color="success">
              {bull} {data.name}
            </Typography>
            <Typography variant="body2" >
              hope you are doing well!!
              <br />
              {'"welcome to my 1st project with typescript"'}
            </Typography>
          </CardContent>
          <CardActions
            sx={{ flexDirection: "column", alignItems: "flex-start" }}
          >
            <Button
              onClick={() => {
                setLearMore((learnMore) => !learnMore);
              }}
              size="small"
              color="success"
            >
              Learn More
            </Button>
            {learnMore && (
              <>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {bull} last update : {data.updateAt}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {bull} account creation : {data.createAt}
                </Typography>
                <Typography
                  gutterBottom
                  sx={{
                    color: "green",
                    fontSize: 14,
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenContact(true)}
                >
                  {bull} Add ToDo
                </Typography>
              </>
            )}
          </CardActions>
        </Card>
      )}
      <Dialog open={openContact} onClose={() => setOpenContact(false)}>
        <DialogTitle color="success">Contact Me</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenContact(false)} color="success">Cancel</Button>
          <Button onClick={handleSubmit} color="success">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
