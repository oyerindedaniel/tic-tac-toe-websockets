export interface GlobalContextState {
  user: {
    userId: string;
    userName: string;
    userPhoto: string;
  };
}

export type GlobalContextActionTypes = 'SET_USER';

export interface GlobalContextAction {
  type: GlobalContextActionTypes;
  payload?: any;
}

export type GlobalContextDispatch = (action: GlobalContextAction) => void;

export type GlobalContextReducer = (
  state: GlobalContextState,
  action: GlobalContextAction
) => GlobalContextState;
