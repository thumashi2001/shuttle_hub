import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import FeedbackList from './components/feedbackList'
import InsertFeedback from './components/InsertFeedback'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div> 
     <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FeedbackList/>} />
        <Route path="/insert" element={<InsertFeedback/>} />
      </Routes>
      {/*<Footer/>*/}
     </Router>
    
    </div>
  )
}

export default App
