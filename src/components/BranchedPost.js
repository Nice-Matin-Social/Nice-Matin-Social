import React, { useState, useEffect } from "react";
import Post from "./Post";
import QuotedPost from "./QuotedPost";
import { FetchPostDetail } from "../api/TwetchGraph";

const Twetch = require("@twetch/sdk");

export default function BranchedPost(props) {
  const postTx = props.tx;
  const postData = props.node;
  const [branched, setBranched] = useState({});
  const userBranchId = props.node.userId;
  const userBranchName = props.node.userByUserId.name;
  //console.log(postData);
  const twetch = new Twetch();
  const PostHelper = twetch.Helpers.Post;
  let desc = PostHelper.description(postData);
  let branchTx = PostHelper.branchTransaction(desc);
  useEffect(() => {
    FetchPostDetail(branchTx).then((data) => {
      setBranched(data.allPosts.edges[0]);
    });
  }, []);

  if (branched.node) {
    if (branched.node.type === "post") {
      return (
        <Post
          {...branched}
          branchedById={userBranchId}
          branchedByName={userBranchName}
          tx={branched.node.transaction}
        />
      );
    } else {
      return (
        <QuotedPost
          {...branched}
          branchedById={userBranchId}
          branchedByName={userBranchName}
          tx={branched.node.transaction}
        />
      );
    }
  } else {
    return null;
  }
}
