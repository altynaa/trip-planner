import React, {useState} from 'react';
import {Avatar, Box, Menu, MenuItem} from '@mui/material';
import {useRouter} from "next/router";
import {useAppDispatch} from "@/app/hooks";
import {logout} from "@/features/users/usersThunks";

const UsersMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await router.push('/');
  };

  return (
    <>
      <Box sx={{display: "flex"}}
           onClick={handleClick}
           color="inherit"
      >
        <Avatar alt={"Avatar"} src={""}/>
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="main-nav_list"
      >
        <MenuItem onClick={() => router.push('trips/myTrips')} className="main-nav_item">My Trips</MenuItem>
        <MenuItem onClick={() => router.push('/trips/newTrip')}>New Trip</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UsersMenu;