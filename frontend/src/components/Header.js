import React, { useState, useEffect } from "react";
import logo from "../logo.png";

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import { QueryClient, useQuery, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "40px",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  
  const queryClient = useQueryClient();

  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const browseTo = (route) => {
      history.push(route);
      handleClose();
  }

  const performLogout = () => {
    localStorage.clear();
    queryClient.resetQueries();
    handleClose();
  }

  const { data, isError } = useQuery('session', api.user.me, {retry: false});

  const session = data || {};
  const hasSession = !isError && !!session?.id;

  useEffect(() => {
    //every session change, do not keep menu open!
    handleClose();
  }, [hasSession]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={() => browseTo('/welcome')}>
          <img src={logo} className={classes.logo} alt="PowerList App" />
        </IconButton>
        <Typography variant="h6" color="inherit">
          PowerList App
        </Typography>

        <div className={classes.grow} />

        {!!hasSession ? (
          <div>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <Avatar alt={session.name} src={session.picture} />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={open}
              onClose={handleClose}>
              <MenuItem onClick={() => browseTo('/list')}>Lista de Tarefas</MenuItem>
              <MenuItem onClick={() => browseTo('/profile')}>Perfil</MenuItem>
              <MenuItem onClick={() => performLogout()}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button onClick={() => browseTo('/login')} color="inherit" type="button">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
