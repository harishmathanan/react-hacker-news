export interface IAppState {
  stories: IStoryState
};

export interface IStoryState {
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string | null;
  stories: IStory[];
  story: IStory;
};

export interface IStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
};

