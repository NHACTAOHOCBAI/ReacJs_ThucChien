import { Outlet } from "react-router-dom"
import Header from "components/layout/appHeader"

function Layout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout
