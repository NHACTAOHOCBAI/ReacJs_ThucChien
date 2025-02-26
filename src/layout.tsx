import { Outlet } from "react-router-dom"
import Header from "components/layout/appHeader"
function Layout() {

    return (
        <div>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout
