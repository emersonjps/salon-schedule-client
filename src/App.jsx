import './App.css'
import { Toaster } from "@/components/ui/sonner";
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';
import Login from './pages/Login';

function App() {

    return (
        <>
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/configuration" element={<Config />} />
            </Routes>
        </>
    )
}

export default App
