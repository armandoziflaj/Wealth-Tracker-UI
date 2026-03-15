import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.tsx";
import Login from "./pages/Login/Login.tsx";
import { Register } from "./pages/Register/Register.tsx";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import Navbar from "./components/NavBar.tsx";
import Footer from "./components/Footer.tsx";
import DashBoard from "./pages/DashBoard/DashBoard.tsx";

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-zen-deep text-white selection:bg-zen-neon selection:text-black">

                <Navbar />

                <main className="grow pt-20 lg:pt-24">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Login" element={<Login />} />
                        <Route path="/Register" element={<Register />} />
                        <Route path="/DashBoard" element={<DashBoard />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<div>Dashboard Work in Progress...</div>} />
                        </Route>

                        <Route path="*" element={<div className="flex items-center justify-center h-full text-zen-muted uppercase tracking-widest text-xs">
                            Page Not Found
                        </div>} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;