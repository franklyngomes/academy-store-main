import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from 'next/link'; 
import { Cookies } from 'react-cookie';


const pages = [
  {
    name: "Products",
    component: "/cms/list",
  },
  {
    name: "Add Product",
    component: "/cms/create",
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [token, setToken] = React.useState<string | null>(null)
    const cookie = new Cookies()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
     cookie.remove("token")
     setToken(null)
  };
  const showPages = () => {
    return(
      pages.map((page, index) => (
        <MenuItem onClick={handleCloseNavMenu}  key={index}>
           <Link href={page.component} passHref className='no-underline'>
          <Typography  sx={{ textAlign: "center", color: anchorElNav ? "#000" : "#fff"}}>
            {page.name}
          </Typography>
       </Link>
        </MenuItem>
    )
    ))
  }
React.useEffect(() => {
  const savedToken = cookie.get("token")
  setToken(savedToken)
}, [])

  return (
    <AppBar position="static" sx={{ bgcolor: "#002E6E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hooks Project 1.0
          </Typography>

              {token && (
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              sx={{ display: { xs: "block", md: "none"}, color: "#000" }}
            >
                {showPages()}
            </Menu>
          </Box>
              )}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".05rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Hooks App 1.0
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {token && (
                showPages()
            )}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
          {
            token ? <>

            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="" />
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/cms/profile" passHref className='no-underline'>
                  <Typography sx={{ textAlign: "center" }}>Profile</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link href="/" passHref className='no-underline'>
                  <Typography
                    sx={{ textAlign: "center" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
            </> : " "
          }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
