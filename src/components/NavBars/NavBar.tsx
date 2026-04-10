import {Link} from 'react-router-dom';
import styles from './NavBar.module.css';
import {ThemeToggle} from "../ThemeToogle/ThemeToggle.tsx";

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <Link to="/" className={styles.brandLink}>
                    <div className={styles.logo}>
                        <span className={styles.logoText}>W</span>
                    </div>
                    <span className={styles.brandName}>
                        Wealth<span className={styles.brandNameSpan}>Tracker</span>
                    </span>
                </Link>

                <div className={styles.navLinks}>
                    <ThemeToggle/>
                    <Link to="/login" className={styles.signInLink}>
                        Sign In
                    </Link>
                    <Link
                        to="/Register"
                        className={styles.getStartedLink}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;