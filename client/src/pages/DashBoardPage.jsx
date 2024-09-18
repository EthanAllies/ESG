
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function DashBoardPage() {
  const { currentUser, logout, dbUser, setDBUser } = useAuth();

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="relative h-60 w-4/5 mt-11 rounded-2xl drop-shadow-xl object-contain bg-gradient-to-r from-regal-blue from-10% to-blue-300 flex flex-row justify-between items-center overflow-hidden">
            {currentUser ? (
              <h className="absolute z-10 text-white text-3xl font-semibold tracking-wide drop-shadow-2xl max-w-full transform transition-transform duration-500 sm:translate-x-16 md:translate-x-12 lg:translate-x-8 xl:translate-x-6">
                Welcome Back, {dbUser.displayName}!
              </h>
            ) : (
              <h className="absolute z-10 text-white text-3xl font-semibold tracking-wide drop-shadow-2xl max-w-full transform transition-transform duration-500 sm:translate-x-16 md:translate-x-12 lg:translate-x-8 xl:translate-x-6">
                Welcome To The Science Student Guide!
              </h>
            )}
            <img
              src="userDash.png"
              alt=""
              className="object-cover h-60 w-auto z-0 flex-shrink-0 ml-auto opacity-95"
            />
          </div>
        </div>
      </div>

      <div className="w-full flex ">
        <div className="flex flex-col w-4/6 h-5/6 mr-5 ml-10 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            Progress
          </h1>
          <div className="h-60 w-full rounded-lg mx-auto outline outline-slate-100 drop-shadow-lg bg-white flex flex-col ">
            <div className="w-full h-1/2 flex flex-row justify-center items-center space-x-4">
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center  ">
                <img
                   src="badge1.png"
                   alt=""
                   className="object-cover h-16 w-auto z-0  opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
                <img
                   src="badge8.png"
                   alt=""
                   className="object-cover h-14 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
              <img
                   src="IntroBadge.png"
                   alt=""
                   className="object-cover h-16 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
              <img
                   src="badge3.png"
                   alt=""
                   className="object-cover h-10 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center" >
                <img
                   src="badge2.png"
                   alt=""
                   className="object-cover h-16 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
            </div>
            <div className="w-full h-1/2  flex flex-row justify-center items-center space-x-4">
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
              <img
                   src="badge5.png"
                   alt=""
                   className="object-cover h-16 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
                <img
                   src="badge4.png"
                   alt=""
                   className="object-cover h-12 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
              <img
                   src="badge7.png"
                   alt=""
                   className="object-cover h-10 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
              <div className="w-20 h-20 rounded-full drop-shadow-xl bg-gray-300 flex flex-col justify-center items-center">
                <img
                   src="badge6.png"
                   alt=""
                   className="object-cover h-16 w-auto z-0 flex-shrink-0 opacity-100"
                   />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-2/6 h-5/6 mr-10 ml-5 my-auto">
  <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
    Interesting Fact
  </h1>
  <div className="h-60 w-full bg-white outline outline-slate-100 rounded-lg drop-shadow-lg flex flex-col justify-center items-center">
    <div className="px-6 space-y-1">
      <h1 className="font-bold">What is the Pomodoro Technique?</h1>
      <h2 className="line-clamp-4">
        The Pomodoro Technique, a popular time management method, involves
        working for 25-minute intervals followed by 5-minute breaks. This
        method can help improve focus and productivity by reducing mental
        fatigue.
      </h2>
      <a 
        href="https://todoist.com/productivity-methods/pomodoro-technique" 
        target="_blank" 
        rel="noopener noreferrer"
        className="font-semibold text-regal-blue"
      >
        Learn More
      </a>
    </div>
  </div>
</div>

      </div>
      <div className=" w-full flex ">
        <div className="flex flex-col w-2/6 h-5/6 mr-5 ml-10 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            FAQs
          </h1>
          <div className="h-60 w-full bg-white outline outline-slate-100 rounded-lg drop-shadow-lg flex flex-col justify-center items-center">
            <div className="px-6 space-y-1">
              <h1 className="font-bold">What are the best ways to prepare for exams?</h1>
              <h2 className="line-clamp-4">Effective preparation includes reviewing lecture notes, using flashcards, forming study groups, and practicing past exam questions.</h2>
              <Link to="/faqs" className="font-semibold text-regal-blue">
              See More
            </Link>
          </div>
          </div>
        </div>
        <div className="flex flex-col w-4/6 h-5/6 mr-10 ml-5 my-auto">
          <h1 className="mb-1 text-lg font-bold underline underline-offset-2">
            Suggested Chapters
          </h1>
          <div className="h-full w-full bg-white rounded-lg mx-auto outline outline-slate-100 drop-shadow-lg flex flex-row">
            <div className="w-1/2 h-full flex">
              <div className="w-4/5 h-full flex justify-center items-center">
                <img src="/Chapter1.png" alt="" className="w-48 h-auto rounded-lg" />
              </div>

              <div className="w-1/2 h-full flex justify-center items-center">
                <button className="bg-regal-blue w-5/6 py-2 drop-shadow-lg text-white font-semibold hover:bg-slate-700 rounded-3xl">
                  View
                </button>
              </div>
            </div>

            <div className="w-1/2 h-full flex">
              <div className="w-4/5 h-full flex justify-center items-center">
                <img src="/Chapter6.png" alt="" className="w-48 h-auto rounded-lg" />
              </div>

              <div className="w-1/2 h-full flex justify-center items-center">
                <button className="bg-regal-blue w-5/6 py-2 drop-shadow-lg text-white font-semibold hover:bg-slate-700 rounded-3xl">
                  View
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
