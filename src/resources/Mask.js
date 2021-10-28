import React from "react";
import { useTheme } from "@mui/material";
import config from "../config.json";

export default function Mask(props) {
  const small = props.small;
  const left = props.left;
  const theme = useTheme();
  return (
    <div
      style={{
        fontWeight: 669,
        fontSize: "24px",
        color: theme.palette.text.primary,
        cursor: "pointer",
        textAlign: left ? "" : "center",
        paddingLeft: left && "24px"
      }}
    >
      <span role="img" aria-label={`${config.appIdentity.title}'s Mask`}>
        {config.appIdentity.mask}
      </span>
      {!small && (
        <span style={{ fontSize: "18px", marginLeft: "3px" }}>
          {config.appIdentity.title}
        </span>
      )}
    </div>
  );
}
