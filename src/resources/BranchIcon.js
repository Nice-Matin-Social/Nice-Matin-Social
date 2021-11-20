import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Drawer, IconButton, LinearProgress, Paper, Menu,MenuItem, SvgIcon, Typography, useTheme, ListItemIcon, ListItemText } from "@mui/material";
import config from "../config.json";
const Twetch = require("@twetch/sdk");

export default function BranchIcon(props) {
  const window1 = props.window;
  const theme = useTheme();
  const txId = props.tx;
  const history = useHistory();
  const container =
    window1 !== undefined ? () => window().document.body : undefined;
  const [anchorEl, setAnchorEl] = useState(null);  
  const [action, setAction] = useState("");
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(props.count);
  const [loading, setLoading] = useState(false)
  const [branchCalc, setBranchCalc] = useState(props.branchedCalc);
  const ticker = config.customization.ticker;
  const twetch = new Twetch({
    clientIdentifier: config.ownerInfo.clientIdentifier
  });
  const exchangeRate = twetch.Helpers.exchangeRate.price;
  const dolAmount=0.03;
  const bitAmount = parseFloat(dolAmount / exchangeRate).toFixed(8);

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  useEffect(() => {
    const pKey = twetch.crypto.privFromMnemonic(localStorage.mnemonic);
    twetch.wallet.restore(pKey);
  }, [count, branchCalc]);


  const handleClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget)

    return;
  } 

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

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
      {loading && <LinearProgress/>}
    <div>
        <IconButton
          aria-describedby={id}
          onClick={handleClick}
        >
          <SvgIcon className="Branches" focusable="false" viewBox="0 0 21 21" aria-hidden="true">
            {branchCalc > 0 ? <path d="M21.7224 1.96954C21.4448 1.69193 21.0978 1.41433 20.7508 1.20613H20.6814C18.53 -0.112482 15.7539 -0.181883 13.6025 1.20613C11.7981 2.31654 10.6183 4.32916 10.5489 6.48058C9.64669 5.43957 8.46688 4.74556 7.07886 4.39856C6.31546 4.19036 5.55205 4.19036 4.85804 4.25976C4.51104 4.25976 4.16404 4.32916 3.81703 4.46796L0.555205 5.43957C0.208202 5.50897 0 5.85597 0 6.20297C0 6.61938 0.0694006 7.03578 0.138801 7.38279C0.138801 7.38279 0.138801 7.38279 0.138801 7.45219C0.694006 9.95061 2.63722 11.8938 5.13565 12.449C5.69085 12.5878 6.17666 12.6572 6.66246 12.6572C8.05047 12.6572 9.36909 12.2408 10.5489 11.408V18.0705C10.5489 18.4869 10.8959 18.8339 11.3123 18.8339C11.7287 18.8339 12.0757 18.4869 12.0757 18.0705V8.7708C12.8391 9.0484 13.6719 9.1872 14.4353 9.1872C15.6845 9.1872 16.8644 8.8402 17.9748 8.14619C18.5994 7.72979 19.1546 7.24398 19.6404 6.68878C19.8486 6.41118 20.0568 6.13357 20.265 5.78657L21.8612 2.80234C22.0694 2.59414 22 2.17774 21.7224 1.96954Z" fill="#1BBA59"></path> :<path d="M20.2753 2.02642C20.0183 1.78817 19.697 1.54992 19.3757 1.37124H19.3114C17.3194 0.239559 14.749 0.179997 12.7569 1.37124C11.0862 2.32423 9.99379 4.05153 9.92953 5.89795C9.09416 5.00452 8.00175 4.4089 6.71657 4.11109C6.00971 3.93241 5.30286 3.93241 4.66027 3.99197C4.33897 3.99197 4.01767 4.05153 3.69638 4.17065L0.676184 5.00452C0.354888 5.06409 0.162109 5.3619 0.162109 5.65971C0.162109 6.01708 0.226369 6.37445 0.290628 6.67226C0.290628 6.67226 0.290628 6.67226 0.290628 6.73182C0.804703 8.87606 2.60397 10.5438 4.9173 11.0203C5.43138 11.1394 5.88119 11.199 6.33101 11.199C7.6162 11.199 8.83713 10.8416 9.92953 10.1269V15.8448C9.92953 16.2022 10.2508 16.5 10.6364 16.5C11.0219 16.5 11.3432 16.2022 11.3432 15.8448V7.8635C12.0501 8.10175 12.8212 8.22087 13.5281 8.22087C14.6847 8.22087 15.7771 7.92306 16.8053 7.32744C17.3836 6.97007 17.8977 6.55314 18.3475 6.07664C18.5403 5.83839 18.7331 5.60014 18.9258 5.30233L20.4038 2.74117C20.5966 2.56248 20.5323 2.20511 20.2753 2.02642ZM5.30286 9.70993C3.56786 9.35255 2.15415 8.04219 1.76859 6.43401C1.76859 6.43401 1.76859 6.43401 1.76859 6.37445C1.76859 6.31489 1.70433 6.19576 1.70433 6.1362L4.08193 5.48102C4.27471 5.42146 4.53175 5.3619 4.78878 5.3619C5.30286 5.30233 5.81694 5.3619 6.33101 5.42146C8.00175 5.77883 9.28694 6.91051 9.80102 8.39956C8.64435 9.5908 6.90934 10.0673 5.30286 9.70993ZM17.6407 4.70671C17.5121 4.8854 17.3836 5.06409 17.2551 5.24277C16.9338 5.60014 16.5483 5.95752 16.0984 6.19577C14.6847 7.02963 12.8212 7.0892 11.3432 6.31489C11.279 4.76628 12.1144 3.27722 13.5281 2.44336C15.0703 1.54992 16.9981 1.54992 18.5403 2.44336C18.6046 2.50292 18.6688 2.50292 18.7331 2.56248L17.6407 4.70671Z" fill="#696969"></path>}
          </SvgIcon>
        </IconButton>
        <Menu
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        
      >
          {/* <MenuItem style={{
                display: "flex",
                alignItems: "center",
                width: "100%"
          }} onClick={(e)=>{
            e.stopPropagation()
            setAnchorEl(null);
            if(localStorage.tokenTwetchAuth ==="anon"){
              alert("Please, Log In!")
              return
            }
            if (localStorage.isOneClick === "true") {
              branchLikePost(txId);
            } else {
              setAction("BranchLike")
              setOpen(true);
            }
            }}>
            <ListItemIcon style={{marginLeft:"-9px"}}><SvgIcon viewBox="0 0 32 32" fill="none" class="BranchModalItem_icon__Zy7MG"><path d="M25.9362 9.52642C25.6791 9.28817 25.3578 9.04992 25.0366 8.87124H24.9723C22.9803 7.73956 20.4099 7.68 18.4178 8.87124C16.7471 9.82423 15.6547 11.5515 15.5904 13.398C14.7551 12.5045 13.6626 11.9089 12.3775 11.6111C11.6706 11.4324 10.9637 11.4324 10.3212 11.492C9.99986 11.492 9.67856 11.5515 9.35726 11.6707L6.33707 12.5045C6.01578 12.5641 5.823 12.8619 5.823 13.1597C5.823 13.5171 5.88726 13.8745 5.95152 14.1723C5.95152 14.1723 5.95152 14.1723 5.95152 14.2318C6.46559 16.3761 8.26485 18.0438 10.5782 18.5203C11.0923 18.6394 11.5421 18.699 11.9919 18.699C13.2771 18.699 14.498 18.3416 15.5904 17.6269V23.3448C15.5904 23.7022 15.9117 24 16.2973 24C16.6828 24 17.0041 23.7022 17.0041 23.3448V15.3635C17.711 15.6018 18.4821 15.7209 19.1889 15.7209C20.3456 15.7209 21.438 15.4231 22.4662 14.8274C23.0445 14.4701 23.5586 14.0531 24.0084 13.5766C24.2012 13.3384 24.394 13.1001 24.5867 12.8023L26.0647 10.2412C26.2575 10.0625 26.1932 9.70511 25.9362 9.52642ZM10.9637 17.2099C9.22874 16.8526 7.81504 15.5422 7.42948 13.934C7.42948 13.934 7.42948 13.934 7.42948 13.8745C7.42948 13.8149 7.36522 13.6958 7.36522 13.6362L9.74282 12.981C9.9356 12.9215 10.1926 12.8619 10.4497 12.8619C10.9637 12.8023 11.4778 12.8619 11.9919 12.9215C13.6626 13.2788 14.9478 14.4105 15.4619 15.8996C14.3052 17.0908 12.5702 17.5673 10.9637 17.2099ZM23.3015 12.2067C23.173 12.3854 23.0445 12.5641 22.916 12.7428C22.5947 13.1001 22.2091 13.4575 21.7593 13.6958C20.3456 14.5296 18.4821 14.5892 17.0041 13.8149C16.9399 12.2663 17.7752 10.7772 19.1889 9.94336C20.7312 9.04992 22.659 9.04992 24.2012 9.94336C24.2654 10.0029 24.3297 10.0029 24.394 10.0625L23.3015 12.2067Z" fill="#34C74F"></path><path d="M25.6639 24.6381C25.3978 24.85 25.0993 25.0876 24.8 25.3323C24.4311 25.0301 24.0666 24.7332 23.7337 24.4769C23.6726 24.4275 23.6123 24.3788 23.5527 24.3307C22.6559 23.607 21.9342 23.0245 21.4362 22.4609L21.4353 22.46C20.8607 21.8121 20.6482 21.2603 20.6482 20.7042C20.6482 20.1171 20.8551 19.6101 21.2174 19.2459L21.2175 19.246L21.2226 19.2407C21.587 18.8661 22.1019 18.6482 22.6827 18.6482C23.0941 18.6482 23.4676 18.771 23.8064 19.0097C23.9913 19.1471 24.148 19.2957 24.2846 19.4748L24.8 20.1507L25.3155 19.4748C25.4531 19.2943 25.6111 19.1447 25.798 19.0064C26.1265 18.7656 26.4956 18.6482 26.9173 18.6482C27.4933 18.6482 28.0008 18.863 28.3826 19.2459C28.7439 19.6091 28.9518 20.1269 28.9518 20.7042C28.9518 21.2704 28.7403 21.811 28.1647 22.46L28.1638 22.4609C27.6658 23.0245 26.9441 23.607 26.0474 24.3307C25.9863 24.3799 25.9245 24.4298 25.8619 24.4804C25.7984 24.5311 25.7322 24.5837 25.6639 24.6381Z" fill="#E81212" stroke="#E81212" stroke-width="1.29647"></path></SvgIcon></ListItemIcon>
            <ListItemText style={{marginLeft:"9px"}}>Branch & Like</ListItemText>
            <Typography variant="body2" sx={{color:"#1BBA59", marginLeft:"9px"}}>$0.08</Typography>
          </MenuItem> */}
          <MenuItem style={{
                display: "flex",
                alignItems: "center",
                width: "100%"
          }} onClick={(e)=>{
            e.stopPropagation();
            setAnchorEl(null);
            if(localStorage.tokenTwetchAuth ==="anon"){
              alert("Please, Log In!")
              return
            }
            if (localStorage.isOneClick === "true") {
              branchPost(txId);
            } else {
              setOpen(true);
            }
            }}>
            <ListItemIcon style={{marginLeft:"-9px"}}><SvgIcon viewBox="0 0 32 32" fill="none" class="BranchModalItem_icon__Zy7MG"><path d="M25.9362 9.52642C25.6791 9.28817 25.3578 9.04992 25.0366 8.87124H24.9723C22.9803 7.73956 20.4099 7.68 18.4178 8.87124C16.7471 9.82423 15.6547 11.5515 15.5904 13.398C14.7551 12.5045 13.6626 11.9089 12.3775 11.6111C11.6706 11.4324 10.9637 11.4324 10.3212 11.492C9.99986 11.492 9.67856 11.5515 9.35726 11.6707L6.33707 12.5045C6.01578 12.5641 5.823 12.8619 5.823 13.1597C5.823 13.5171 5.88726 13.8745 5.95152 14.1723C5.95152 14.1723 5.95152 14.1723 5.95152 14.2318C6.46559 16.3761 8.26485 18.0438 10.5782 18.5203C11.0923 18.6394 11.5421 18.699 11.9919 18.699C13.2771 18.699 14.498 18.3416 15.5904 17.6269V23.3448C15.5904 23.7022 15.9117 24 16.2973 24C16.6828 24 17.0041 23.7022 17.0041 23.3448V15.3635C17.711 15.6018 18.4821 15.7209 19.1889 15.7209C20.3456 15.7209 21.438 15.4231 22.4662 14.8274C23.0445 14.4701 23.5586 14.0531 24.0084 13.5766C24.2012 13.3384 24.394 13.1001 24.5867 12.8023L26.0647 10.2412C26.2575 10.0625 26.1932 9.70511 25.9362 9.52642ZM10.9637 17.2099C9.22874 16.8526 7.81504 15.5422 7.42948 13.934C7.42948 13.934 7.42948 13.934 7.42948 13.8745C7.42948 13.8149 7.36522 13.6958 7.36522 13.6362L9.74282 12.981C9.9356 12.9215 10.1926 12.8619 10.4497 12.8619C10.9637 12.8023 11.4778 12.8619 11.9919 12.9215C13.6626 13.2788 14.9478 14.4105 15.4619 15.8996C14.3052 17.0908 12.5702 17.5673 10.9637 17.2099ZM23.3015 12.2067C23.173 12.3854 23.0445 12.5641 22.916 12.7428C22.5947 13.1001 22.2091 13.4575 21.7593 13.6958C20.3456 14.5296 18.4821 14.5892 17.0041 13.8149C16.9399 12.2663 17.7752 10.7772 19.1889 9.94336C20.7312 9.04992 22.659 9.04992 24.2012 9.94336C24.2654 10.0029 24.3297 10.0029 24.394 10.0625L23.3015 12.2067Z" fill="#34C74F"></path></SvgIcon></ListItemIcon>
            <ListItemText style={{marginLeft:"9px"}}>Branch</ListItemText>
            <Typography variant="body2" sx={{color:"#1BBA59", marginLeft:"9px"}}>$0.03</Typography>
          </MenuItem>
          <MenuItem style={{
                display: "flex",
                alignItems: "center",
                width: "100%"
          }} onClick={(e)=>{
            e.stopPropagation()
            history.push(`/compose?branch=${txId}`)}}>
            <ListItemIcon style={{marginLeft:"-9px"}}><SvgIcon viewBox="0 0 32 32" fill="none" class="BranchModalItem_icon__Zy7MG"><circle cx="16" cy="16" r="8.38929" stroke="#5791FF" stroke-width="1.22143"></circle><rect x="20.0923" y="16.5066" width="8.1928" height="1.08" rx="0.54" transform="rotate(-180 20.0923 16.5066)" fill="#5791FF"></rect><rect x="15.4121" y="20.1066" width="8.1928" height="1.08" rx="0.54" transform="rotate(-90 15.4121 20.1066)" fill="#5791FF"></rect></SvgIcon></ListItemIcon>
            <ListItemText style={{marginLeft:"9px"}}>Quote</ListItemText>
            <Typography variant="body2" sx={{color:"#1BBA59", marginLeft:"9px"}}>$0.03</Typography>
          </MenuItem>
      </Menu>
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
    setLoading(true)
    twetch.publish('twetch/post@0.0.1', {
      bContent: `https://twetch.app/t/${tx}`,
      mapComment: ticker
  }).then(()=>{
    setLoading(false)
    setCount(count+1)
    setBranchCalc(branchCalc + 1)
  }).catch((error)=>{
    setLoading(false)
    console.log(error)});
  }
}

