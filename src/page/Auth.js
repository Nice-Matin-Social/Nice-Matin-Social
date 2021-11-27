import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Backdrop, Button, Paper, Typography, useTheme } from "@mui/material";
import Mask from "../resources/Mask";
import auth from "../utils/auth";
import config from "../config.json";
import { TwetchLogin } from "../wallets/twetch";

export default function Auth() {
  const history = useHistory();
  const theme = useTheme();

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
            Se Connecter avec Twetch
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
            href={config.ownerInfo.inviteLink}
            target="_blank"
          >
            Je n'ai pas de compte Twetch
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
            <div
              className="Links"
              style={{ cursor: "pointer" }}
              onClick={() => {
                auth.anon(() => {
                  history.push("/");
                });
              }}
            >
              <Typography
                variant="body1"
                style={{
                  color: theme.palette.primary.main,
                  margin: "0 auto",
                  fontSize: "18px",
                  textAlign: "center",
                  lineHeight: "20px"
                }}
              >
                Naviguer anonymement
              </Typography>
            </div>
          </div>
        </div>
      </Paper>
      <div style={{ flexGrow: 1 }} />
    </div>
  );
}
