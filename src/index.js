import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import config from "./config.json";

import App from "./App";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e7ab3e",
      main: config.customization.palette.primary.main,
      dark: "#7d5000"
    },
    secondary: {
      light: "#72ff51",
      main: config.customization.palette.secondary.main,
      dark: "#00b400"
    }
  }
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  rootElement
);
