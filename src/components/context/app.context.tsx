import { createContext, useContext, useState } from "react";

interface IUserContext {
    isAuth: boolean,
    setIsAuth: (values: boolean) => void,
    user: IUser | null,
    setUser: (values: IUser | null) => void,
    isLoading: boolean,
    setIsLoading: (values: boolean) => void,
}
interface IProps {
    children: React.ReactNode
}
const UserContext = createContext<IUserContext | null>(null);
const CurrentUserContext = ({ children }: IProps) => {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return (
        <UserContext.Provider value={{
            isAuth, setIsAuth, user, setUser, isLoading, setIsLoading
        }}>
            {children}
        </UserContext.Provider>
    );
}
const useCurrentUser = () => {
    const currentUserContext = useContext(UserContext);

    if (!currentUserContext) {
        throw new Error(
            "useCurrentUser has to be used within <CurrentUserContext.Provider>"
        );
    }

    return currentUserContext;
};
export { CurrentUserContext, useCurrentUser }