import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Helmet } from "react-helmet";
import config from "./config.json";
import Logo from "./resources/Logo.png";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Helmet>
      <meta charset="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta property="og:site_name" content={config.appIdentity.title} />
      <meta property="og:title" content={config.appIdentity.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={config.appIdentity.subtitle} />
      <meta name="description" content={config.appIdentity.subtitle} />
      <meta property="og:image" content={Logo} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="800" />
      <meta property="og:url" content={config.appIdentity.url} />
      <link rel="icon" href={Logo} />
      <link rel="apple-touch-icon" sizes="512x512" href={Logo} />
      <title>{config.appIdentity.title}</title>
    </Helmet>
    <CssBaseline />
    <App />
  </BrowserRouter>,
  rootElement
);
