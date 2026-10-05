import { createContext } from "react";

export interface ContextProps {
isLoggedIn: boolean;
setIsLoggedIn: (value: boolean) => void;
logout: () => void;
}
export const AuthContext = createContext({} as ContextProps);
