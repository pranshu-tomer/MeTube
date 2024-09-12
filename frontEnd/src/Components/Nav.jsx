import { Search } from "lucide-react"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {removeUser} from '../Redux/Slices/User/User'

const logout = async () => {
    const response = await fetch('http://localhost:3000/api/v1/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if(response.ok){
      console.log("LogOut Successful")
    }else{
      return null
    }
}

function Nav(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSignUp = () => {
        navigate('/user/register');
    }
    const handleLogin = () => {
        navigate('/user/login');
    }
    const handleLogout = async () => {
        await logout()
        dispatch(removeUser())
        navigate('/')
    }

    const loggedIn = useSelector((state) => state.user.loggedIn)
    console.log(loggedIn)

    return (
        <header className="h-[75px] w-full border-b border-white bg-[#121212] px-4">
            <nav className="mx-auto flex max-w-7xl items-center py-2 px-2 justify-between">
                <img src="./asset/logo.png" alt="" className="h-[60px]"/>
                <div className='flex bg-[#121212] border border-white py-2 px-4 gap-4 items-center w-[300px] rounded-md'>
                    <Search color='white' className='h-[20px]'/>
                    <input type="text" placeholder="Search" className="bg-[#121212] border-white focus:outline-none text-white" />
                </div>
                <div className='text-white flex gap-8'>
                   {loggedIn ?
                    (
                        <button onClick={handleLogout} className='hover:rounded-full bg-[#b17aff] px-2 py-2 rounded-md'>Log out</button>
                    ) : (
                        <>
                            <button onClick={handleLogin} className="hover:font-bold">Log in</button>
                            <button onClick={handleSignUp} className='hover:rounded-full bg-[#b17aff] px-2 py-2 rounded-md'>Sign up</button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Nav