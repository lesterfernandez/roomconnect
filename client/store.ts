import { create } from 'zustand'

type UserProfile = {
    username: string,
    loggedIn: boolean
}

type AccountActions = {
    signIn: (user: UserProfile['username'], pass: string) => void,
    signOut: () => void
}

export const useAuthStore = create<UserProfile & AccountActions>((set) => ({
    username: "",
    loggedIn: false,

    signIn: (username, pass) => set(() => {
        let matchUser = "user", matchPass = "pass";

        if (username === matchUser && pass === matchPass) {
            return ({
                username: username,
                loggedIn: true
            })
        }

        return ({
            username: "",
            loggedIn: false
        })
    }),

    signOut: () => set(() => ({ 
        username: "",
        loggedIn: false
    }))
}))