import React, { useState, useEffect } from 'react';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useParams } from 'react-router';
import { Button } from '@material-ui/core';

import { CognitoUserInterface } from '@aws-amplify/ui-components';
import { getFollowRelationship, listPostsSortedByTimestamp } from '../graphql/queries';
import { onCreatePost } from '../graphql/subscriptions';
import { createFollowRelationship, deleteFollowRelationship } from '../graphql/mutations';
import PostList from '../components/PostList';
import Sidebar from './Sidebar';

import {
  CreateFollowRelationshipMutation,
  CreateFollowRelationshipMutationVariables,
  DeleteFollowRelationshipMutation,
  DeleteFollowRelationshipMutationVariables,
  GetFollowRelationshipQuery,
  GetFollowRelationshipQueryVariables,
  ListPostsQueryVariables,
  ListPostsSortedByTimestampQuery,
  OnCreatePostSubscription,
} from '../API';
import { Observable } from 'zen-observable-ts';
import { GraphQLResult } from '@aws-amplify/api-graphql';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { updateUser, selectUsername } from '../features/user/userSlice';
import {
  initialQuery,
  additionalQuery,
  subscriptionPosts,
  fetchNextToken,
  changeLoadingStatus,
  selectPosts,
  selectNextToken,
  selectIsLoading,
} from '../features/posts/postsSlice';

type ActionType = 'INITIAL_QUERY' | 'ADDITIONAL_QUERY';

type PostSubscriptionEvent = { value: { data: OnCreatePostSubscription } };

const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

export default function PostsBySpecifiedUser() {
  const { userId }: { userId: string } = useParams();

  const [isFollowing, setIsFollowing] = useState(false);

  const appDispatch = useAppDispatch();
  const currentUsername = useAppSelector(selectUsername);
  const posts = useAppSelector(selectPosts);
  const nextToken = useAppSelector(selectNextToken);
  const isLoading = useAppSelector(selectIsLoading);

  const getPosts = async (type: ActionType, nextToken: string | null = null) => {
    const res = (await API.graphql(
      graphqlOperation(listPostsSortedByTimestamp, {
        type: 'post',
        sortDirection: 'DESC',
        limit: 20, //default = 10
        nextToken: nextToken,
      } as ListPostsQueryVariables),
    )) as GraphQLResult<ListPostsSortedByTimestampQuery>;
    console.log(res);
    if (res.data?.listPostsSortedByTimestamp?.items) {
      if (type === 'INITIAL_QUERY') {
        appDispatch(initialQuery(res.data.listPostsSortedByTimestamp.items));
      } else {
        appDispatch(additionalQuery(res.data.listPostsSortedByTimestamp.items));
      }
    }

    if (res.data?.listPostsSortedByTimestamp?.nextToken) {
      appDispatch(fetchNextToken(res.data.listPostsSortedByTimestamp.nextToken));
    }

    appDispatch(changeLoadingStatus(false));
  };

  const getIsFollowing = async ({
    followerId,
    followeeId,
  }: {
    followerId: string;
    followeeId: string;
  }) => {
    const res = (await API.graphql(
      graphqlOperation(getFollowRelationship, {
        followeeId: followeeId,
        followerId: followerId,
      } as GetFollowRelationshipQueryVariables),
    )) as GraphQLResult<GetFollowRelationshipQuery>;
    console.log(res);
    if (res.data) {
      return res.data.getFollowRelationship !== null;
    }
    return false;
  };

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    getPosts(ADDITIONAL_QUERY, nextToken);
  };

  const follow = async () => {
    console.log('follow');
    if (currentUsername) {
      const input = {
        followeeId: userId,
        followerId: currentUsername,
        timestamp: Math.floor(Date.now() / 1000),
      };
      const res = (await API.graphql(
        graphqlOperation(createFollowRelationship, {
          input: input,
        } as CreateFollowRelationshipMutationVariables),
      )) as GraphQLResult<CreateFollowRelationshipMutation>;
      if (res.data?.createFollowRelationship) setIsFollowing(true);
      console.log(res);
    }
  };

  const unfollow = async () => {
    console.log('unfollow');
    if (currentUsername) {
      const input = {
        followeeId: userId,
        followerId: currentUsername,
      };
      const res = (await API.graphql(
        graphqlOperation(deleteFollowRelationship, {
          input: input,
        } as DeleteFollowRelationshipMutationVariables),
      )) as GraphQLResult<DeleteFollowRelationshipMutation>;

      if (res.data?.deleteFollowRelationship) setIsFollowing(false);
      console.log(res);
    }
  };

  useEffect(() => {
    const init = async () => {
      const currentUser: CognitoUserInterface = await Auth.currentAuthenticatedUser();

      if (currentUser.username) {
        appDispatch(updateUser(currentUser.username));
        setIsFollowing(
          await getIsFollowing({ followeeId: userId, followerId: currentUser.username }),
        );
      }

      getPosts(INITIAL_QUERY);
    };
    init();

    let unsubscribe;
    const subscription = API.graphql(graphqlOperation(onCreatePost));
    if (subscription instanceof Observable) {
      const client = subscription.subscribe({
        next: (msg: PostSubscriptionEvent) => {
          const post = msg.value.data.onCreatePost;
          if (post) {
            if (post.owner !== userId) return;
            appDispatch(subscriptionPosts(post));
          }
        },
      });
      unsubscribe = () => {
        client.unsubscribe();
      };
    }
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Sidebar activeListItem="profile" />
      <PostList
        isLoading={isLoading}
        posts={posts}
        getAdditionalPosts={getAdditionalPosts}
        listHeaderTitle={userId}
        listHeaderTitleButton={
          currentUsername &&
          userId !== currentUsername &&
          (isFollowing ? (
            <Button variant="contained" color="primary" onClick={unfollow}>
              Following
            </Button>
          ) : (
            <Button variant="outlined" color="primary" onClick={follow}>
              Follow
            </Button>
          ))
        }
      />
    </React.Fragment>
  );
}
