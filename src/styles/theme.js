// styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#821101", // Set your primary color
			light: "#ff5131",
			dark: "#4b0000",
		},
		secondary: {
			main: "#dc004e", // Set your secondary color
			light: "#e33371",
			dark: "#9a0036",
		},
		background: {
			default: "#f4f6f8", // Background color
		},
		text: {
			primary: "#333", // Text color
			secondary: "#666",
		},
	},
	typography: {
		fontFamily: "Urbanist, sans-serif", // Set your font-family
		// Additional typography customization
	},
});

export default theme;
