import { FaBook, FaAudible, FaAudioDescription, FaRegFileAudio, FaHome, FaPaperclip, FaQuestion } from 'react-icons/fa'
import { Link } from 'react-router-dom'
export default function SideBar() {

  return (
    <div className="bg-gradient-to-b from-white from-2% to-regal-blue to to-0% h-screen w-60">
      <div className="flex flex-row items-center py-8 pl-4">
        <img className="w-24 h-24" src="/uct_logo.png" />
        <div className=" text-white text-3xl font-semibold font-sans drop-shadow tracking-wider  ">
          UCT
        </div>
      </div>
      <div className='flex flex-col pl-14 space-y-12 text-base'>
        <div className="flex flex-row items-center space-x-2 py-2 ">
          <FaHome color='white' />
          <Link to='/pdf' className="text-white">Dashboard</Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2">
          <FaBook color='white' />
          <Link to="/audio" className="text-white">Chapters</Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2">
          <FaAudible color='white' />
          <div className="text-white">Audios</div>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2">
          <FaPaperclip color='white' />
          <div className="text-white">Quizzes</div>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2">
          <FaQuestion color='white' />
          <div className="text-white">FAQs</div>
        </div>
      </div>

    </div>
  )
}


