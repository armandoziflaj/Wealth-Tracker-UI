import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import Navbar from "./components/NavBars/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import Sidebar from "./components/NavBars/Sidebar.tsx";
import {MobileNav} from "./components/NavBars/MobileNav.tsx";
import Login from "./pages/Login/Login.tsx";
import Transactions from "./pages/Transactions/Transactions.tsx";
import {Categories} from "./pages/Categories/Categories.tsx";

const App = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <div className={`min-h-screen bg-zen-deep text-white selection:bg-zen-neon selection:text-black ${isAuthenticated ? 'flex' : 'flex-col'}`}>

                {isAuthenticated ? (
                    <>
                        <Sidebar />
                        <MobileNav />
                    </>
                ) : (
                    <Navbar />
                )}

                <main className={`grow w-full ${isAuthenticated ? 'pb-24 md:pb-0' : 'pt-20'}`}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/Categories" element={<Categories />} />
                        <Route path="/Transactions" element={<Transactions />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/DashBoard" element={<DashBoard />} />
                            <Route path="/Transactions" element={<Transactions />} />
                            <Route path="/Categories" element={<Categories />} />
                        </Route>

                        <Route path="*" element={
                            <div className="flex flex-col items-center justify-center h-screen text-zen-muted uppercase tracking-[0.4em] text-[10px]">
                                <span className="text-4xl mb-4 text-white">404</span>
                                Node Not Found
                            </div>
                        } />
                    </Routes>
                </main>

                {!isAuthenticated && <Footer />}
            </div>
        </Router>
    );
};

export default App;