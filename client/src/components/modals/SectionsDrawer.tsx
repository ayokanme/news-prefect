import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { SectionsDrawerProps, SectionsDrawerState } from '../../interfaces';

class SectionsDrawer extends React.Component<SectionsDrawerProps, SectionsDrawerState>{
  constructor(props: SectionsDrawerProps) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.fetchSectionArticles = this.fetchSectionArticles.bind(this);
  }

  toggleDrawer() {
    this.props.drawerToggler();
  }

  fetchSectionArticles(section: string) {
    this.props.getSectionArticles(section);
    this.toggleDrawer();
  }

  render() {

    return (
      <div>
        <Drawer
          anchor="right"
          open={this.props.isOpen}
          onClose={this.toggleDrawer}
        >
          <Box role="Right Side Navigation Bar">
            <List>
              {
                this.props.sections.map(sectionItem => {
                  return (
                    <ListItem
                      button
                      key={sectionItem.section}
                      onClick={() => this.fetchSectionArticles(sectionItem.section)}
                      component={Link} to={`/sections/${encodeURIComponent(sectionItem.section)}`}
                    >
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
