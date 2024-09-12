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

export default login