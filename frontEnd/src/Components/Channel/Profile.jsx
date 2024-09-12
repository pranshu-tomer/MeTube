import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";

function Profile(){

    const user = useSelector((state) => state.user.user)
    console.log(user)
    return (
        <>
            <div className="bg-[#121212] w-full">
                <div className='h-[270px] border-b'>
                    <img className='h-[140px] w-full' src={user.coverImage} alt="" />
                    <div className='relative flex gap-5'>
                        <img className='absolute left-5 top-[-20px] h-[100px] w-[100px] rounded-full border-[3px]' src={user.avatar} alt="" />
                        <h1 className='absolute text-white left-[140px] top-4 font-semibold text-lg'>{user.fullName}</h1>
                        <p className='absolute text-[#7f6f8f] left-[140px] top-[40px] font-semibold'>@{user.username}</p>
                        <button className='hover:rounded-full bg-[#b17aff] px-2 py-2 rounded-md absolute right-12 top-6'>Subscribe</button>
                    </div>
                    <div className='flex justify-between text-white px-20 pt-[95px]'>
                        <Link>Videos</Link>
                        <Link>Playlist</Link>
                        <Link>Tweets</Link>
                        <Link>Subscribed</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile