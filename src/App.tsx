import {useAuth} from './hooks/useAuth';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "./pages/Login/Login.tsx";
import {Home} from "./pages/Home.tsx";
import {Register} from "./pages/Register/Register.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";
import Transactions from "./pages/Transactions/Transactions.tsx";
import {Categories} from "./pages/Categories/Categories.tsx";
import ZenLayout from "./layouts/ZenLayout/ZenLayout.tsx";
import DataUpload from "./pages/FileUpload/DataUpload.tsx";
import {ZenAlert} from "./components/ZenAlert/ZenAlert.tsx";
import GuestLayout from "./layouts/GuestLayout/GuestLayout.tsx";


const App = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Router>
            <ZenAlert/>
            {isAuthenticated ? (
                <ZenLayout>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/DashBoard" element={<DashBoard/>}/>
                            <Route path="/Transactions" element={<Transactions/>}/>
                            <Route path="/Categories" element={<Categories/>}/>
                            <Route path="/DataUpload" element={<DataUpload/>}/>
                        </Route>
                    </Routes>
                </ZenLayout>
            ) : (
                <GuestLayout>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/Register" element={<Register/>}/>
                        <Route path="*" element={<Login/>}/>
                    </Routes>
                </GuestLayout>
            )}
        </Router>
    );
};

export default App;