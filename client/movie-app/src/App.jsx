import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import { Home } from './Home';
import { Signup } from './Signup';
import { Login } from './Login';
import { UserHomePage } from './UserHomePage';
import { MoviesInfo } from "./MoviesInfo";

function App() {
  

  return (
   <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/user-home" element={<UserHomePage/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/movies' element={<MoviesInfo/>}/>
        </Routes>
      </Router>
   </div>
  )
}

export default App
