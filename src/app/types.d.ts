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
  statistics: {
    commentCount: string;
    favoriteCount: string;
    likeCount: string;
    viewCount: string;
  };
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
