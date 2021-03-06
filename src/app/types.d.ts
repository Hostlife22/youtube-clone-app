interface IThumb {
  height: number;
  width: number;
  url: string;
}

interface ISnippet {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  defaultAudioLanguage: string;
  description: string;
  liveBroadcastContent: string;
  localized: {
    description: string;
    title: string;
  };
  publishedAt: string;
  tags: string[];
  thumbnails: {
    default: IThumb;
    high: IThumb;
    medium: IThumb;
  };
  title: string;
}
interface IStatistics {
  commentCount: string;
  favoriteCount: string;
  likeCount: string;
  viewCount: string;
}

export interface IVideo {
  contentDetaild: {
    caption: string;
    definition: string;
    dimension: string;
    duration: string;
    licensedContent: boolean;
  };
  etag: string;
  id: string;
  kind: string;
  snippet: ISnippet;
  statistics: IStatistics;
}

export interface IVideos {
  etag: string;
  items: IVideo[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    results: number;
  };
}

export interface IVideoById {
  etag: string;
  id: string;
  kind: string;
  snippet: ISnippet;
  statistics: IStatistics;
}
export interface IVideosById {
  etag: string;
  items: IVideoById[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

interface ISnippetChannel {
  customUrl: string;
  description: string;
  localized: {
    description: string;
    title: string;
  };
  publishedAt: string;
  thumbnails: {
    default: IThumb;
    high: IThumb;
    medium: IThumb;
  };
  title: string;
}

interface IStatisticsChannel {
  hiddenSubscriberCount: boolean;
  subscriberCount: string;
  videoCount: string;
  viewCount: string;
}

export interface IChannel {
  contentDetails: {
    relatedPlaylists: {
      likes: string;
      uploads: string;
    };
  };
  etag: string;
  id: string;
  kind: string;
  snippet: ISnippetChannel;
  statistics: IStatisticsChannel;
}
export interface IChannelDetails {
  etag: string;
  items: IChannel[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
export interface ICommentSnippet {
  authorChannelId: { value: string };
  authorChannelUrl: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  canRate: boolean;
  likeCount: number;
  publishedAt: string;
  textDisplay: string;
  textOriginal: string;
  updatedAt: string;
  videoId: string;
  viewerRating: string;
}
export interface ICommentsSnippet {
  canReply: boolean;
  isPublic: boolean;
  topLevelComment: {
    kind: string;
    etag: string;
    id: string;
    snippet: ICommentSnippet;
  };
  totalReplyCount: number;
  videoId: string;
}
export interface IComment {
  etag: string;
  id: string;
  kind: string;
  snippet: ICommentsSnippet;
}
export interface ICommentData {
  etag: string;
  items: IComment[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface IRelatedSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishTime: string;
  publishedAt: string;
  thumbnails: {
    default: IThumb;
    high: IThumb;
    maxres?: IThumb;
    medium: IThumb;
    standard?: IThumb;
  };
  title: string;
}

export interface IRelatedId {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
  };
  snippet: IRelatedSnippet;
}

export interface ISubscriptionSnippet {
  channelId: string;
  description: string;
  publishedAt: string;
  resourceId: {
    channelId: string;
    kind: string;
  };
  thumbnails: {
    default: IThumb;
    high: IThumb;
    medium: IThumb;
  };
  title: string;
}

export interface ISubscriptionChannel {
  contentDetails: {
    activityType: string;
    newItemCount: number;
    totalItemCount: number;
  };
  etag: string;
  id: string;
  kind: string;
  snippet: ISubscriptionSnippet;
}
export interface ISubscriptionsChannel {
  etag: string;
  items: ISubscriptionChannel[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface IUploadChannelItem {
  contentDetails: {
    relatedPlaylists: { likes: string; uploads: string };
  };
  etag: string;
  id: string;
  kind: string;
}
export interface IUploadChannel {
  etag: string;
  items: IUploadChannelItem[];
  kind: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}

export interface IVideosChannelSnippet {
  channelId: string;
  channelTitle: string;
  description: string;
  playlistId: string;
  position: number;
  publishedAt: string;
  resourceId: { kind: string; videoId: string };
  thumbnails: {
    default: IThumb;
    medium: IThumb;
    high: IThumb;
    standard: IThumb;
    maxres: IThumb;
  };
  title: string;
  videoOwnerChannelId: string;
  videoOwnerChannelTitle: string;
}

export interface IvideoChannel {
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
  etag: string;
  id: string;
  kind: string;
  snippet: IVideosChannelSnippet;
}

export interface IVideosChannel {
  etag: string;
  items: IvideoChannel[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    resultsPerPage: number;
    totalResults: number;
  };
}
