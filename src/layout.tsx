import { Outlet } from "react-router-dom"
import Header from "components/layout/appHeader"
import { useEffect } from "react"
import { fetchAccountAPI } from "services/api"
import { useCurrentUser } from "components/context/app.context"
import { HashLoader } from "react-spinners"

function Layout() {
    const { setUser, user, setIsAuth, setIsLoading, isLoading } = useCurrentUser();
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
                    <div>
                        <Header />
                        {JSON.stringify(user)};
                        <Outlet />
                    </div>
            }
        </>
    )
}

export default Layout
