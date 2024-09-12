import { Outlet } from "react-router-dom"
import Nav from "./../Components/Nav"
import SideBar from "./../Components/SideBar"

function Home(){
    return (
        <>
            <div className="w-screen h-screen overflow-hidden">
                <Nav/>
                <div className="flex h-[calc(100vh-75px)]">
                    <SideBar/>
                    <Outlet/>
                </div>
            </div>
        </>
    )
}

export default Home