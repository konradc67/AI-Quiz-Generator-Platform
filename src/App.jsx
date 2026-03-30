import MainLayout from './components/layout/MainLayouts'
import CreateQuiz from './components/layout/CreateQuiz';
import Profile from './components/layout/Profile';
import MyHistory from './components/layout/MyHistory';
import Logout from './components/layout/Logout';
import Dashboard from './components/layout/Dashboard';
import Register from './components/layout/Register';
import Login from './components/layout/Login';
import { Routes, Route } from "react-router-dom";
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App(){
return (

    <MainLayout>
        <Routes>
            <Route path="/" element={<CreateQuiz/>} />
            <Route path="/history" element={<MyHistory/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>

        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark"
        />

    </MainLayout>

);

}