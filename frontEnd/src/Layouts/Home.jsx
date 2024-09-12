import { Outlet } from "react-router-dom"
import Nav from "./../Components/Nav"
import SideBar from "./../Components/SideBar"
// import {  } from 'react-redux'
// import getUser from '../utils/getUser'
import { useSelector, useDispatch } from 'react-redux'
import { addUser } from "../Redux/Slices/User/User"

function Home(){

    const dispatch = useDispatch()
    dispatch(addUser(5))
    const user = useSelector((state) => state)
    console.log(user)

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