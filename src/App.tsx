import {useAuth} from './hooks/useAuth';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from "./components/NavBars/NavBar.tsx";
import Login from "./pages/Login/Login.tsx";
import {Home} from "./pages/Home.tsx";
import {Register} from "./pages/Register/Register.tsx";
import {ProtectedRoute} from "./components/ProtectedRoute.tsx";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";
import Transactions from "./pages/Transactions/Transactions.tsx";
import {Categories} from "./pages/Categories/Categories.tsx";
import Footer from "./components/Footer/Footer.tsx";
import styles from './App.module.css';
import ZenLayout from "./layouts/ZenLayout/ZenLayout.tsx";


const App = () => {
    const {isAuthenticated} = useAuth();

    return (
        <Router>
            {isAuthenticated ? (
                <ZenLayout>
                    <Routes>
                        <Route element={<ProtectedRoute/>}>
                            <Route path="/DashBoard" element={<DashBoard/>}/>
                            <Route path="/Transactions" element={<Transactions/>}/>
                            <Route path="/Categories" element={<Categories/>}/>
                            <Route path="/" element={<DashBoard/>}/>
                        </Route>
                    </Routes>
                </ZenLayout>
            ) : (
                <div className={styles.guestWrapper}>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/Register" element={<Register/>}/>
                        <Route path="*" element={<Login/>}/>
                    </Routes>
                    <Footer/>
                </div>
            )}
        </Router>
    );
};

export default App;