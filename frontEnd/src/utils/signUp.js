async function handleSignUp(credentials) {

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

export default handleSignUp