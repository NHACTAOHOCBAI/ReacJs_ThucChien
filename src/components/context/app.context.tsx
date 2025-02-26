import { fetchAccountAPI } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchAccount = async () => {
            const resFetch = await fetchAccountAPI();
            if (resFetch && resFetch.data) {
                setUser(resFetch.data.user);
                setIsAuth(true);
            }
            setIsLoading(false);
        }
        fetchAccount();
    }, [])
    return (
        <>
            {
                isLoading ?
                    <HashLoader
                        style={
                            { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }
                        }
                        color="#00d2d3"
                        cssOverride={{}}
                        size={50}
                        speedMultiplier={1}
                    />
                    :
                    <UserContext.Provider value={{
                        isAuth, setIsAuth, user, setUser, isLoading, setIsLoading
                    }}>
                        {children}
                    </UserContext.Provider>
            }
        </>
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