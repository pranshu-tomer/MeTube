// const getUser = async () => {

//     const response = await fetch('http://localhost:3000/api/v1/users/current-user', {
//         method: 'GET',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//     });

//     if(response.ok){
//       response.json()
//       .then((data) => {
//         console.log(data)
//         return data
//       })
//     }else{
//       return {}
//     }
// }

// export default getUser