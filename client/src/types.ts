export interface UserProfile {
  profilePic?: string;
  displayName: string;
  budget: 0 | 1 | 2 | 3 | 4;
  gender: string;
  cleanliness: 0 | 1 | 2 | 3;
  loudness: 0 | 1 | 2 | 3;
  coed: boolean;
}

export type ApiError = {
  errorMessage: string;
};

export type TokenMessage = {
  token: string;
};

export interface UserCredentials {
  username: string;
  password: string;
}

export type RegisterBody = UserCredentials & UserProfile;
