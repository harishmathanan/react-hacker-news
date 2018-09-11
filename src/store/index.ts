import { createStore, combineReducers, applyMiddleware } from 'redux';
import { storyReducers } from '../reducers/storyReducer';
import thunk from 'redux-thunk';


export const configureStore = () => {
  return createStore(
    combineReducers({
      stories: storyReducers
    }),
    applyMiddleware(thunk)
  )
};
