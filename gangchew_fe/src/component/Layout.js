import Header from "../main/Header"
import { Outlet } from "react-router-dom"
import Footer from "../main/Footer"

const Layout = () => {
    return(
        <>
        <Header />
        <Outlet /> {/* 중첩 레이아웃이 들어가는 부분 */}
        <Footer/>
        </>
    )
}
export default Layout;