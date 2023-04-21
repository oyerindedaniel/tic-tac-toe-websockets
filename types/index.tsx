export interface User {
  userName: string;
  userPhotoId: string;
  socketID: string;
  isPlaying: boolean;
  isRequestAccepted: boolean;
  requests?: Array<User>;
  asRequested?: boolean; // Frontend
  acceptedRequest?: boolean;
}

export interface Message {
  title?: string;
  message: string;
  status: string;
}

export enum Status {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}
