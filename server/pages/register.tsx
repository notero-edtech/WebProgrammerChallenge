import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { useState, ChangeEvent  } from 'react'
import Link from 'next/link'

const Register = () => {

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {};

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx = {{
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}

        >
          <Avatar sx = {{ m: 1, bgcolor: "primary.light" }}>
          </Avatar>

          <Typography variant="h5">Register</Typography>

          <Box sx = {{ mt: 3 }}>
            <Grid container spacing = {2}>
              <Grid item xs = {12}>
                <TextField
                  name = "name"
                  required
                  fullWidth
                  id = "name"
                  label = "Name"
                  autoFocus
                  value = {name}
                  onChange = {(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs = {12}>
                <TextField
                  required
                  fullWidth
                  id = "email"
                  label = "Email Address"
                  name = "email"
                  value = {email}
                  onChange = {(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs = {12}>
                <TextField
                  required
                  fullWidth
                  name = "password"
                  label = "Password"
                  type = "password"
                  id = "password"
                  value = {password}
                  onChange = {(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            <Button
              fullWidth
              variant="contained"
              sx = {{ mt: 3, mb: 2 }}
              onClick={handleRegister}
            >
              Register
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href = "/login">Already have an account? Login</Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;