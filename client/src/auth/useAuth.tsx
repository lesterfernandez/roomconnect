import { createContext, useContext, useState } from "react";

const authContext = createContext<any>(null);
export const AuthData = () => useContext(authContext);

export const AuthWrapper = ({ children }: any) => {
  const [user, setUser] = useState<{
    userName: string;
    loggedIn: boolean;
  }>({
    userName: "",
    loggedIn: false,
  });

  const signIn = (username: string, pass: string) => {
    let matchUser = "user",
      matchPass = "pass";

    if (username === matchUser && pass === matchPass) {
      setUser({ ...user, loggedIn: true });
    }
  };

  const signOut = () => {
    setUser({ ...user, loggedIn: false });
  };

  return <authContext.Provider value={{ user, signIn, signOut }}>{children}</authContext.Provider>;
};
