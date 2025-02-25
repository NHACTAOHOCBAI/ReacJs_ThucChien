import { Button, Result } from "antd";
import { useCurrentUser } from "components/context/app.context"
import { useLocation } from "react-router-dom";

interface IProps {
    children: React.ReactNode
}
const ProtectedRoute = ({ children }: IProps) => {
    const location = useLocation();
    const { isAuth, user } = useCurrentUser();
    if (isAuth === false)
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you need to login to access this page."
                extra={<Button type="primary">Back Home</Button>}
            />
        )
    const isAdminRoute = location.pathname.includes("admin");
    if (isAdminRoute && user?.role !== "ADMIN")
        return (
            <Result
                status="403"
                title="403"
                subTitle="Sorry, you are not authorized to access this page."
                extra={<Button type="primary">Back Home</Button>}
            />)
    return (
        <>
            {children}
        </>
    )
}
export default ProtectedRoute