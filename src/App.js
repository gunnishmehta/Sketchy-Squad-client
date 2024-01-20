import './App.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Room from './pages/Room';
import Lobby from './pages/Lobby';

export const server = "http://localhost:3001"

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path='/' element={<Lobby/>}/> */}
          <Route path='/' element={<Room/>}/>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
