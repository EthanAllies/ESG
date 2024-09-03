export default function DashBoardPage(){
    return(
        <div className="w-full h-full ">
            <div className="h-1/3 w-full flex justify-center ">
                <div className="h-52 w-4/5 mt-6 mt-11 outline rounded-lg"></div>
            </div>
            <div className="h-1/3 w-full flex ">
                <div className="flex flex-col w-4/6 h-5/6 mr-5 ml-10 my-auto" >
                    <h1 className="mb-1 text-lg font-bold underline underline-offset-2">Progress</h1>
                    <div className="h-full w-full outline rounded-lg mx-auto drop-shadow-2xl"></div>
                </div>
                <div className="flex flex-col w-2/6 h-5/6 mr-10 ml-5 my-auto" >
                    <h1 className="mb-1 text-lg font-bold underline underline-offset-2">Poll</h1>
                    <div className="h-full w-full outline rounded-lg drop-shadow-2xl"></div>
                </div>
            </div> 
            <div className="h-1/3 w-full flex ">
            <div className="flex flex-col w-2/6 h-5/6 mr-5 ml-10 my-auto" >
                    <h1 className="mb-1 text-lg font-bold underline underline-offset-2">FAQs</h1>
                    <div className="h-full w-full outline rounded-lg drop-shadow-2xl"></div>
                </div>
            <div className="flex flex-col w-4/6 h-5/6 mr-10 ml-5 my-auto" >
                    <h1 className="mb-1 text-lg font-bold underline underline-offset-2">Suggested Chapters</h1>
                    <div className="h-full w-full outline rounded-lg mx-auto drop-shadow-2xl"></div>
                </div>
            </div>
        </div>
    )
}