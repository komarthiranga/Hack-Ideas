import AppBar from "@mui/material/AppBar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { styled } from '@mui/material/styles';
import EnhancedTable from '../Components/table';
import { Grid } from "@mui/material";

const theme = createTheme();
const Hackathons: React.FC<{isAuthenticated: boolean;}> = ({isAuthenticated}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate('/');
    dispatch(authActions.logout());
  };

  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  if(!isAuthenticated && !localStorage.getItem('hack-auth')) {
   return (<Div>{"Your not authorized to access this page."}</Div>);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="absolute">
        <Toolbar
          sx={{ flexWrap: 'wrap' }}
        >
          <EngineeringIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Hack Ideas
          </Typography>
          <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={1} style={{padding: '80px 10px'}}>
        <Grid item xs={12}>
           <EnhancedTable />
        </Grid>
      </Grid>  

    </ThemeProvider> 
  );
};

export default Hackathons;
