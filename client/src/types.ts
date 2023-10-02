interface UserProfile {
    profilePic?: string;
    displayName: string;
    budget: 1 | 2 | 3 | 4;
    gender: string;
    cleanliness: 1 | 2 | 3;
    loudness: 1 | 2 | 3;
    coed: boolean;
}

type ApiError = {
    errorMessage: string;
};

type TokenMessage = {
    token: string;
}