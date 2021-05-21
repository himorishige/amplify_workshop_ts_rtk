/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Post = {
  __typename: "Post",
  type?: string,
  id?: string | null,
  content?: string,
  owner?: string | null,
  timestamp?: number,
};

export type DeletePostInput = {
  id: string,
};

export type ModelPostConditionInput = {
  type?: ModelStringInput | null,
  content?: ModelStringInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type CreateFollowRelationshipInput = {
  followeeId: string,
  followerId: string,
  timestamp: number,
};

export type ModelFollowRelationshipConditionInput = {
  timestamp?: ModelIntInput | null,
  and?: Array< ModelFollowRelationshipConditionInput | null > | null,
  or?: Array< ModelFollowRelationshipConditionInput | null > | null,
  not?: ModelFollowRelationshipConditionInput | null,
};

export type FollowRelationship = {
  __typename: "FollowRelationship",
  followeeId?: string,
  followerId?: string,
  timestamp?: number,
};

export type DeleteFollowRelationshipInput = {
  followeeId: string,
  followerId: string,
};

export type CreatePostInput = {
  type: string,
  id?: string | null,
  content: string,
  owner?: string | null,
  timestamp: number,
};

export type CreateTimelineInput = {
  userId: string,
  timestamp: number,
  postId: string,
};

export type ModelTimelineConditionInput = {
  postId?: ModelIDInput | null,
  and?: Array< ModelTimelineConditionInput | null > | null,
  or?: Array< ModelTimelineConditionInput | null > | null,
  not?: ModelTimelineConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Timeline = {
  __typename: "Timeline",
  userId?: string,
  timestamp?: number,
  postId?: string,
  post?: Post,
};

export type ModelPostFilterInput = {
  type?: ModelStringInput | null,
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelTimelineFilterInput = {
  userId?: ModelIDInput | null,
  timestamp?: ModelIntInput | null,
  postId?: ModelIDInput | null,
  and?: Array< ModelTimelineFilterInput | null > | null,
  or?: Array< ModelTimelineFilterInput | null > | null,
  not?: ModelTimelineFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelTimelineConnection = {
  __typename: "ModelTimelineConnection",
  items?:  Array<Timeline | null > | null,
  nextToken?: string | null,
};

export type SearchablePostFilterInput = {
  type?: SearchableStringFilterInput | null,
  id?: SearchableIDFilterInput | null,
  content?: SearchableStringFilterInput | null,
  owner?: SearchableStringFilterInput | null,
  timestamp?: SearchableIntFilterInput | null,
  and?: Array< SearchablePostFilterInput | null > | null,
  or?: Array< SearchablePostFilterInput | null > | null,
  not?: SearchablePostFilterInput | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchablePostSortInput = {
  field?: SearchablePostSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchablePostSortableFields {
  type = "type",
  id = "id",
  content = "content",
  owner = "owner",
  timestamp = "timestamp",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchablePostConnection = {
  __typename: "SearchablePostConnection",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
  total?: number | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelFollowRelationshipFilterInput = {
  followeeId?: ModelIDInput | null,
  followerId?: ModelIDInput | null,
  timestamp?: ModelIntInput | null,
  and?: Array< ModelFollowRelationshipFilterInput | null > | null,
  or?: Array< ModelFollowRelationshipFilterInput | null > | null,
  not?: ModelFollowRelationshipFilterInput | null,
};

export type ModelFollowRelationshipConnection = {
  __typename: "ModelFollowRelationshipConnection",
  items?:  Array<FollowRelationship | null > | null,
  nextToken?: string | null,
};

export type CreatePostAndTimelineMutationVariables = {
  content?: string,
};

export type CreatePostAndTimelineMutation = {
  createPostAndTimeline?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type DeletePostMutationVariables = {
  input?: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type CreateFollowRelationshipMutationVariables = {
  input?: CreateFollowRelationshipInput,
  condition?: ModelFollowRelationshipConditionInput | null,
};

export type CreateFollowRelationshipMutation = {
  createFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type DeleteFollowRelationshipMutationVariables = {
  input?: DeleteFollowRelationshipInput,
  condition?: ModelFollowRelationshipConditionInput | null,
};

export type DeleteFollowRelationshipMutation = {
  deleteFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type CreatePostMutationVariables = {
  input?: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type CreateTimelineMutationVariables = {
  input?: CreateTimelineInput,
  condition?: ModelTimelineConditionInput | null,
};

export type CreateTimelineMutation = {
  createTimeline?:  {
    __typename: "Timeline",
    userId: string,
    timestamp: number,
    postId: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null,
  } | null,
};

export type GetPostQueryVariables = {
  id?: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetTimelineQueryVariables = {
  userId?: string,
  timestamp?: number,
};

export type GetTimelineQuery = {
  getTimeline?:  {
    __typename: "Timeline",
    userId: string,
    timestamp: number,
    postId: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null,
  } | null,
};

export type ListTimelinesQueryVariables = {
  userId?: string | null,
  timestamp?: ModelIntKeyConditionInput | null,
  filter?: ModelTimelineFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTimelinesQuery = {
  listTimelines?:  {
    __typename: "ModelTimelineConnection",
    items?:  Array< {
      __typename: "Timeline",
      userId: string,
      timestamp: number,
      postId: string,
      post?:  {
        __typename: "Post",
        type: string,
        id?: string | null,
        content: string,
        owner?: string | null,
        timestamp: number,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPostsSortedByTimestampQueryVariables = {
  type?: string | null,
  timestamp?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsSortedByTimestampQuery = {
  listPostsSortedByTimestamp?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type ListPostsBySpecificOwnerQueryVariables = {
  owner?: string | null,
  timestamp?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsBySpecificOwnerQuery = {
  listPostsBySpecificOwner?:  {
    __typename: "ModelPostConnection",
    items?:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type SearchPostsQueryVariables = {
  filter?: SearchablePostFilterInput | null,
  sort?: SearchablePostSortInput | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
};

export type SearchPostsQuery = {
  searchPosts?:  {
    __typename: "SearchablePostConnection",
    items?:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null > | null,
    nextToken?: string | null,
    total?: number | null,
  } | null,
};

export type GetFollowRelationshipQueryVariables = {
  followeeId?: string,
  followerId?: string,
};

export type GetFollowRelationshipQuery = {
  getFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type ListFollowRelationshipsQueryVariables = {
  followeeId?: string | null,
  followerId?: ModelIDKeyConditionInput | null,
  filter?: ModelFollowRelationshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListFollowRelationshipsQuery = {
  listFollowRelationships?:  {
    __typename: "ModelFollowRelationshipConnection",
    items?:  Array< {
      __typename: "FollowRelationship",
      followeeId: string,
      followerId: string,
      timestamp: number,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    content: string,
    owner?: string | null,
    timestamp: number,
  } | null,
};

export type OnCreateTimelineSubscriptionVariables = {
  userId?: string,
};

export type OnCreateTimelineSubscription = {
  onCreateTimeline?:  {
    __typename: "Timeline",
    userId: string,
    timestamp: number,
    postId: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      content: string,
      owner?: string | null,
      timestamp: number,
    } | null,
  } | null,
};

export type OnCreateFollowRelationshipSubscription = {
  onCreateFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};

export type OnDeleteFollowRelationshipSubscription = {
  onDeleteFollowRelationship?:  {
    __typename: "FollowRelationship",
    followeeId: string,
    followerId: string,
    timestamp: number,
  } | null,
};
