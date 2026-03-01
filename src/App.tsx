import { useState } from 'react'
import axios from "axios";

function App() {
  const [value, setValue] = useState('{}')

  async function testAPIRequest() {
    const instance = axios.create({
      baseURL: "/api",
      timeout: 5000
    })

    const response = await instance.get("/user/token/")

    setValue(JSON.stringify(response.data))
  }

  return (
    <>
      <p>{value}</p>
      <button onClick={testAPIRequest}>Press to update the request from the server</button>
    </>
  )
}

export default App
