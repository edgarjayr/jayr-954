"use client";
import { FC, PropsWithChildren, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useRouter } from "next/navigation";

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    router.replace("/login");
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
