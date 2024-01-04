import './App.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Room from './pages/Room';
import Lobby from './pages/Lobby';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Lobby/>}/>
          <Route path='/room/:roomId' element={<Room/>}/>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
