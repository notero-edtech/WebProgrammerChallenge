import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid } from '@mui/material'
import { useState, ChangeEvent, MouseEvent } from 'react'
import Link from 'next/link'
import axios from 'axios'

const Login = () => {

  const [email, setEmail] = useState<string>(""); // Declare types for email and password
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => { // Declare type for event argument
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('/api/login', { email, password });
      const authToken = response.data.authToken;
      localStorage.setItem('authToken', authToken);
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, display error message to the user, etc.
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => { // Declare type for event argument
    setEmail(e.target.value); // Update email state with input value
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => { // Declare type for event argument
    setPassword(e.target.value); // Update password state with input value
  };

  return (
    <>
      <Container maxWidth = "xs">
        <CssBaseline />
        <Box
          sx = {{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx = {{ m: 1, bgcolor: "primary.light" }}>
          </Avatar>

          <Typography variant="h5">Login</Typography>
          
          <Box sx = {{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id = "email"
              label = "Email Address"
              name = "email"
              autoFocus
              value = {email}
              onChange = {handleEmailChange}
            />

            <TextField
              margin = "normal"
              required
              fullWidth
              id = "password"
              name = "password"
              label = "Password"
              type = "password"
              value = {password}
              onChange = {handlePasswordChange}
            />

            <Button
              fullWidth
              variant = "contained"
              sx = {{ mt: 3, mb: 2 }}
              onClick = {handleLogin}
            >
              Login
            </Button>

            <Grid container justifyContent = {"flex-end"}>
              <Grid item>
                <Link href = "/register">Don't have an account? Register</Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
