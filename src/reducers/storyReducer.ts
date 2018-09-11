import {
  STORY_FETCH_ACTION,
  STORY_ERROR_ACTION,
  STORY_LIST_ACTION
} from '../actions/types';

const initialState = {
  isFetching: false,
  isError: false,
  isSuccess: false,
  message: '',
  stories: [],
  story: null
};

export const storyReducers = (state = initialState, action: any) => {
  switch (action.type) {
    case STORY_FETCH_ACTION:
      return {
        ...state,
        isFetching: true,
        isError: false,
        isSuccess: false
      };

    case STORY_ERROR_ACTION:
      return {
        ...state,
        isFetching: false,
        isError: true,
        isSuccess: false,
        message: action.error
      };

    case STORY_LIST_ACTION:
      return {
        ...state,
        isFetching: false,
        isError: false,
        isSuccess: true,
        message: '',
        stories: action.data
      };

    default:
      return state;
  }
};
