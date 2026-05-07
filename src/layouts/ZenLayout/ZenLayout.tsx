import React from 'react';
import {useLocation} from 'react-router-dom';

import styles from './ZenLayout.module.css';
import {MobileNav} from "../../components/NavBars/MobileNav.tsx";
import Sidebar from "../../components/NavBars/Sidebar.tsx";
import {useMediaQuery} from "../../hooks/useMediaQuery.ts";

const ZenLayout = ({children}: { children: React.ReactNode }) => {
    const {pathname} = useLocation();

    const isMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className={styles.layout}>
            {isMobile ? <MobileNav/> : <Sidebar/>}

            <div className={styles.mainWrapper}>
                <main className={styles.content} key={pathname}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ZenLayout;