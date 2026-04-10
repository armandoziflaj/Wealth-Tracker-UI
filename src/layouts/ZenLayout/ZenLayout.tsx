import {useLocation} from "react-router-dom";
import styles from "./ZenLayout.module.css";
import {MobileNav} from "../../components/NavBars/MobileNav.tsx";
import Sidebar from "../../components/NavBars/Sidebar.tsx";

const ZenLayout = ({children}: { children: React.ReactNode }) => {
    const {pathname} = useLocation();

    return (
        <div className={styles.layout}>
            <Sidebar/>
            <MobileNav/>

            <div className={styles.mainWrapper} key={pathname}>
                <main className={styles.content}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ZenLayout;