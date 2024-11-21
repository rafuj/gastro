import "@/styles/globals.css";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../styles/theme";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
