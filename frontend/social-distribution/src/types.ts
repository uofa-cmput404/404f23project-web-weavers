import {v4 as uuid} from 'uuid';

export interface AuthorResponse{
    user: {
        uuid: typeof uuid;
        displayName: string;
        is_active: Boolean;
    };
    access: string;
    refresh: string;
  }