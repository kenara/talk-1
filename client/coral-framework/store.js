import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from './reducers';
import {client} from './client';

export default createStore(
  combineReducers({
    ...mainReducer,
    apollo: client.reducer()
  }),
  {
    apollo: {
      data: {
        loading: true,
      }
    }
  },
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension && window.devToolsExtension()
  )
);
