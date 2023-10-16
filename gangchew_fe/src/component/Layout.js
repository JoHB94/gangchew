import Header from "../main/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
    return(
        <>
        <Header />
        <Outlet /> {/* 중첩 레이아웃이 들어가는 부분 */}
        </>
    )
}
export default Layout;