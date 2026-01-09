import { Route, Routes } from "react-router-dom"
// import Navbar from "./components/Navbar"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Protected from "./components/Protected"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Protected><Dashboard /></Protected>} />
      <Route path="/login" element={<><Login /></>} />
      <Route path="/signup" element={<><SignUp /></>} />
      <Route path="/*" element={<Protected><Dashboard /></Protected>}/>
    </Routes>
  )
}

export default App
