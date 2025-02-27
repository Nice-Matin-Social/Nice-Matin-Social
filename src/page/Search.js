import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  IconButton,
  CircularProgress,
  FormControl,
  Hidden,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { use100vh } from "react-div-100vh";
import InfiniteScroll from "react-infinite-scroll-component";

import { FetchSearchResults } from "../api/TwetchGraph";
import AppBar from "../components/AppBar";
import LeftPane from "../components/LeftPane";
import RightPane from "../components/RightPane";
import Post from "../components/Post";
import StickyButton from "../components/StickyButton";

const indexToOrder = {
  0: "CREATED_AT_DESC",
  10: "CREATED_AT_ASC",
  20: "RANKING_DESC"
};

const OrderToIndex = {
  CREATED_AT_DESC: 0,
  CREATED_AT_ASC: 10,
  RANKING_DESC: 20
};

export default function Search(props) {
  const search = props.location.search;
  const [searchTerm, setSearchTerm] = useState(search.split("=")[1]);
  const [filter, setFilter] = useState(search.split("=")[1]);
  //console.log(filter);
  const [orderBy, setOrderBy] = useState(indexToOrder[0]);
  //const [filter, setFilter] = useState(props.filter);
  const [postList, setPostList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [boosts, setBoosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const history = useHistory();
  const height = use100vh();
  const containerHeight = height ? height : "100vh";

  useEffect(() => {
    if (filter === undefined) {
      setFilter("");
      history.push({
        pathname: "/search/",
        search: `searchTerm=`
      });
    } else {
      setLoading(true);
      fetchMore();
      setLoading(false);
      //getBoosts().then((res) => setBoosts(res));
    }
  }, [orderBy, filter]);

  const fetchMore = () => {
    FetchSearchResults(filter, orderBy, offset).then((res) => {
      //console.log(res);
      setTotalCount(res.allPosts.totalCount);
      //console.log("total:", totalCount);
      let data = res.allPosts.edges;
      setPostList(postList.concat(data));
      //console.log("postList:", postList.length);
      setOffset(offset + 30);
      if (totalCount !== 0 && postList.length >= totalCount) {
        //console.log("here");
        setHasMore(false);
      }
    });
    //console.log("hasMore:", hasMore);
  };

  const handleChangeOrder = (event) => {
    setPostList([]);
    setTotalCount(0);
    setHasMore(true);
    setOrderBy(indexToOrder[event.target.value]);
    setOffset(0);
  };

  const getDiff = (tx) => {
    let diff = 0;
    let found = boosts.find((x) => x.tx === tx);
    if (found) {
      diff = found.diff;
    }
    return diff;
  };

  const scrollTop = (e) => {
    document.getElementById("scrollable").scrollTo(0, 0);
  };

  let timeout = null;

  const handleChangeFilter = (e) => {
    setSearchTerm(e.target.value);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPostList([]);
      setTotalCount(0);
      setHasMore(true);
      setOffset(0);
      history.push({
        pathname: "/search/",
        search: `searchTerm=${e.target.value}`
      });
      setFilter(e.target.value);
    }, 1000);
  };

  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const smUp = useMediaQuery(theme.breakpoints.up("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      {smDown ? null : <LeftPane />}
      <div
        style={{
          flex: 2,
          width: "100%",
          maxWidth: "600px"
        }}
      >
        <div
          className="borders"
          style={{
            flex: 2,
            width: "100%",
            maxWidth: "600px"
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={scrollTop}>
            <div
              style={{
                height: "81px",
                position: "sticky",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderBottom: "1px solid #F2F2F2"
              }}
            >
              <IconButton onClick={() => history.goBack()}>
                <KeyboardBackspaceIcon color="primary" />
              </IconButton>
              <Button
                style={{
                  margin: 0,
                  textDecoration: "none",
                  textTransform: "none"
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "22px",
                    fontWeight: "bold"
                  }}
                >
                  Rechercher
                </Typography>
              </Button>
              <div>
                {/* <Button
                  color="primary"
                  href="https://twetch.app/search/advanced"
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", textTransform: "none" }}
                >
                  Advanced
                </Button> */}
              </div>
            </div>
            <div style={{ paddingBottom: "12px" }}>
              <TextField
                className="SearchBorderRadius"
                variant="outlined"
                fullWidth
                placeholder="Rechercher"
                value={searchTerm}
                onChange={handleChangeFilter}
                margin="dense"
              />
            </div>
            <FormControl
              style={{
                zIndex: 0,
                width: "100%"
              }}
            >
              <Select
                variant="standard"
                style={{ paddingLeft: "16px" }}
                value={OrderToIndex[orderBy]}
                onChange={handleChangeOrder}
              >
                <MenuItem value={0}>Récents</MenuItem>
                <MenuItem value={10}>Anciens</MenuItem>
                <MenuItem value={20}>Economie</MenuItem>
              </Select>
            </FormControl>
          </div>

          {!loading ? (
            <div
              id="scrollable"
              style={{
                position: "relative",
                height: `calc(${containerHeight}px - 178px)`,
                overflowY: "auto"
              }}
            >
              <InfiniteScroll
                dataLength={postList.length}
                next={fetchMore}
                hasMore={hasMore}
                scrollableTarget="scrollable"
                loader={
                  <div
                    style={{
                      display: "flex",
                      marginTop: "16px",
                      justifyContent: "center",
                      overflow: "hidden"
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                    <b>Bravo, vous avez tout vu !</b>
                  </p>
                }
              >
                {postList.map((post, index) => {
                  return (
                    <Post
                      {...post}
                      boostDiff={getDiff(post.node.transaction)}
                      key={index}
                      tx={post.node.transaction}
                    />
                  );
                })}
              </InfiniteScroll>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                marginTop: "16px",
                justifyContent: "center",
                overflow: "hidden"
              }}
            >
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
      {mdDown ? null : <RightPane />}
      <div
        style={{
          width: "100%",
          bottom: 0,
          zIndex: 1002,
          position: "fixed"
        }}
      >
        {smUp ? null : <StickyButton />}
      </div>
    </div>
  );
}
