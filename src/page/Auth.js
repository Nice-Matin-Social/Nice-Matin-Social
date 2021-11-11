import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Backdrop, Button, Paper, Typography, useTheme } from "@mui/material";
import Mask from "../resources/Mask";
import MBLogo from "../resources/moneybutton.png";
import RelayLogo from "../resources/relay.png";
import HandCashLogo from "../resources/handcash.png";
import config from "../config.json";
import { TwetchLogin } from "../wallets/twetch";
import { MBLogin } from "../wallets/moneybutton";
import { RelayXLogin } from "../wallets/relayx";
import { HandCashLogin } from "../wallets/handcash";
import { twquery } from "../api/TwetchGraph";

export default function Auth() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const selectWallet = (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        maxHeight: "100vh",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          userSelect: "none"
        }}
      ></div>
      <div
        style={{
          transform: "none",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          maxHeight: "50vh",
          flexSirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            padding: "16px",
            background: "#F6F5FB",
            borderRadius: "12px 12px 0 0"
          }}
        >
          <Typography
            variant="body1"
            style={{
              color: "#010101",
              fontSize: "18px",
              fontWeight: "bold",
              lineHeight: "24px"
            }}
          >
            Select Wallet
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            style={{
              color: "#838388",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px"
            }}
          >
            Cancel
          </Typography>
        </div>
        <div
          style={{
            flexGrow: 1,
            background: "#FFFFFF",
            overflowY: "auto"
          }}
        >
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={RelayXLogin}
          >
            <img
              src={RelayLogo}
              alt="RelayX"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              RelayX
            </Typography>
          </div> */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={() => {
              MBLogin(() => {
                history.replace("/");
              });
            }}
          >
            <img
              src={MBLogo}
              alt="MoneyButton"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              MoneyButton
            </Typography>
          </div>
          {/* <div
            style={{
              cursor: "pointer",
              display: "flex",
              padding: "10px",
              borderTop: "1px solid #F0F0F6"
            }}
            onClick={HandCashLogin}
          >
            <img
              src={HandCashLogo}
              alt="HandCash"
              style={{ height: "32px", width: "32px" }}
            />
            <Typography
              variant="body1"
              style={{
                color: "#010101",
                fontSize: "16px",
                lineHeight: "34px",
                marginLeft: "10px"
              }}
            >
              HandCash
            </Typography>
          </div> */}
        </div>
      </div>
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        display: "flex",
        padding: "0 16px",
        maxWidth: "100%",
        maxHeight: "100%",
        flexDirection: "column"
      }}
    >
      <div style={{ flexGrow: 1 }} />
      <Paper
        elevation={9}
        style={{
          width: "600px",
          margin: "0 auto",
          padding: "36px 44px",
          maxWidth: "100%",
          borderRadius: "6px"
        }}
      >
        <Mask style={{ alignContent: "center" }} />
        <Typography
          variant="body1"
          style={{
            paddingTop: "21px",
            margin: "0 auto",
            fontSize: "18px",
            textAlign: "center",
            lineHeight: "20px"
          }}
        >
          {config.appIdentity.subtitle}
        </Typography>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <Button
            style={{
              color: "white",
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              boxShadow: "none !important",
              fontWeight: 600,
              lineHeight: "24px",
              borderRadius: "6px",
              textTransform: "none"
            }}
            variant="contained"
            color="primary"
            onClick={TwetchLogin}
          >
            Log in with Twetch
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <Button
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              boxShadow: "none !important",
              fontWeight: 600,
              lineHeight: "24px",
              borderRadius: "6px",
              textTransform: "none",
              textAlign: "center"
            }}
            variant="outlined"
            color="primary"
            onClick={handleDrawerToggle}
          >
            Log in with wallet provider
          </Button>
        </div>
        <div
          style={{
            width: "100%",
            margin: "20px auto 0 auto",
            display: "block",
            maxWidth: "300px"
          }}
        >
          <div
            style={{
              width: "100%",
              margin: "20px auto 0 auto",
              display: "block",
              maxWidth: "300px"
            }}
          >
            <Typography
              variant="body1"
              style={{
                margin: "0 auto",
                fontSize: "18px",
                textAlign: "center",
                lineHeight: "20px"
              }}
            >
              Don't have a Twetch account yet? Grab an invite{" "}
              <a
                className="Links"
                href={config.ownerInfo.inviteLink}
                target="_blank"
                rel="noreferrer"
              >
                <span style={{ color: theme.palette.primary.main }}>here</span>
              </a>
            </Typography>
          </div>
        </div>
      </Paper>
      <div style={{ flexGrow: 1 }} />
      <Backdrop
        style={{
          opacity: 1,
          transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          width: "100%",
          height: "100%",
          zIndex: 1400,
          position: "absolute",
          background: "rgba(26, 26, 28, .5)",
          userSelect: "none"
        }}
        open={open}
        onClick={() => setOpen(false)}
      >
        {selectWallet}
      </Backdrop>
    </div>
  );
}
