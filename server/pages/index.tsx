import {
    AppBar,
    Button,
    Toolbar, 
    Typography, 
    Box,
  } from '@mui/material'
  import Link from 'next/link'
  
  export default function Home() {
  
    const handleLogin = async () => {};
  
    return (
      <AppBar sx={{
        width: '100%',
        height: '100%',
        backgroundImage: `url("https://images.pexels.com/photos/3760323/pexels-photo-3760323.jpeg?auto=compress&cs=tinysrgb&w=600")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>

        <nav style = {{}}>
          <Toolbar sx = {{
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#B57543',      
            }}>
  
            <Typography style = {{
              marginLeft: '40px',
              padding: 0,
              fontSize: '60px',
              color: 'white',
            }}>Library</Typography>
  
            <Box sx = {{}}>
              <Link href="/menu" style = {{
                color: 'white',
                fontSize: '24px',
                textDecoration: 'none', 
                marginRight: '16px',
              }}>Menu</Link>

              <Button href="/login" variant="contained" onClick={handleLogin} 
              style = {{ 
                marginRight: '48px', 
                color: 'black', 
                backgroundColor: '#EBEBEB' 
                }}>Login</Button>
            </Box>
  
          </Toolbar>
        </nav>

        <div style = {{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '72px',
          }}>
          <h1>Welcome to Library</h1>
        </div>
      
      </AppBar>

    )  
  }