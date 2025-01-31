import * as React from "react";
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
import Link from "next/link";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { useUserStore } from "@/store/store";

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
  const {token, setToken, user, setUser} = useUserStore()
  const [cookies, setCookie, removeCookie] = useCookies()

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
    console.log("Before logout:", cookies.token); // Log the token before removal
    removeCookie("token", { path: "/" }); // Make sure path is specified if needed
    console.log("After logout:", cookies.token); // Log after removal to ensure it's removed
    setToken(""); // Update state
    toast.success("Logged out successfully")
  };
  const showPages = () => {
    return pages.map((page, index) => (
      <MenuItem onClick={handleCloseNavMenu} key={index}>
        <Link href={page.component} passHref className="no-underline">
          <Typography
            sx={{ textAlign: "center", color: anchorElNav ? "#000" : "#fff" }}
          >
            {page.name}
          </Typography>
        </Link>
      </MenuItem>
    ));
  };

  React.useEffect(() => {
    if(cookies.token){
      setToken(cookies.token)
      console.log(cookies.token)
    }else{
      setToken("")
    }
  }, [cookies.token, setToken, setUser])
  return (
    <AppBar position="static" sx={{ bgcolor: "#002E6E" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NextJS Project 1.0
          </Typography>
              {
                cookies.token ? 
                <>
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
                sx={{ display: { xs: "block", md: "none" }, color: "#000" }}
                >
                {showPages()}
              </Menu>
            </Box>
                </>
              : ""
              }
          <Typography
            variant="h5"
            noWrap
            component="a"
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
            NextJS Project 1.0
          </Typography>
          {
            cookies.token ? 
            <>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {showPages()}
          </Box> 
          <Box sx={{ flexGrow: 0 }}>
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
                    <Link href="/cms/profile" passHref className="no-underline">
                      <Typography sx={{ textAlign: "center" }}>
                        Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/auth/login" passHref className="no-underline">
                      <Typography
                        sx={{ textAlign: "center" }}
                        onClick={handleLogout}
                      >
                        Logout
                      </Typography>
                      </Link>
                  </MenuItem>
                </Menu>
          </Box>
            </>
            : ""
            }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
