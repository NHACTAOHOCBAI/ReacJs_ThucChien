import { Outlet } from "react-router-dom"
import Header from "components/layout/appHeader"
import { useEffect } from "react"
import { fetchAccountAPI } from "services/api"
import { useCurrentUser } from "components/context/app.context"

function Layout() {
    const { setUser, user } = useCurrentUser();
    useEffect(() => {
        const fetchAccount = async () => {
            const resFetch = await fetchAccountAPI();
            if (resFetch && resFetch.data) {
                setUser(resFetch.data.user);
            }
        }
        fetchAccount();
    }, [])
    return (
        <>
            <Header />
            {JSON.stringify(user)};
            <Outlet />
        </>
    )
}

export default Layout
