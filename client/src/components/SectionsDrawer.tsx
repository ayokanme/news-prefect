import React from 'react';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { SectionsDrawerProps, SectionsDrawerState } from '../interfaces';

class SectionsDrawer extends React.Component<SectionsDrawerProps, SectionsDrawerState>{
  constructor(props: SectionsDrawerProps) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.props.drawerToggler();
  }

  render() {

    const sections = [ "Admin", "Arts", "Automobiles", "Books", "Briefing", "Business", "Climate", "Corrections", "Crosswords & GamesCrosswords & Games", "Admin", "Arts", "Automobiles", "Books", "Briefing", "Business", "Climate", "Corrections", "Crosswords & Games" ];

    return (
      <div /* style={{ display: 'inline-flex' }} */>
        <Drawer
          anchor="right"
          open={this.props.isOpen}
          onClose={this.toggleDrawer}
        >
          <Box
            /* sx={{ width: '30%' }} */
            // onClick={this.toggleDrawer}
            // onKeyDown={this.toggleDrawer}
            role="Right Side Navigation Bar"
          >
            <List>
              {
                sections.map(section => {
                  return (
                    <ListItem button key={section}>
                      <ListItemText primary={section} />
                    </ListItem>
                  );
                })
              }
            </List>
          </Box>
        </Drawer>
      </div>
    );
  }
}

export default SectionsDrawer;
