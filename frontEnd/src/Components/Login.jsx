import { useState } from "react";
import { toast, Toaster } from "sonner";

const login = async(credentials) => {
    const response = await fetch('http://localhost:3000/api/v1/users/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
        }),
        credentials: 'include'
    })

    return response
}

function Login(){

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