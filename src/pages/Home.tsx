import styles from './Home.module.css';

export const Home = () => {
    return (
        <div className={styles.home}>
            <div className={styles.backgroundGlow} />

            <div className={styles.container}>
                <h1 className={styles.title}>
                    Trouble with money? <br />
                    <span className={styles.highlight}>
                        WealthTracker can help.
                    </span>
                </h1>
                <p className={styles.subtitle}>
                    The modern way to track your finances. Start your free trial and finally get good at money.
                </p>
                <button className={styles.ctaButton}>
                    Start Your Free Trial
                </button>
            </div>

            <div className={styles.waveContainer}>
                <svg
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.waveSvg}
                >
                    <path
                        fill="var(--bg-surface)"
                        fillOpacity="1"
                        d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,218.7C960,235,1056,213,1152,186.7C1248,160,1344,128,1392,112L1440,96V320H0Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};