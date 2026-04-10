import {Box, Typography, ButtonBase} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./ColorSelector.module.css";

const ZEN_COLORS = [
    "#C6FF5E", "#3B82F6", "#A855F7", "#EC4899",
    "#F59E0B", "#10B981", "#FF4D4D"
];

interface ColorSelectorProps {
    selectedColor: string;
    onSelect: (color: string) => void;
    required?: boolean;
}

import AddIcon from '@mui/icons-material/Add';
import {useRef} from 'react';

export const ColorSelector = ({selectedColor, onSelect, required}: ColorSelectorProps) => {
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const isCustomColor = Boolean(selectedColor) && !ZEN_COLORS.includes(selectedColor);
    return (
        <Box className={styles.container}>
            <Typography className={styles.label}>Category Color *</Typography>
            <Box className={styles.grid}>
                {ZEN_COLORS.map((color) => (
                    <ButtonBase
                        key={color}
                        onClick={() => onSelect(color)}
                        className={`${styles.swatch} ${selectedColor === color ? styles.active : ""}`}
                        style={{backgroundColor: color}}
                    >
                        {selectedColor === color && <CheckIcon className={styles.check}/>}
                    </ButtonBase>
                ))}

                <ButtonBase
                    className={`${styles.swatch} ${styles.customBtn} ${isCustomColor ? styles.active : ""}`}
                    style={{backgroundColor: isCustomColor ? selectedColor : 'transparent'}}
                    onClick={() => hiddenInputRef.current?.click()}
                >
                    {isCustomColor ? <CheckIcon className={styles.check}/> : <AddIcon/>}

                    <input
                        ref={hiddenInputRef}
                        type="color"
                        value={selectedColor}
                        onChange={(e) => onSelect(e.target.value)}
                        style={{position: 'absolute', opacity: 0, width: 0, height: 0}}
                        required={required}
                    />
                </ButtonBase>
            </Box>
        </Box>
    );
};