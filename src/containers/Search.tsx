import React, { useState } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

import { Button, TextField } from '@material-ui/core';

import PostList from '../components/PostList';
import Sidebar from './Sidebar';
import { SearchPostsQuery, SearchPostsQueryVariables } from '../API';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  initialQuery,
  additionalQuery,
  fetchNextToken,
  changeLoadingStatus,
  selectPosts,
  selectNextToken,
  selectIsLoading,
} from '../features/posts/postsSlice';

type ActionType = 'INITIAL_QUERY' | 'ADDITIONAL_QUERY';

const INITIAL_QUERY = 'INITIAL_QUERY';
const ADDITIONAL_QUERY = 'ADDITIONAL_QUERY';

export default function Search() {
  const [query, setQuery] = useState('');

  const appDispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const nextToken = useAppSelector(selectNextToken);
  const isLoading = useAppSelector(selectIsLoading);

  const searchPosts = async (type: ActionType, nextToken: string | null = null) => {
    console.log('searchPosts called: ' + query);
    if (query === '') return;
    const res = (await API.graphql(
      graphqlOperation(searchPostsGql, {
        filter: { content: { matchPhrase: query } },
        limit: 20,
        nextToken: nextToken,
      } as SearchPostsQueryVariables),
    )) as GraphQLResult<SearchPostsQuery>;
    console.log(res);

    if (res.data?.searchPosts?.items) {
      if (type === 'INITIAL_QUERY') {
        appDispatch(initialQuery(res.data.searchPosts.items));
      } else {
        appDispatch(additionalQuery(res.data.searchPosts.items));
      }
    }

    if (res.data?.searchPosts?.nextToken) {
      appDispatch(fetchNextToken(res.data.searchPosts.nextToken));
    }

    appDispatch(changeLoadingStatus(false));
  };

  const getAdditionalPosts = () => {
    if (nextToken === null) return; //Reached the last page
    searchPosts(ADDITIONAL_QUERY, nextToken);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <React.Fragment>
      <Sidebar activeListItem="search" />
      <PostList
        isLoading={isLoading}
        posts={posts}
        getAdditionalPosts={getAdditionalPosts}
        listHeaderTitle={'Search'}
        listHeaderTitleButton={
          <React.Fragment>
            <TextField
              label="Enter Keywords"
              multiline
              rowsMax="3"
              variant="filled"
              value={query}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                searchPosts(INITIAL_QUERY);
              }}
              fullWidth
            >
              Search
            </Button>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}

export const searchPostsGql = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostFilterInput
    $sort: SearchablePostSortInput
    $limit: Int
    $nextToken: String
  ) {
    searchPosts(filter: $filter, sort: $sort, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        content
        owner
      }
      nextToken
      total
    }
  }
`;
