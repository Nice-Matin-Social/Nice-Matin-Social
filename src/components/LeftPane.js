import React from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import StarsOutlinedIcon from "@mui/icons-material/StarsOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import Mask from "../resources/Mask";

import Notifications from "./Notifications";
import Messages from "./Messages";

export default function LeftPane(props) {
  const selected = props.currentTab;
  const theme = useTheme();
  const isSelected = (tab) => {
    if (tab === selected) {
      return "primary";
    } else {
      return;
    }
  };

  return (
    <div
      style={{
        top: "0px",
        flex: "1 1 0px",
        height: "100vh",
        position: "sticky",
        maxWidth: "380px",
        minWidth: "300px",
        padding: "20px 0px 25px 45px",
        zIndex: 1,
        overflowX: "hidden",
        overflowY: "auto",
        borderRight: `1px solid ${theme.palette.divider}`
      }}
    >
      <div>
        <div
          style={{
            overflowY: "auto",
            paddingTop: "16px"
          }}
        >
          <div style={{ paddingBottom: "35px" }}>
            <Link
              style={{
                margin: 0,
                fontSize: "22px",
                fontWeight: "bold",
                textDecoration: "none"
              }}
              to="/"
            >
              <Mask left />
            </Link>
          </div>
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            {localStorage.tokenTwetchAuth !== "anon" ? (
              <div style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <Avatar
                    style={{
                      cursor: "pointer",
                      background: "rgba(0, 0, 0, .5)",
                      transition: "height .2s ease, width .2s ease",
                      borderRadius: "100%",
                      width: "46px",
                      height: "46px",
                      display: "inline-block",
                      marginRight: "16px"
                    }}
                    src={localStorage.getItem("icon")}
                    alt={`Avatar de ${localStorage.getItem("name")}`}
                  />
                  <div style={{ maxWidth: "111px" }}>
                    <Link
                      className="Links"
                      to={`/u/${localStorage.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Typography
                        style={{
                          color: theme.palette.text.primary,
                          fontWeight: "bold"
                        }}
                        variant="body1"
                      >
                        {localStorage.name}
                      </Typography>
                    </Link>
                    <Typography style={{ color: "#828282" }} variant="body1">
                      @{localStorage.id}
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    color: "#000000",
                    display: "flex"
                  }}
                ></div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/auth"
                  style={{ textTransform: "none" }}
                >
                  Se Connecter
                </Button>
              </div>
            )}
          </div>
          <div style={{ marginTop: "15px" }}></div>
          <div
            style={{
              paddingLeft: "24px"
            }}
          >
            <div>
              <List style={{ marginLeft: "-16px" }}>
                {localStorage.tokenTwetchAuth !== "anon" && (
                  <ListItem button component={Link} to="/notifications">
                    <ListItemIcon>
                      <Notifications color={isSelected("Notifications")} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography
                        variant="body1"
                        color={isSelected("Notifications")}
                      >
                        Notifications
                      </Typography>
                    </ListItemText>
                  </ListItem>
                )}
                {localStorage.tokenTwetchAuth !== "anon" && (
                  <ListItem
                    button
                    component="a"
                    href="https://twetch.app/chat/home"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ListItemIcon>
                      <Messages color={isSelected("Chat")} />
                    </ListItemIcon>
                    <ListItemText>
                      <Typography variant="body1" color={isSelected("Chat")}>
                        Chat
                      </Typography>
                    </ListItemText>
                  </ListItem>
                )}
                <ListItem button component={Link} to="/">
                  <ListItemIcon>
                    <HomeOutlinedIcon color={isSelected("Home")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Home")}>
                      Accueil
                    </Typography>
                  </ListItemText>
                </ListItem>
                <ListItem button component={Link} to="/settings">
                  <ListItemIcon>
                    <SettingsIcon color={isSelected("Settings")} />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography variant="body1" color={isSelected("Settings")}>
                      Réglages
                    </Typography>
                  </ListItemText>
                </ListItem>
              </List>
            </div>
          </div>
          <div>
            <Button
              component={Link}
              to="/compose"
              style={{
                height: "35px",
                overflow: "hidden",
                fontSize: "18px",
                fontWeight: 600,
                paddingLeft: "4px",
                paddingRight: "14px",
                textTransform: "none"
              }}
              variant="contained"
              color="primary"
              startIcon={
                <div
                  style={{
                    display: "flex",
                    padding: "8px 11px",
                    marginLeft: "-4px",
                    marginRight: "13px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <AddCircleOutlineRoundedIcon
                    style={{
                      height: "18px",
                      width: "18px"
                    }}
                  />
                </div>
              }
            >
              Créer un Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
