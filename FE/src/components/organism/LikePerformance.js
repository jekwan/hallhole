import { ImageList, ImageListItem, Box } from "@mui/material";
import { styled } from "@mui/system";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React, { useEffect, useState } from "react";

import Text from "../atom/Text";
import CategoryDivider from "../atom/CategoryDivider";

import { pickedPerformance, requestLikePerformanceCnt } from "../../apis/performanceLike";
import { requestUserInfo } from "../../apis/user";
import { Link } from "react-router-dom";

const flexContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  whiteSpace: "nowrap",
};

const Content = styled(Box)``;

export default function LikePerformances({ id }) {
  const [profileUser, setProfileUser] = useState([]);
  const [likePerformanceList, setLikePerformanceList] = useState([]);
  const [startPoint, setStartPoint] = useState(0);

  useEffect(() => {
    if (startPoint === []) return;
    pickedPerformance(id, 10, startPoint, getLikePerformanceListSuccess, getLikePerformanceListFail);
  }, [startPoint]);

  useEffect(() => {
    requestUserInfo(id, getProfileUserSuccess, getProfileUserFail);
    requestLikePerformanceCnt(id, getLikePerformanceCntSuccess, getLikePerformanceCntFail);
  }, [id]);

  function getProfileUserSuccess(res) {
    setProfileUser(res.data);
  }

  function getProfileUserFail(err) {}

  function getLikePerformanceCntSuccess(res) {
    if (res.data > 10) {
      setStartPoint(res.data - 10);
    }
  }

  function getLikePerformanceCntFail(err) {}

  function getLikePerformanceListSuccess(res) {
    setLikePerformanceList(res.data.reverse());
  }

  function getLikePerformanceListFail(err) {}
  // 유저 정보 불러왔는지 확인
  function validateProfileUser(profileUser) {
    return profileUser !== [];
  }

  // 공연 리스트 일부만 불러오기
  return (
    <Box sx={{ mt: 2, mx: 2 }}>
      {validateProfileUser ? (
        <Content>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Text size="large" variant="primary">
              👍 좋아요 한 공연
            </Text>
            <Box sx={{ mt: 2 }}>
              <Link to={`/likedperformance/${id}`} style={{ textDecoration: "none" }}>
                <Text size="smaller" variant="primary">
                  더보기
                </Text>
              </Link>
            </Box>
          </Box>
          <CategoryDivider type="primary" variant="middle" />
          <Box>
            <ImageList style={flexContainer}>
              {likePerformanceList.map(item => (
                <ImageListItem key={item.id}>
                  <Link to={`/performancedetail/${item.id}`}>
                    <img
                      key={item.id}
                      src={item.poster}
                      alt={item.title}
                      style={{ width: 110, height: 150, borderRadius: 5 }}
                    />
                  </Link>
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Content>
      ) : (
        <Box>로딩 중</Box>
      )}
    </Box>
  );
}
