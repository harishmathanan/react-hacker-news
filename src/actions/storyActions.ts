import Config from '../config';
import { IStory } from '../types';
import {
  STORY_FETCH_ACTION,
  STORY_ERROR_ACTION,
  STORY_LIST_ACTION
} from './types';
import { Dispatch } from 'redux';


const storyFetchAction = () => {
  return {
    type: STORY_FETCH_ACTION
  };
};

const storyErrorAction = (error: string) => {
  return {
    type: STORY_ERROR_ACTION,
    error
  };
};

const storyListAction = (data: IStory[]) => {
  return {
    type: STORY_LIST_ACTION,
    data
  };
};


export const getAllStories = () => {
  return (dispatch: Dispatch<any>) => {
    dispatch(storyFetchAction());

    fetch(`${Config.serverUrl}/v0/newstories.json`)
    .then((response: Response) => {
      if (!response.ok) {
        dispatch(storyErrorAction(response.statusText));

      } else {
        // response data returns an array of numbers that represent the story ids.
        response.json().then((data: any) => {
          const storyLimit = data.slice(0, 15); // limit the items return to 15

          Promise
            .all(storyLimit.map((storyId: number) => {
              // For each story id, fetch and retrieve story data
              fetch(`${Config.serverUrl}/v0/item/${storyId}.json`);
          }))
            .then((stories: any) => {
              dispatch(storyListAction(data));
            })
            .catch((error: Error) => {
              dispatch(storyErrorAction(error.message));
            });
        });
      }
    })
    .catch((error: Error) => {
      dispatch(storyErrorAction(error.message));
    });
  };
};
