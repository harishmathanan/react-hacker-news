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
        // resolves to an array of story id's
        response.json().then((data: any) => {
          const limitData = data.slice(0, 15); // limit the array to 15 stories

          Promise
            .all(limitData.map((storyId: number) => {
              // retrieve story object for each id
              return fetch(`${Config.serverUrl}/v0/item/${storyId}.json`);
            }))
            .then((rawResponses: any) => {
              Promise
                .all(rawResponses.map((value: any) => {
                  return value.json();
                }))
                .then((stories: any) => {
                  dispatch(storyListAction(stories));
                })
            })
        })
      })
      .catch((error: Error) => {
        dispatch(storyErrorAction(error.message));
      });
  };
};
