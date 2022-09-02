import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signupcomponent from './components/signup';
import Logincomponent from './components/login';
import Profileformcomponent from './components/profileform';
import Profilecomponent from './components/profile';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signupcomponent />}/>
        <Route path='/login' element={<Logincomponent />} />
        <Route path='/profileform' element={<Profileformcomponent />} />
        <Route path='/profile' element={<Profilecomponent />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
