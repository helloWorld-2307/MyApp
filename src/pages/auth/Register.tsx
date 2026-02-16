import { Formik, Form } from "formik";
import { registerSchema } from "../../validations/registerSchema";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { selectLoading } from "../../features/auth/authSelectors";
import { useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SvgIcon, { type SvgIconProps } from "@mui/material/SvgIcon";
import Box from "@mui/material/Box";

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
}

const Register = () => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    const res = await dispatch(registerUser(values));

    if (registerUser.fulfilled.match(res)) {
      navigate("/verify-email");
    } else {
      navigate("/");
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
      <h2 style={{ color: "#2E7D32" }}>User Registration</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, touched, errors }) => (
            <Form>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{
                  mb: 2,
                }}
              />

              <TextField
                fullWidth
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                disabled={loading==="register"}
                variant="contained"
                color="success"
              >
                {loading === "register"? <Loader size={20} /> : "Continue"}
              </Button>
              <br />
              <HomeIcon sx={{ cursor:"pointer", marginTop:'10px'}} onClick={() => navigate("/")} color="success" />
            </Form>
        )}
      </Formik>

    </Box>
  );
};

export default Register;
