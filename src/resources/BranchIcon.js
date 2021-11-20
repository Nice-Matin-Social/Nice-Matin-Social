import React, { useState, useEffect } from "react";
import { Button, Drawer, IconButton, Paper, SvgIcon, Typography, useTheme } from "@mui/material";
import config from "../config.json";
const Twetch = require("@twetch/sdk");

export default function BranchIcon(props) {
  const window1 = props.window;
  const theme = useTheme();
  const txId = props.tx;
  const container =
    window1 !== undefined ? () => window().document.body : undefined;
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(props.count);
  const [branchCalc, setBranchCalc] = useState(props.branchedCalc);
  const ticker = config.customization.ticker;
  const twetch = new Twetch({
    clientIdentifier: config.ownerInfo.clientIdentifier
  });
  const exchangeRate = twetch.Helpers.exchangeRate.price;
  const dolAmount = 0.02;
  const bitAmount = parseFloat(dolAmount / exchangeRate).toFixed(8);


  useEffect(() => {
    const pKey = twetch.crypto.privFromMnemonic(localStorage.mnemonic);
    twetch.wallet.restore(pKey);
  }, [count, branchCalc]);

  const handleClick = (e) => {
    e.stopPropagation();

    if(localStorage.tokenTwetchAuth ==="anon"){
      alert("Please, Log In!")
      return
    }
    if (localStorage.isOneClick === "true") {
      branchPost(txId);
    } else {
      setOpen(true);
    }
  } 

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handle1Click = (e) => {
    e.stopPropagation();
    branchPost(txId)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => console.log(err));
  };

  const pay = (
    <main>
      <div
        style={{
          height: "100%",
          width: "100vw",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          bottom: 0
        }}
      >
        <div
          style={{
            display: "flex",
            position: "fixed",
            bottom: 0,
            width: "100%"
          }}
        >
          <div style={{ flexGrow: 1 }}></div>
          <Paper
            style={{
              width: "600px",
              maxWidth: "calc(100% - 24px)",
              borderRadius: "6px 6px 0 0"
            }}
          >
            <Paper elevation={3} style={{ padding: "16px", display: "flex" }}>
              <Typography
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  fontSize: "22px",
                  textDecoration: "none"
                }}
              >
                Twetch
                <span
                  style={{
                    color: theme.palette.primary.main,
                    fontSize: "16px"
                  }}
                >
                  Pay
                </span>
              </Typography>
              <div style={{ flexGrow: 1 }} />
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "21px",
                  color: "#bdbdbd",
                  margin: 0,
                  fontWeight: "normal",
                  cursor: "pointer"
                }}
                onClick={handleDrawerToggle}
              >
                Close
              </p>
            </Paper>
            <div
              id="detail"
              style={{
                padding: "16px",
                borderTop: `2px solid ${theme.palette.divider}`
              }}
            >
              <div
                style={{
                  margin: "0 0 26px 0",
                  borderRadius: "6px"
                }}
              >
                <Typography
                  style={{
                    color: theme.palette.text.primary,
                    margin: "0 auto",
                    fontSize: "36px",
                    textAlign: "center",
                    fontWeight: 600,
                    lineHeight: "44px"
                  }}
                  variant="h3"
                >
                  ${dolAmount}
                </Typography>
                <Typography
                  sx={{
                    color: theme.palette.text.secondary,
                    margin: "0 auto",
                    fontSize: "16px",
                    marginTop: "2px",
                    textAlign: "center",
                    lineHeight: "20px",
                    marginBottom: "18px"
                  }}
                  variant="h6"
                >
                  {bitAmount} BSV
                </Typography>
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ flexGrow: 1 }} />
              <Button
                style={{
                  width: "257px",
                  padding: "14px",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineWeight: "24px",
                  textTransform: "none"
                }}
                color="primary"
                variant="contained"
                onClick={handle1Click}
              >
                Twetch It!
              </Button>
              <div style={{ flexGrow: 1 }} />
            </div>
            <div style={{ height: "10vh" }} />
          </Paper>
          <div style={{ flexGrow: 1 }}></div>
        </div>
      </div>
    </main>
  );

  return (
    <div>
    <div>
        <IconButton
          onClick={handleClick}
        >
          <SvgIcon className="Branches" focusable="false" viewBox="0 0 21 21" aria-hidden="true">
            {branchCalc > 0 ? <path d="M21.7224 1.96954C21.4448 1.69193 21.0978 1.41433 20.7508 1.20613H20.6814C18.53 -0.112482 15.7539 -0.181883 13.6025 1.20613C11.7981 2.31654 10.6183 4.32916 10.5489 6.48058C9.64669 5.43957 8.46688 4.74556 7.07886 4.39856C6.31546 4.19036 5.55205 4.19036 4.85804 4.25976C4.51104 4.25976 4.16404 4.32916 3.81703 4.46796L0.555205 5.43957C0.208202 5.50897 0 5.85597 0 6.20297C0 6.61938 0.0694006 7.03578 0.138801 7.38279C0.138801 7.38279 0.138801 7.38279 0.138801 7.45219C0.694006 9.95061 2.63722 11.8938 5.13565 12.449C5.69085 12.5878 6.17666 12.6572 6.66246 12.6572C8.05047 12.6572 9.36909 12.2408 10.5489 11.408V18.0705C10.5489 18.4869 10.8959 18.8339 11.3123 18.8339C11.7287 18.8339 12.0757 18.4869 12.0757 18.0705V8.7708C12.8391 9.0484 13.6719 9.1872 14.4353 9.1872C15.6845 9.1872 16.8644 8.8402 17.9748 8.14619C18.5994 7.72979 19.1546 7.24398 19.6404 6.68878C19.8486 6.41118 20.0568 6.13357 20.265 5.78657L21.8612 2.80234C22.0694 2.59414 22 2.17774 21.7224 1.96954Z" fill="#1BBA59"></path> :<path d="M20.2753 2.02642C20.0183 1.78817 19.697 1.54992 19.3757 1.37124H19.3114C17.3194 0.239559 14.749 0.179997 12.7569 1.37124C11.0862 2.32423 9.99379 4.05153 9.92953 5.89795C9.09416 5.00452 8.00175 4.4089 6.71657 4.11109C6.00971 3.93241 5.30286 3.93241 4.66027 3.99197C4.33897 3.99197 4.01767 4.05153 3.69638 4.17065L0.676184 5.00452C0.354888 5.06409 0.162109 5.3619 0.162109 5.65971C0.162109 6.01708 0.226369 6.37445 0.290628 6.67226C0.290628 6.67226 0.290628 6.67226 0.290628 6.73182C0.804703 8.87606 2.60397 10.5438 4.9173 11.0203C5.43138 11.1394 5.88119 11.199 6.33101 11.199C7.6162 11.199 8.83713 10.8416 9.92953 10.1269V15.8448C9.92953 16.2022 10.2508 16.5 10.6364 16.5C11.0219 16.5 11.3432 16.2022 11.3432 15.8448V7.8635C12.0501 8.10175 12.8212 8.22087 13.5281 8.22087C14.6847 8.22087 15.7771 7.92306 16.8053 7.32744C17.3836 6.97007 17.8977 6.55314 18.3475 6.07664C18.5403 5.83839 18.7331 5.60014 18.9258 5.30233L20.4038 2.74117C20.5966 2.56248 20.5323 2.20511 20.2753 2.02642ZM5.30286 9.70993C3.56786 9.35255 2.15415 8.04219 1.76859 6.43401C1.76859 6.43401 1.76859 6.43401 1.76859 6.37445C1.76859 6.31489 1.70433 6.19576 1.70433 6.1362L4.08193 5.48102C4.27471 5.42146 4.53175 5.3619 4.78878 5.3619C5.30286 5.30233 5.81694 5.3619 6.33101 5.42146C8.00175 5.77883 9.28694 6.91051 9.80102 8.39956C8.64435 9.5908 6.90934 10.0673 5.30286 9.70993ZM17.6407 4.70671C17.5121 4.8854 17.3836 5.06409 17.2551 5.24277C16.9338 5.60014 16.5483 5.95752 16.0984 6.19577C14.6847 7.02963 12.8212 7.0892 11.3432 6.31489C11.279 4.76628 12.1144 3.27722 13.5281 2.44336C15.0703 1.54992 16.9981 1.54992 18.5403 2.44336C18.6046 2.50292 18.6688 2.50292 18.7331 2.56248L17.6407 4.70671Z" fill="#696969"></path>}
          </SvgIcon>
        </IconButton>
        <Typography
          className="hoverRed"
          sx={{ color: branchCalc > 0 ? "#1BBA59" : "inherit" }}
          component="span"
          variant="body1"
        >
          {count}
        </Typography>
      </div>
      <Drawer
      style={{
        position: "fixed",
        inset: "0px"
      }}
      anchor="bottom"
      container={container}
      ModalProps={{
        keepMounted: true // Better open performance on mobile.
      }}
      onClose={handleDrawerToggle}
      open={open}
      variant="temporary"
    >
      {pay}
    </Drawer></div>
    
  );
  async function branchPost(tx){
    twetch.publish('twetch/post@0.0.1', {
      bContent: `https://twetch.app/t/${tx}`,
      mapComment: ticker
  });
  }
}

