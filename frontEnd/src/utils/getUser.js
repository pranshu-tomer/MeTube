const getUser = async () => {
    const response = await fetch('http://localhost:3000/api/v1/users/current-user', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if(response.ok){
      const data = await response.json()
      return data.data
    }else{
      return null
    }
}

export default getUser