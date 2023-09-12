import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useFormik } from "formik";
import { singInValidations } from "./validations";
import axios from "axios";
import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Layout from "../../layout/Layout";
import { paperStyle } from "./AuthStyles"; // Import your styles from AuthStyles.js
import { AuthContext } from "../../context/AuthContext";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { handlerLogInOut } = useContext(AuthContext);

  // use Formik
  const { handleSubmit, handleChange, touched, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: singInValidations,
    onSubmit: ({ email, password }, bag) => {
      const data = {
        email: email,
        password: password,
      };

      axios
        .post("http://localhost:8080/api/webuser/login", data)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            const { token } = res.data;
            alert("you registered successfully");
              handlerLogInOut(true, navigate("/"), token);
          } else if (res.status === 203) {
            navigate("/verify", {
              state: email,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Layout>
      <Grid>
        <Paper
          elevation={20}
          style={{
            ...paperStyle,
          }}
        >
          <Grid textAlign="center" marginBottom={2}>
            <Typography variant="h5" fontWeight="bold">
              Sign In
            </Typography>
            <Typography variant="caption">
              Please fill this form to create an account!
            </Typography>
          </Grid>
          <Grid>
            {errors.general && <Alert severity="error">{errors.general}</Alert>}
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              name="email"
              label="Email"
              variant="standard"
              placeholder="Enter your email"
              onChange={handleChange}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              variant="standard"
              placeholder="Enter your password"
              onChange={handleChange}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {/* <Button component={NavLink} to="/forgetpassword">
              Forget Password
            </Button> */}
            <Button component={NavLink} to="/signup">
              Sign Up
            </Button>
            <Grid marginTop={3}>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                variant="contained"
                color="primary"
              >
                Sign In
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Layout>
  );
};
