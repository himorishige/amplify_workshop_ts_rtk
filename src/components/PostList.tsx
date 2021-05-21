import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import { useHistory } from 'react-router';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: '100%',
    wordBreak: 'break-all',
    overflow: 'scroll',
    borderRight: '1px solid #37444C',
  },
  alignCenter: {
    textAlign: 'center',
  },
  loader: {
    textAlign: 'center',
    paddingTop: 20,
  },
  maxWidth: {
    width: '100%',
  },
  listHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    backgroundColor: '#15202B',
    borderBottom: '1px solid #37444C',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

type Post = {
  type?: string | undefined;
  id?: string | null | undefined;
  content?: string | undefined;
  owner?: string | null | undefined;
  timestamp?: number | undefined;
} | null;

type Props = {
  isLoading: boolean;
  posts: Post[] | null;
  getAdditionalPosts: () => void;
  listHeaderTitle: string;
  listHeaderTitleButton?: React.ReactNode;
};

export default function PostList({
  isLoading,
  posts,
  getAdditionalPosts,
  listHeaderTitle,
  listHeaderTitleButton,
}: Props) {
  const classes = useStyles();
  return (
    <div className={classes.listRoot}>
      {isLoading ? (
        <div className={classes.loader}>
          <CircularProgress size={25} />
        </div>
      ) : (
        <List disablePadding>
          <ListItem alignItems="flex-start" className={classes.listHeader}>
            <Typography variant="h5" component="h5">
              {listHeaderTitle}
              {listHeaderTitleButton && listHeaderTitleButton}
            </Typography>
          </ListItem>
          {posts &&
            posts.map((post, index) => (
              <span key={index}>
                <PostItem post={post} />
                <Divider component="li" />
              </span>
            ))}
          <ListItem alignItems="flex-start" className={classes.alignCenter} key="loadmore">
            <ListItemText
              primary={
                <Button
                  variant="outlined"
                  onClick={() => getAdditionalPosts()}
                  className={classes.maxWidth}
                >
                  {' '}
                  Read More{' '}
                </Button>
              }
            />
          </ListItem>
        </List>
      )}
    </div>
  );
}

type ItemProps = {
  post: Post;
};

function PostItem({ post }: ItemProps) {
  const classes = useStyles();
  const history = useHistory();
  const now = moment();
  console.log(now);

  const calcTimestampDiff = (timestamp: number) => {
    const scales = ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'];

    for (let i = 0; i < scales.length; i++) {
      const scale = scales[i] as moment.unitOfTime.Diff;
      const diff = moment(now).diff(timestamp * 1000, scale);
      if (diff > 0) return diff + scale.charAt(0);
    }

    return 0 + scales[scales.length - 1].charAt(0);
  };

  return (
    <>
      {post && (
        <ListItem alignItems="flex-start" key={post.id}>
          <ListItemAvatar>
            <div className={classes.clickable} onClick={() => history.push('/' + post.owner)}>
              <Avatar alt={post.owner || ''} src="/" />
            </div>
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                {post.owner}
                <Typography color="textSecondary" display="inline">
                  {' ' + String.fromCharCode(183) + ' ' + calcTimestampDiff(post.timestamp || 0)}
                </Typography>
              </React.Fragment>
            }
            secondary={<Typography color="textPrimary">{post.content}</Typography>}
          />
        </ListItem>
      )}
    </>
  );
}
