import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import type { AppDispatch } from "../../app/store";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Loader from "../../components/common/Loader";
import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";

interface FormValues {
  email: string;
  password: string;
}

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const response = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(response)) {
      const token = response.payload.token;
      const name = response.payload.name;
      localStorage.setItem("CurrUser",name);
      localStorage.setItem("LoginToken", token);
      navigate("/profile");
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "400px" },
        mx: "auto",
        mt: 6,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ color: "#2E7D32" }}>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          {...register("email", { required: "Email is required" })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          type="password"
          label="Password"
          margin="normal"
          {...register("password", {
            required: "Password is required",
          })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          disabled={loading==="login"}
          sx={{ mt: 2 }}
        >
          {loading === "login" ? <Loader size={20} /> : "Login"}
        </Button>
        <br />
        <HomeIcon sx={{ cursor:"pointer", marginTop:'10px'}} onClick={() => navigate("/")} color="success" />
      </form>

    </Box>
  );
};

export default Login;
