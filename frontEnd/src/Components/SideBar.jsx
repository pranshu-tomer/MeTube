import { Camera, CircleHelp, File, History, HomeIcon, Settings, ThumbsUp, UserCheck } from 'lucide-react';

function SideBar(){
    return (
        <div className='w-[23%] border-t border-white bg-[#121212] border-r flex flex-col items-center py-5 px-4 gap-2 justify-between'>
            <ul className='w-full flex flex-col gap-2'>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <HomeIcon color='white'/>
                        <h1>Home</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <ThumbsUp color='white'/>
                        <h1>Liked Videos</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <History color='white'/>
                        <h1>History</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <Camera color='white'/>
                        <h1>My Content</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <File color='white'/>
                        <h1>Collections</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <UserCheck color='white'/>
                        <h1>Subscribers</h1>
                    </button>
                </li>
            </ul>
            <ul className='w-full flex flex-col gap-2'>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <CircleHelp color='white'/>
                        <h1>Support</h1>
                    </button>
                </li>
                <li>
                    <button className='text-white flex gap-4 border py-2 px-4 w-full rounded-md'>
                        <Settings color='white'/>
                        <h1>Settings</h1>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default SideBar