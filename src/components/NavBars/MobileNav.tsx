import {Link, useLocation} from 'react-router-dom';
import {useAuth} from '../../hooks/useAuth';
import styles from './MobileNav.module.css';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';

export const MobileNav = () => {
    const location = useLocation();
    const {logout} = useAuth();
    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className={styles.nav}>
            <Link to="/DashBoard" className={`${styles.navLink} ${isActive('/DashBoard') ? styles.active : ''}`}>
                <SpaceDashboardOutlinedIcon/>
                <span className={styles.navLinkText}>Dash</span>
            </Link>

            <Link to="/Transactions" className={`${styles.navLink} ${isActive('/Transactions') ? styles.active : ''}`}>
                <AccountBalanceWalletOutlinedIcon/>
                <span className={styles.navLinkText}>Transactions</span>
            </Link>

            <Link to="/Categories" className={`${styles.navLink} ${isActive('/Categories') ? styles.active : ''}`}>
                <CategoryOutlinedIcon/>
                <span className={styles.navLinkText}>Categories</span>
            </Link>

            <Link to="/Goals" className={`${styles.navLink} ${isActive('/Goals') ? styles.active : ''}`}>
                <TrackChangesOutlinedIcon/>
                <span className={styles.navLinkText}>Goals</span>
            </Link>

            <button
                onClick={logout}
                className={styles.logoutButton}
            >
                <span className={styles.navLinkText}>Exit</span>
            </button>
        </nav>
    );
};