import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [name, setName] = useState("")

  //something for the page to do on load
  useEffect(() => {
    getData();
    setName("Ethan")
  }, [])

  //fetch data from the API
  async function getData(){
    const apiResponse = await axios.get("http://localhost:3000/pdf")
  setData(apiResponse.data)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>ESG-UCT</h1>

      <div>My Name is: {name}</div>

      <table>
        <thead>
          <tr>
          <th>Title</th>
          <th>Descr</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.description}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
