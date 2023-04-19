export interface GlobalContextState {
  user: {
    userId: string;
    userName: string;
    userPhotoId: string;
  };
  socketIO: {
    isConnected: boolean;
  };
}

export type GlobalContextActionTypes = 'SET_USER' | 'SET_SOCKET-IO';

export interface GlobalContextAction {
  type: GlobalContextActionTypes;
  payload?: any;
}

export type GlobalContextDispatch = (action: GlobalContextAction) => void;

export type GlobalContextReducer = (
  state: GlobalContextState,
  action: GlobalContextAction
) => GlobalContextState;
