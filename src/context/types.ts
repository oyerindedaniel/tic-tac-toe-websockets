import { User } from '../../types';

export interface GlobalContextState {
  user: Partial<User>;
  socketIO: {
    isConnected: boolean;
  };
}

export type GlobalContextActionTypes = 'SET_USER' | 'SET_SOCKET-IO';

export interface GlobalContextAction {
  type: GlobalContextActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export type GlobalContextDispatch = (action: GlobalContextAction) => void;

export type GlobalContextReducer = (
  state: GlobalContextState,
  action: GlobalContextAction
) => GlobalContextState;
