import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemIcon,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Public as PublicIcon,
  Home as HomeIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { Auth, API, graphqlOperation } from 'aws-amplify';

import { createPostAndTimeline } from '../graphql/mutations';
import { useHistory } from 'react-router';

import { useAppDispatch } from '../app/hooks';
import { logout } from '../features/user/userSlice';

const drawerWidth = 340;
const MAX_POST_CONTENT_LENGTH = 140;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    position: 'relative',
  },
  drawerPaper: {
    width: drawerWidth,
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  textField: {
    width: drawerWidth,
  },
  list: {
    // overflowWrap: 'break-word',
    width: 300,
  },
}));

export default function Sidebar({ activeListItem }: { activeListItem: string }) {
  const classes = useStyles();
  const history = useHistory();

  const [value, setValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');

  const appDispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (event.target.value.length > MAX_POST_CONTENT_LENGTH) {
      setIsError(true);
      setHelperText((MAX_POST_CONTENT_LENGTH - event.target.value.length).toString());
    } else {
      setIsError(false);
      setHelperText('');
    }
  };

  const onPost = async () => {
    const res = await API.graphql(graphqlOperation(createPostAndTimeline, { content: value }));

    console.log(res);
    setValue('');
  };

  const signOut = () => {
    Auth.signOut()
      .then((data) => {
        console.log(data);
        appDispatch(logout());
        window.location.href = '/';
      })
      .catch((err) => console.log(err));
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button
          selected={activeListItem === 'Home'}
          onClick={() => {
            history.push('/');
          }}
          key="home"
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'global-timeline'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/global-timeline');
            });
          }}
          key="global-timeline"
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText primary="Global Timeline" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'search'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('search');
            });
          }}
          key="search"
        >
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
        <ListItem
          button
          selected={activeListItem === 'profile'}
          onClick={() => {
            Auth.currentAuthenticatedUser().then((user) => {
              history.push('/' + user.username);
            });
          }}
          key="profile"
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem key="post-input-field">
          <ListItemText
            primary={
              <TextField
                error={isError}
                helperText={helperText}
                id="post-input"
                label="Type your post!"
                multiline
                rowsMax="8"
                variant="filled"
                value={value}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            }
          />
        </ListItem>
        <ListItem key="post-button">
          <ListItemText
            primary={
              <Button
                variant="contained"
                color="primary"
                disabled={isError}
                onClick={onPost}
                fullWidth
              >
                Post
              </Button>
            }
          />
        </ListItem>
        <ListItem key="logout">
          <ListItemText
            primary={
              <Button variant="outlined" onClick={signOut} fullWidth>
                Sign out
              </Button>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
}
