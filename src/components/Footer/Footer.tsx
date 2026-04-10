import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>

                    {/* Brand Column */}
                    <div className={styles.brandColumn}>
                        <Link to="/" className={styles.brandLink}>
                            <div className={styles.logo}>
                                <span className={styles.logoText}>W</span>
                            </div>
                            <span className={styles.brandName}>
                                Wealth<span className={styles.brandNameSpan}>Tracker</span>
                            </span>
                        </Link>
                        <p className={styles.tagline}>
                            Stop being bad at money. Start tracking your wealth with
                            the most modern tool built for the next generation.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className={styles.navColumn}>
                        <h4>Product</h4>
                        <ul className={styles.navList}>
                            <li><Link to="/" className={styles.navLink}>Features</Link></li>
                            <li><Link to="/" className={styles.navLink}>Security</Link></li>
                            <li><Link to="/" className={styles.navLink}>Pricing</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className={styles.navColumn}>
                        <h4>Legal</h4>
                        <ul className={styles.navList}>
                            <li><Link to="/" className={styles.navLink}>Privacy Policy</Link></li>
                            <li><Link to="/" className={styles.navLink}>Terms of Use</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    <p className={styles.copyright}>
                        © {currentYear} WealthTracker. Built for your financial freedom.
                    </p>
                    <div className={styles.socialLinks}>
                        <span className={styles.socialLink}>Twitter</span>
                        <span className={styles.socialLink}>GitHub</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;