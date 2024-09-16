import {
  FaBook,
  FaAudible,
  FaHome,
  FaPaperclip,
  FaQuestion,
} from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function SideBar() {
  return (
    <div className="bg-gradient-to-b from-white from-2% to-regal-blue to to-0% h-screen w-60">
      <div className="flex flex-row items-center py-8 pl-4">
        <img className="w-24 h-24" src="/uct_logo.png" />
        <div className=" text-white text-3xl font-semibold font-sans drop-shadow tracking-wider  ">
          UCT
        </div>
      </div>
      <div className="flex flex-col pl-14 space-y-9 text-base">
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaHome color="white" />
          <Link to="/dashboard" className="text-white font-medium">
            Dashboard
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaBook color="white" />
          <Link to="/pdf" className="text-white font-medium">
            Chapters
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaAudible color="white" />
          <Link to="/audio" className="text-white font-medium">
            Audios
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaPaperclip color="white" />
          <Link to="/quiz" className="text-white font-medium">
            Quizzes
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaQuestion color="white" />
          <Link to="/faqs" className="text-white font-medium">
            FAQs
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-2 py-2 transform transition-transform duration-300 hover:scale-125">
          <FaPerson color="white" />
          <Link to="/profile" className="text-white font-medium">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
