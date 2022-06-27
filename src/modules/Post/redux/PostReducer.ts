import { ActionType, createCustomAction, getType } from 'typesafe-actions';
import { ditcum } from 'models/auth';
import { type } from 'os';
import { toNumber } from 'lodash';
const arr: (number | string)[] = [];

export interface PostState {
  posts?: ditcum[];
}
// export type PostState = [];
export const setPostInfo = createCustomAction('auth/setPostInfo', (data: ditcum[]) => ({
  data,
}));
export const setInputChange = createCustomAction('auth/setInputInfo', (id: string | number, value) => ({
  id,
  value,
}));
const actions = { setPostInfo, setInputChange };
type Action = ActionType<typeof actions>;

export default function reducer(state: PostState['posts'] = [], action: Action) {
  switch (action.type) {
    case getType(setPostInfo): {
      // console.log(123);
      // console.log(action.data);
      // console.log(!state);
      // return [...state, ...action.data];
      if (state !== []) {
        return [...action.data];
      } else {
        const arr: ditcum[] = [];
        state.forEach((post) => {
          const kq = action.data.find((value) => {
            value !== post;
          });
          kq && arr.push(kq);
        });
        // console.log(arr);
        return [...state, ...arr];
      }
    }

    case getType(setInputChange):
      // const arr = [];
      if (
        arr.every((value) => {
          return value != action.id;
        })
      ) {
        arr.push(toNumber(action.id));
        // console.log(arr);
      }
      // arr && console.log(arr);
      // for (let i = 0; i < arr.length; i++) {
      //   state[i].title = action.value;
      //   console.log(state[i]);
      // }
      arr.forEach((value) => {
        // console.log(state[toNumber(value) - 1]);
        state[toNumber(value) - 1].title = action.value;
      });

      return [...state];
    default:
      return state;
  }
}
