import {FaBook, FaAudible} from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function SideBar() {

  return (
<div className="bg-blue-500 h-screen w-72">
  <div className="flex flex-row items-center">
    <img className="w-24 h-24" src="/uct_logo.png"/>
    <div className="text-white text-3xl font-bold">UCT</div>
    </div>
    <div className="flex flex-row items-center space-x-2 py-2">
        <FaBook color='white' />
        <Link to='/pdf' className="text-white">Pdf</Link>
    </div>
    <div className="flex flex-row items-center space-x-2 py-2">
        <FaAudible color='white' />
        <Link to="/audio" className="text-white">Audio</Link>
    </div>
    <div className="flex flex-row items-center space-x-2 py-2">
        <FaBook color='white' />
        <div className="text-white">Dashboard</div>
    </div>
    <div className="flex flex-row items-center space-x-2 py-2">
        <FaBook color='white' />
        <div className="text-white">Dashboard</div>
    </div>
    <div className="flex flex-row items-center space-x-2 py-2">
        <FaBook color='white' />
        <div className="text-white">Dashboard</div>
    </div>
    
</div>
  )
}


