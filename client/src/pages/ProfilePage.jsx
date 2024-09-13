import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from 'axios';


export default function Prof() {
  const { currentUser, logout, dbUser, setDBUser, getUser } = useAuth();

  // const [dbUser, setdbUser] = useState(null)

  const [username, setName] = useState('');

  async function handleSubmit(e) {
    e.preventDefault(); // stop from refreshing page 
    await axios.patch("http://localhost:3000/user", {
      email: dbUser.email,       // Replace with the user's email
      displayName: username   // The new display name
    });
    getUser()
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <div className=" p-6 mt-24">
        <div className=" pb-3 pt-3">
          <h2 className="text-2xl font-semibold leading-8 ">Profile</h2>

          <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block  font-medium text-sm leading-6 text-gray-500"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-regal-blue sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    defaultValue={dbUser.displayName}
                    placeholder="Display name"
                    autoComplete="username"
                    onChange={(e)=> setName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 font-medium placeholder:text-gray-500 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            {/*<div className="col-span-full">
              <label
                htmlFor="photo"
                className="block  font-medium text-sm leading-6 text-gray-500"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  aria-hidden="true"
                  className="h-12 w-12 text-gray-300"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>*/}
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-6 gap-x-6 gap-y-8 sm:grid-cols-6">
            <h1 className="text-gray-500 font-medium text-sm">Email address</h1>
            {dbUser ? (
              <h2 className="font-medium leading-8 pl-1">{dbUser.email}</h2>
            ) : (
              <h2 className="font-medium leading-8 pl-1">None</h2>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-6 mr-5">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-regal-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-regal-blue"
        >
          Save
        </button>
      </div>
    </form>
  );
}
