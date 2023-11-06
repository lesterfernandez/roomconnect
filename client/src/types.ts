export type UserProfile = {
  username: string;
  displayName: string;
  profilePic?: string;
  gender: string;
  budget: 0 | 1 | 2 | 3 | 4;
  cleanliness: 0 | 1 | 2 | 3;
  loudness: 0 | 1 | 2 | 3;
  coed: boolean;
};

export type UserCredentials = {
  username: string;
  password: string;
};

export type RegisterBody = UserCredentials & UserProfile;

export type ApiError = {
  errorMessage: string;
};

export type TokenMessage = {
  token: string;
};

export type SearchBody = {
  budget: string;
  cleanliness: string;
  loudness: string;
  coed: string;
};

export type Message = {
  from: string;
  to: string;
  content: string;
};

export type ServerEvent =
  | {
      type: "message";
      from: string;
      to: string;
      content: string;
    }
  | {
      type: "load";
      conversations: Message[];
    };
