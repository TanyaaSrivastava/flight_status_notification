import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FlightIcon from '@mui/icons-material/Flight';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">Menu</ListSubheader>}
    >
      <ListItem button onClick={() => onSelect('updateFlightStatus')}>
        <ListItemIcon>
          <FlightIcon />
        </ListItemIcon>
        <ListItemText primary ="Update Flight Status" />
      </ListItem>
    </List>
  );
};

export default Sidebar;
