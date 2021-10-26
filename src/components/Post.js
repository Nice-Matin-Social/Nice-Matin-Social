import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Avatar, Grid, IconButton, Typography, useTheme } from "@mui/material";
import LikeIcon from "../resources/LikeIcon";
import ReplyIcon from "../resources/ReplyIcon";
import BoostIcon from "../resources/BoostIcon";
import CopyIcon from "../resources/CopyIcon";
import BranchIcon from "../resources/BranchIcon";
import TwetchLogo from "../resources/TwetchLogo";
import Timestamp from "../utils/Timestamp";
import defaultAvatar from "../resources/eggie.jpg";
import PostDescription from "./PostDescription";
import MediaGrid from "./MediaGrid";
import { FetchRepliees } from "../api/TwetchGraph";

export default function Post(props) {
  const postTx = props.tx;
  const postData = props.node;
  const branchedById = props.branchedById;
  const branchedByName = props.branchedByName;
  const [replierId, setReplierId] = useState();
  const [replierName, setReplierName] = useState();
  const diff = props.boostDiff;
  const theme = useTheme();
  const history = useHistory();
  const timestamp = new Timestamp(postData.createdAt);

  useEffect(() => {
    if (postData.replyPostId) {
      FetchRepliees(postData.replyPostId).then((data) => {
        setReplierName(data.postById.userByUserId.name);
        setReplierId(data.postById.userId);
      });
    }
  }, []);

  const getDetail = (e) => {
    e.stopPropagation();
    history.push(`/t/${postTx}`);
  };
  if (postData.userByUserId) {
    return (
      <div>
        {branchedById && (
          <div
            style={{
              marginTop: "4px",
              marginLeft: "8px",
              marginBottom: "-15px"
            }}
          >
            <Link
              to={`/u/${branchedById}`}
              onClick={(e) => e.stopPropagation()}
            >
              <BranchIcon
                style={{
                  width: "18px",
                  height: "18px",
                  display: "inline-block",
                  marginRight: "8px",
                  verticalAlign: "top"
                }}
              />
              <Typography
                style={{
                  marginTop: "4px",
                  marginLeft: "8px",
                  color: "#696969",
                  display: "inline-block",
                  fontSize: "12px",
                  lineHeight: "18px",
                  verticalAlign: "top",
                  textDecoration: "none"
                }}
                variant="body1"
              >
                {branchedById === localStorage.id
                  ? "you branched"
                  : `${branchedByName} @${branchedById} branched`}
              </Typography>
            </Link>
          </div>
        )}
        <Grid item xs={12} onClick={getDetail}>
          <div
            style={{
              cursor: "pointer",
              display: "block",
              padding: "16px",
              position: "relative",
              borderBottom: `1px solid ${theme.palette.divider}`,
              textDecoration: "none"
            }}
            id={`post-${postData.transaction}`}
          >
            <div style={{ position: "relative" }}>
              <div
                style={{
                  top: 0,
                  color: "#696969",
                  right: 0,
                  cursor: "pointer",
                  height: "24px",
                  position: "absolute",
                  fontSize: "12px",
                  lineHeight: "16px",
                  verticalAlign: "top"
                }}
              >
                <Typography
                  style={{
                    color: "#696969",
                    cursor: "pointer",
                    display: "inline-block",
                    fontSize: "12px",
                    lineHeight: "16px",
                    whiteSpace: "nowrap",
                    marginRight: "8px",
                    verticalAlign: "top"
                  }}
                  variant="body1"
                >
                  {timestamp.getPostTimestamp(new Date())}
                </Typography>
                <div
                  style={{
                    display: "inline-block",
                    marginTop: "-16px",
                    verticalAlign: "top"
                  }}
                >
                  <IconButton type="button">
                    <a
                      href={`https://twetch.app/t/${postTx}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <TwetchLogo />
                    </a>
                  </IconButton>
                </div>
              </div>

              <Link
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginRight: "12px",
                  verticalAlign: "top"
                }}
                to={`/u/${postData.userId}`}
                onClick={(e) => e.stopPropagation()}
              >
                <Avatar src={postData.userByUserId.icon} />
              </Link>
              <div
                style={{
                  width: "calc(100% - 58px)",
                  display: "inline-block",
                  verticalAlign: "top"
                }}
              >
                <div
                  style={{
                    width: "calc(100% - 58px)",
                    display: "inline-block",
                    verticalAlign: "top"
                  }}
                >
                  <Link
                    className="Links"
                    to={`/u/${postData.userId}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      color: theme.palette.text.primary,
                      textDecoration: "none"
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: "inline-block",
                        overflow: "hidden",
                        fontSize: "16px",
                        maxWidth: "calc(100% - 64px)",
                        fontWeight: "bold",
                        lineHeight: "24px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        verticalAlign: "top",
                        textDecoration: "none"
                      }}
                    >
                      {postData.userByUserId.name}
                    </Typography>
                  </Link>

                  <Typography
                    variant="body1"
                    style={{
                      marginLeft: "3px",
                      color: "#828282",
                      display: "inline-block",
                      verticalAlign: "top"
                    }}
                  >{`@${postData.userId}`}</Typography>
                </div>
                {replierName && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#BDBDBD",
                      display: "block",
                      fontSize: "12px",
                      lineHeight: "18px",
                      marginBottom: "8px"
                    }}
                  >
                    Replying to{" "}
                    <Link className="Links" to={`/u/${replierId}`}>
                      <span style={{ color: theme.palette.primary.main }}>
                        {replierName}
                      </span>
                    </Link>
                  </Typography>
                )}
                <PostDescription post={postData} />
                <div>
                  {postData.files && <MediaGrid files={postData.files} />}
                </div>
              </div>
              <Grid
                container
                wrap="nowrap"
                style={{
                  marginTop: "8px",
                  justifyContent: "space-around"
                }}
              >
                <Grid item className="Like">
                  <LikeIcon
                    tx={postData.transaction}
                    likedCalc={postData.youLikedCalc}
                    count={postData.numLikes}
                  />
                </Grid>
                <Grid item className="Reply">
                  <ReplyIcon
                    tx={postData.transaction}
                    count={postData.postsByReplyPostId.totalCount}
                  />
                </Grid>
                <Grid item className="Boost">
                  <BoostIcon tx={postData.transaction} count={diff} />
                </Grid>
                <Grid item className="Copy">
                  <CopyIcon tx={postData.transaction} />
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </div>
    );
  } else {
    return null;
  }
}
