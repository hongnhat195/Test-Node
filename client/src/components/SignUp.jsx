import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import axios from "axios";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const theme = createTheme();
export default function SignUp() {
  const [user, setUser] = React.useState({
    ID: "",
    Name: "",
    password: "",
    Email: "",
    Phone: "",
    Address: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      address.Home_number == "" ||
      address.Street == "" ||
      address.City == "" ||
      address.Province == ""
    ) {
      alert("Please enter a valid address !");
      return;
    }
    await axios
      .post("http://localhost:5000/api/v1/user/jion", user)
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };
  const Validation = (name, value) => {
    var isValid = true;
    if (name == "ID") {
      var patternCharacter =
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$";
      if (!value.match(patternCharacter)) {
        document.getElementById("check-ID").style.display = "block";
        document.getElementById(
          "check-ID"
        ).innerHTML = `ID must contain at least one lowercase letter, one uppercase letter, and one number`;
        isValid = false;
      } else {
        document.getElementById("check-ID").style.display = "none";
        isValid = true;
      }
    }
    if (name == "password") {
      var patternCharacter1 =
        "^(?=.*[!@#$%^&*()/^+=?.,;=])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*()/^+=?.,;=]{8,}$";
      if (!value.match(patternCharacter1)) {
        document.getElementById("check-Password").style.display = "block";
        document.getElementById(
          "check-Password"
        ).innerHTML = `Pass must contain at least one lowercase letter, one uppercase letter, one number and one special character`;
        isValid = false;
      } else {
        document.getElementById("check-Password").style.display = "none";
        isValid = true;
      }
    }
    if (name == "Email") {
      var mailformat =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (
        value.match(mailformat) &&
        value.indexOf(".") === value.lastIndexOf(".")
      ) {
        document.getElementById("check-Email").style.display = "none";
      } else {
        document.getElementById("check-Email").style.display = "block";
      }
    }
    if (name == "Phone") {
      var phoneformat = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
      if (value.match(phoneformat)) {
        document.getElementById("check-Phone").style.display = "none";
      } else {
        document.getElementById("check-Phone").style.display = "block";
        document.getElementById("check-Phone").innerHTML =
          "Phone invaid, must have 10 number and valid format";
      }
    }
  };
  const handleChange = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    Validation(name, value);
    await setUser({ ...user, [name]: value });
  };
  const [address, setAddress] = React.useState({
    Home_number: "",
    Street: "",
    City: "",
    Province: "",
  });
  const handleChange1 = (e) => {
    e.preventDefault();
    const { Home_number, Street, City, Province } = address;
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
    const Address = Home_number + ", " + Street + ", " + Province + ", " + City;
    setUser({ ...user, Address });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-ID"
                  name="ID"
                  required
                  fullWidth
                  label="ID"
                  onChange={handleChange}
                  autoFocus
                />
                <Alert severity="info" className="mt-2" id="check-ID"></Alert>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="Name"
                  onChange={handleChange}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  type="email"
                  label="Email "
                  name="Email"
                  onChange={handleChange}
                  autoComplete="email"
                />
                <Alert
                  severity="info"
                  className="mt-2"
                  id="check-Email"
                ></Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Phone"
                  label="Phone"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="000-000-0001"
                  onChange={handleChange}
                  autoComplete="Phone"
                />
                <Alert
                  severity="info"
                  className="mt-2"
                  id="check-Phone"
                ></Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <Alert
                  severity="info"
                  className="mt-2"
                  id="check-Password"
                ></Alert>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Home_number"
                  label="Home_number"
                  onChange={handleChange1}
                  autoComplete="Address"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Street"
                  label="Street"
                  onChange={handleChange1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="Province"
                  label="Province"
                  onChange={handleChange1}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="City"
                  label="City"
                  onChange={handleChange1}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              fullWidth
              variant="contained"
              id="submit"
              //   disabled={isValid}
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
