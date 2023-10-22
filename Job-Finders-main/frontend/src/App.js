import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './screens/Home';
import Register from './screens/Register';
import LogIn from './screens/LogIn';
import Dashboard from './screens/Dashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreateJob from './screens/CreateJob';
import JobStatus from './screens/JobStatus';
import Profile from './screens/Profile';
import ProfileEdit from './screens/Edit/ProfileEdit';
import JobEdit from './screens/Edit/JobEdit';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/createJob' element={<CreateJob/>}/>
        <Route path='/job-status/:id/:company/:position/:location/:type' element={<JobStatus/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/userEdit/:Name/:LastName/:Email/:Location' element={<ProfileEdit/>}/>
        <Route path='/jobEdit/:id/:Company/:Position/:Type/:Location' element={<JobEdit/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
