import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';
import PostReducer, { PostState } from 'modules/auth/components/Post/redux/PostReducer';
export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  posts: PostState;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    posts: PostReducer,
  });
}
