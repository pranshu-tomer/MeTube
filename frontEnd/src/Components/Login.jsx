import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/Slices/User/User";
import  getUser  from "../utils/getUser"
import login from "../utils/login"

function Login(){

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async () => {

        if(!username){
            toast.error("Username is Required", {
                duration: 2000,
                style: {
                    color: 'red',
                }
            })
            return
        }
        if(!password){
            toast.error("Password is Required", {
                duration: 2000,
                style: {
                    color: 'red',
                }
            })
            return
        }

        const credentials = {
            username,
            password
        }

        toast.loading('Wait a moment',{
            id: 345
        })
        const response =  await login(credentials)

        if(response.ok){
            toast.dismiss(345)
            toast.success('Login Successful',{
                duration: 2000,
                style: {
                    color : 'green'
                }
            })
            const data = await getUser()
            if(data){
                dispatch(addUser({user: data,loggedIn: true}))
            }
            navigate('/')
        }else{
            toast.dismiss(345)
            toast.error(`${response.statusText}`,{
                duration: 2000,
                style: {
                    color : 'red'
                }
            })
        }
    }

    const inputStyle = "bg-[#121212] border text-[#8e9998] w-[300px] px-5 py-2 rounded-xl"
    return (
        <>
            <Toaster />
            <div className="h-[100vh] w-[100vw] bg-[#121212] text-white flex flex-col gap-3 items-center justify-center">
                <img src="/asset/logo.png" alt="Website Logo"/>
                <input type="text" placeholder="Username" className={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" placeholder="Password" className={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button onClick={handleSubmit} className="bg-[#b17aff] w-[300px] py-2 px-5 rounded-xl hover:rounded-full">Submit</button>
            </div>
        </>
    )
}

export default Login