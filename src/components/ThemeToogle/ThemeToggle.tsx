import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import styles from './ThemeToggle.module.css';
import {useTheme} from '../../hooks/useTheme';

export const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={styles.container}>
            <div className={styles.icons}>
                <DarkModeOutlinedIcon className={`${styles.icon} ${theme === 'dark' ? styles.active : ''}`}/>
                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        onChange={toggleTheme}
                        checked={theme === 'light'}
                    />
                    <span className={styles.slider}></span>
                </label>
                <LightModeOutlinedIcon className={`${styles.icon} ${theme === 'light' ? styles.active : ''}`}/>
            </div>


        </div>
    );
};