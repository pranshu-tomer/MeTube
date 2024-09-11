import { useState } from "react"

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

  // console.log(formData);


  const response = await fetch('http://localhost:3000/api/v1/users/register', {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    body: formData,
    credentials: 'include',
  });
  
  if (response.ok) {
    // Success: token is stored in cookie by the backend
    console.log('Login successful!');
    console.log(response);
  } else {
    console.log('Login failed!');
  }
}

function SignUp(){

    const [username,setUsername] = useState("");
    const [fullname,setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [avatar,setAvatar] = useState(null);
    const [coverImage,setCoverImage] = useState(null);

    const handleSubmit = async () => {
        const credentials = {
            username,
            email,
            fullName : fullname,
            password,
            avatar,
            coverImage
        }
        await handleLogin(credentials)
        setEmail("");
        setFullname("");
        setPassword("");
        setUsername("");
    }

    const inputStyle = "bg-[#121212] border text-[#8e9998] w-[300px] px-5 py-2 rounded-xl"
    return(
        <div className="h-full w-full bg-[#121212] text-white flex flex-col gap-3 items-center">
            <img src="./asset/logo.png" alt="" />
            <input type="text" placeholder="Email" className={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="text" placeholder="Full Name" className={inputStyle} value={fullname} onChange={(e) => setFullname(e.target.value)}/>
            <input type="text" placeholder="Username" className={inputStyle} value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" className={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="file" placeholder="Upload your Avatar" name="avatar" onChange={(e) => setAvatar(e.target.files[0])}/>
            <input type="file" placeholder="Upload your Cover Image" name="coverImage" onChange={(e) => setCoverImage(e.target.files[0])}/>
            <button onClick={handleSubmit} className="bg-[#b17aff] w-[300px] py-2 px-5 rounded-xl hover:rounded-full">Submit</button>
        </div>
    )
}

export default SignUp