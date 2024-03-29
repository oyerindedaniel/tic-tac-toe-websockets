import { GlobalContextReducer, GlobalContextState } from './types';
import { localStorageName } from './constants';

const reducer: GlobalContextReducer = (state, action) => {
  let newState: GlobalContextState = { ...state };
  switch (action.type) {
    case 'SET_USER': {
      newState = {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
      break;
    }
    case 'SET_SOCKET-IO': {
      newState = {
        ...state,
        socketIO: {
          ...state.socketIO,
          isConnected: action.payload
        }
      };
      break;
    }

    default:
      throw new Error(`No such type ${action.type}`);
  }
  localStorage.setItem(localStorageName, JSON.stringify(newState));
  return newState;
};

export default reducer;
