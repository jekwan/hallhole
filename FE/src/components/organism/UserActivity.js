import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import ProfileReviewItem from "../molecule/ProfileReviewItem";
import TextStyle from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";
import { List } from "@mui/material";
import { getUserReviewList } from "../../apis/review";
import { requestName } from "../../apis/user";
import UserActivityPagination from "../molecule/UserActivityPagination";

export default function UserActivity({ id }) {
  const [reviewList, setReviewList] = useState([]);
  const [profileName, setProfileName] = useState([]);

  useEffect(() => {
    getUserReviewList(10, 0, id, getUserReviewListSuccess, getUserReviewListFail);
    requestName(id, getProfileNameSuccess, getProfileNameFail);
    checkUserReview();
  }, [id]);

  function getUserReviewListSuccess(res) {
    setReviewList(res.data);
  }

  function getUserReviewListFail(err) {}

  function getProfileNameSuccess(res) {
    setProfileName(res.data);
  }

  function getProfileNameFail(err) {}

  function checkUserReview() {
    if (reviewList.length === 0) {
      return (
        <Box>
          <TextStyle>{"아직 작성한 리뷰가 없어요 :)"}</TextStyle>
        </Box>
      );
    } else if (reviewList.length <= 5) {
      return (
        <List sx={{ ml: 1 }}>
          {reviewList.map((item, id) => (
            <ProfileReviewItem
              key={id}
              title={item.title}
              writing_time={item.writing_time}
              star_eval={item.star_eval}
              reviewId={item.id}
            ></ProfileReviewItem>
          ))}
        </List>
      );
    } else {
      return <UserActivityPagination reviewList={reviewList} />;
    }
  }

  return (
    <Box sx={{ width: "90%", marginY: 2, margin: "auto" }}>
      <TextStyle size="medium" variant="primary" weight="bold">
        {profileName}님이 작성한 후기
      </TextStyle>
      <CategoryDivider type="primary" />
      {checkUserReview()}
    </Box>
  );
}
