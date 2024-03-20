

import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import ideas from '../../assets/howlsPFP.jpeg'
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import TransitionsModal from '../../components/modal/modal';
import AddIcon from '@mui/icons-material/Add';
const drawerWidth = 240;

const  Dashboard=(props) =>{
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const UpperIcons = [<AddIcon/>,<HomeIcon/>, <MailIcon/>, <FavoriteIcon/>, <LogoutIcon/>]
  const lowerIcons = [< DeleteIcon/>]
  const lowerItemHandler=(text)=>{
    handleOpen();
  }
  const upperItemHandler=(text)=>{
   if(text==='Logout'){
    localStorage.clear();
}
   if(text==='Your Card'){
    navigate('/card')
   }
   if(text==='Create'){
    navigate('/dashboard')
   }
  }
  const drawer = (
    <div>
      <img src={ideas} alt='logo' style={{
          height: '12vh',
          borderRadius: '100%',
          margin:'20px 60px'
      }}/>
      <Typography variant='h5' sx={{ml:6, mb:2}}>
      {`${localStorage.getItem('name')}`}
      </Typography>
      <Divider />
      <List>
        {['Create','Feed', 'Your Card', 'Favourite', 'Logout'].map((text, index) => (
          <ListItem key={text} disablePadding >
            <ListItemButton onClick={()=>upperItemHandler(text)}>
              <ListItemIcon>
                {UpperIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Delete Account'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={()=>lowerItemHandler(text)}>
              <ListItemIcon>
                {lowerIcons[index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
    <TransitionsModal open={open} handleClose={handleClose} handleOpen={handleOpen}/> 
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` ,},
        }}
      >
        <Toolbar sx={{bgcolor:'#5783db'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      {props.children}
      </Box>
    </Box>
    </>
  );
}

export default  Dashboard;