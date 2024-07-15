import React from 'react';
import { Typography, List, ListItem, ListItemIcon, IconButton, useTheme } from '@mui/material';
import MyProfileIcon from '@mui/icons-material/AccountCircle'; // Example icons, replace with appropriate icons
import NewGroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallsIcon from '@mui/icons-material/Phone';
import PeopleNearbyIcon from '@mui/icons-material/LocationOn';
import SavedMessageIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import InviteFriendsIcon from '@mui/icons-material/People';
import TelegramFeatureIcon from '@mui/icons-material/Telegram';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../ThemeContext';


const DrawerList = () => {

  const { toggleTheme } = useThemeMode();
  const theme = useTheme();
  return (
    <div sx={{ width: 250, height: '100%', backgroundColor: '#222', color: '#fff' }}>
        <List style={{padding:"20px"}}>

      <ListItem>
      <IconButton onClick={toggleTheme} sx={{ position: 'absolute',  right: 0, }}>
        {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      </ListItem>
    
        <ListItem button>
          <ListItemIcon>
            <MyProfileIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            My Profile
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <NewGroupIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            New Group
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1}}>
            Contacts
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <CallsIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            Calls
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <PeopleNearbyIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            People Nearby
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SavedMessageIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            Saved Messages
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            Settings
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <InviteFriendsIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            Invite Friends
          </Typography>
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <TelegramFeatureIcon />
          </ListItemIcon>
          <Typography variant="h6" component="div" sx={{ p: 1 }}>
            Telegram Feature
          </Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerList;
