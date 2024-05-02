import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import './BusOwnerHeader.css'


function BusOwnerHeader() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
  return (
    <div>
     <div>
         <AppBar position="static" className="navbar">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img className='logo ' src="https://i.postimg.cc/8z0KPDs6/13a15b0b31789ed21fc556c11f01cd04-removebg-preview.png" alt="" />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "White",
                textDecoration: "none",
              }}
            >
              TRANSITEASE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="Black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Listing</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Blog</Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center"><a h>About</a></Typography>
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TRANSITEASE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">Home</Typography>
                </MenuItem>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">Listing</Typography>
                </MenuItem>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">Blog</Typography>
                </MenuItem>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">About</Typography>
                </MenuItem>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <MenuItem>
                  <Typography textAlign="center">Contact</Typography>
                </MenuItem>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                   <MenuItem>
                  <Typography textAlign="center"><Link to={"/profile"}>Profile</Link></Typography>
                </MenuItem>
                <MenuItem >
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>   
    </div>
  )
}

export default BusOwnerHeader