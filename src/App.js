import './App.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Room from './pages/Room';

export const server = process.env.REACT_APP_API_URL

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Room/>}/>
        </Routes>
      </Router>    
    </div>
  );
}

export default App;
