import {ZenButton} from "../ZenButton/ZenButton.tsx";
import {useAuth} from "../../hooks/useAuth.ts";
import styles from './Sidebar.module.css';
import {Link} from "react-router-dom";
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import {CloudUpload} from '@mui/icons-material';
import {ThemeToggle} from "../ThemeToogle/ThemeToggle.tsx";


const Sidebar = () => {
    const {logout} = useAuth();

    return (
        <aside className={styles.sidebar}>
            <div className={styles.brand}>
                <h2 className={styles.brandName}>
                    Wealth<span className={styles.brandNameSpan}>Tracker</span>
                </h2>
            </div>

            <nav className={styles.nav}>
                <Link to="/Dashboard">
                    <ZenButton
                        variant="ghost"
                        className={styles.navButton}
                        icon={<SpaceDashboardOutlinedIcon/>}
                    >

                        Dashboard
                    </ZenButton>
                </Link>
                <Link to="/Transactions">
                    <ZenButton
                        variant="ghost"
                        className={styles.navButton}
                        icon={<AccountBalanceWalletOutlinedIcon/>}>
                        Transactions
                    </ZenButton>
                </Link>
                <Link to="/Categories">
                    <ZenButton
                        variant="ghost"
                        className={styles.navButton}
                        icon={<CategoryOutlinedIcon/>}
                    >
                        Categories
                    </ZenButton>
                </Link>
                <Link to="/DataUpload">
                    <ZenButton
                        variant="ghost"
                        className={styles.navButton}
                        icon={<CloudUpload/>}
                    >
                        Data Upload
                    </ZenButton>
                </Link>
            </nav>

            <div className={styles.footer}>
                <ZenButton variant="outline" size="sm" className={styles.upgradeButton}>
                    Upgrade Pro
                </ZenButton>

                <ThemeToggle/>
                <ZenButton
                    variant="ghost"
                    onClick={logout}
                >
                    Logout
                </ZenButton>
            </div>
        </aside>
    );
};
export default Sidebar