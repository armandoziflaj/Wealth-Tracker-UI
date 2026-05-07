import Navbar from "../../components/NavBars/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./GuestLayout.module.css";

interface Props {
    children: React.ReactNode;
}

const GuestLayout = ({children}: Props) => {
    return (
        <div className={styles.guestWrapper}>
            <Navbar/>
            <main className={styles.guestContent}>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default GuestLayout;