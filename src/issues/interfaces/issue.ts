import { Label } from './label';

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: State;
  locked: boolean;
  assignee: User | null;
  assignees: User[];
  milestone: null;
  comments: number;
  created_at: Date;
  updated_at: Date;
  closed_at: null;
  author_association: AuthorAssociation;
  active_lock_reason: null;
  body: string;
  closed_by: User | null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: null;
  state_reason: null | string;
  draft?: boolean;
  pull_request?: PullRequest;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: Type;
  user_view_type: UserViewType;
  site_admin: boolean;
}

export enum Type {
  User = 'User',
}

export enum UserViewType {
  Public = 'public',
}

export enum AuthorAssociation {
  Collaborator = 'COLLABORATOR',
  Contributor = 'CONTRIBUTOR',
  Member = 'MEMBER',
  None = 'NONE',
}

export interface PullRequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null;
}

export interface Reactions {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
}

export enum State {
  All = '',
  Closed = 'closed',
  Open = 'open',
}
