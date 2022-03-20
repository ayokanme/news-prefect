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

    return (
      <div>
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
                this.props.sections.map(sectionItem => {
                  return (
                    <ListItem button key={sectionItem.section}>
                      <ListItemText primary={sectionItem.display_name} />
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
