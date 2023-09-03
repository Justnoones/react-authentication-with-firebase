import { useContext } from "react";
import { ThemeContext } from '../context/ThemeContext';

export default function useTheme () {
    const contexts = useContext(ThemeContext);
    if (contexts === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return contexts;
}