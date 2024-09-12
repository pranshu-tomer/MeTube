import { Outlet, useNavigate } from "react-router-dom"
import {Home} from 'lucide-react'

function LogSign(){

    const navigate = useNavigate();
    const handleBack = () => {
      navigate('/')
    }
    return (
        <>
            <button onClick={handleBack} className="absolute left-8 top-8 bg-black h-[50px] w-[50px] rounded-full flex justify-center items-center">
                <Home color="white"/>
            </button>
            <Outlet />
        </>
    )
}

export default LogSign