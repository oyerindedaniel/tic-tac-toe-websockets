/* eslint-disable @typescript-eslint/no-explicit-any */

// @typedef User
export interface User {
  userName: string;
  userPhotoId: string;
  socketID: string;
  isPlaying?: boolean;
  isRequestAccepted?: boolean;
  isRequestDeclined?: boolean;
  requests?: Array<User>;
  asRequested?: boolean; // Frontend
  acceptedRequest?: boolean;
  successMessage?: Message; // Frontend
  [key: string]: any;
}

// @typedef Message
export interface Message {
  title?: string;
  message: string;
  status: string;
  messageSocketId?: string;
}

export enum Status {
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}
