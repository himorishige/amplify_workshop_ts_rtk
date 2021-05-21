import React, { useEffect, useCallback } from 'react';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { CognitoUserInterface } from '@aws-amplify/ui-components';

import { listTimelines } from '../graphql/queries';
import { onCreateTimeline } from '../graphql/subscriptions';
import _ from 'lodash';

import PostList from '../components/PostList';
import Sidebar from './Sidebar';

import {
  ListTimelinesQuery,
  ListTimelinesQueryVariables,
  OnCreateTimelineSubscription,
} from '../API';
import { Observable } from 'zen-observable-ts';

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

type PostSubscriptionEvent = { value: { data: OnCreateTimelineSubscription } };

const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

export default function Timeline() {
  const appDispatch = useAppDispatch();
  const currentUsername = useAppSelector(selectUsername);
  const posts = useAppSelector(selectPosts);
  const nextToken = useAppSelector(selectNextToken);
  const isLoading = useAppSelector(selectIsLoading);

  const getPosts = useCallback(
    async (type: ActionType, currentUsername: string, nextToken: string | null = null) => {
      const res = (await API.graphql(
        graphqlOperation(listTimelines, {
          userId: currentUsername,
          sortDirection: 'DESC',
          limit: 20, //default = 10
          nextToken: nextToken,
        } as ListTimelinesQueryVariables),
      )) as GraphQLResult<ListTimelinesQuery>;
      console.log(res);

      if (res.data?.listTimelines?.items) {
        if (type === 'INITIAL_QUERY') {
          appDispatch(initialQuery(_.map(res.data.listTimelines.items, 'post')));
        } else {
          appDispatch(additionalQuery(_.map(res.data.listTimelines.items, 'post')));
        }
      }

      if (res.data?.listTimelines?.nextToken) {
        appDispatch(fetchNextToken(res.data.listTimelines.nextToken));
      }

      appDispatch(changeLoadingStatus(false));
    },
    [appDispatch],
  );

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    if (currentUsername) {
      getPosts(ADDITIONAL_QUERY, currentUsername, nextToken);
    }
  };

  useEffect(() => {
    console.log('init');
    const init = async () => {
      const currentUser: CognitoUserInterface = await Auth.currentAuthenticatedUser();
      if (currentUser.username) {
        appDispatch(updateUser(currentUser.username));

        getPosts(INITIAL_QUERY, currentUser.username);
      }
    };

    init();
  }, [appDispatch, getPosts]);

  useEffect(() => {
    console.log(currentUsername);
    if (!currentUsername) return;
    console.log('make subscription');

    let unsubscribe;
    const subscription = API.graphql(
      graphqlOperation(onCreateTimeline, { userId: currentUsername }),
    );
    if (subscription instanceof Observable) {
      const client = subscription.subscribe({
        next: (msg: PostSubscriptionEvent) => {
          console.log('timeline subscription fired');
          console.log(msg);
          const post = msg?.value?.data?.onCreateTimeline?.post;
          if (post) {
            appDispatch(subscriptionPosts(post));
          }
        },
      });
      unsubscribe = () => {
        client.unsubscribe();
      };
    }

    return unsubscribe;
  }, [appDispatch, currentUsername]);

  return (
    <React.Fragment>
      <Sidebar activeListItem="Home" />
      <PostList
        isLoading={isLoading}
        posts={posts}
        getAdditionalPosts={getAdditionalPosts}
        listHeaderTitle={'Home'}
        listHeaderTitleButton={null}
      />
    </React.Fragment>
  );
}
