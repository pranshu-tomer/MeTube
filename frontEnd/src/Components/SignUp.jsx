import { useState } from "react"
import { toast, Toaster } from 'sonner'
import { useNavigate } from 'react-router-dom'

async function handleLogin(credentials) {

  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  formData.append('fullName', credentials.fullName);
  formData.append('email', credentials.email);
  formData.append('avatar', credentials.avatar);
  if (credentials.coverImage) {
    formData.append('coverImage', credentials.coverImage);
  }

  const response = await fetch('http://localhost:3000/api/v1/users/register', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: formData,
    credentials: 'include',
  });

  return response
}

function SignUp(){

  const navigate = useNavigate()

  // Input fields
  const [username,setUsername] = useState("");
  const [fullname,setFullname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [avatar,setAvatar] = useState(null);
  const [coverImage,setCoverImage] = useState(null);

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

    if(!email){
      toast.error("Email is Required", {
        duration: 2000,
        style: {
          color: 'red',
        }
      })
      return
    }

    if(!fullname){
      toast.error("Fullname is Required", {
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

    if(!avatar){
      toast.error("Avatar Image is Required", {
        duration: 2000,
        style: {
          color: 'red',
        }
      })
      return
    }

    const credentials = {
          username,
          email,
          fullName : fullname,
          password,
          avatar,
          coverImage
      }

    toast.loading('Preparing Your WorkSpace',{
      id: 2345,
    });
        
    const response = await handleLogin(credentials)

    if (response.ok) {
      toast.dismiss(2345)
      toast.success(`Login Successful`,{
        duration: 2000,
        style: {
          color: 'green',
        }
      })
      navigate('/')
    } else {
      toast.dismiss(2345)
      toast.error(`${response.statusText}`, {
        duration: 2000,
        style: {
          color: 'red',
        }
      })
    }
        
    setEmail("");
    setFullname("");
    setPassword("");
    setUsername("");
  }

    const inputStyle = "bg-[#121212] border text-[#8e9998] w-[300px] px-5 py-2 rounded-xl"
    return(
      <>
        <Toaster />
        <div className="h-[100vh] w-[100vw] bg-[#121212] text-white flex flex-col gap-3 items-center justify-center">
            <img src="/asset/logo.png" alt="Website Logo"/>
            <input type="text" placeholder="Email" className={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Full Name" className={inputStyle} value={fullname} onChange={(e) => setFullname(e.target.value)}/>
            <input type="text" placeholder="Username" className={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" className={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label htmlFor="avatar" className="font-bold">Upload Your Avatar *</label>
            <input type="file" id="avatar" onChange={(e) => setAvatar(e.target.files[0])}/>
            <label htmlFor="coverImage" className="font-bold">Upload Your Cover Image</label>
            <input type="file" id="coverImage" onChange={(e) => setCoverImage(e.target.files[0])}/>
            <button onClick={handleSubmit} className="bg-[#b17aff] w-[300px] py-2 px-5 rounded-xl hover:rounded-full">Submit</button>
        </div>
      </>
    )
}

export default SignUp