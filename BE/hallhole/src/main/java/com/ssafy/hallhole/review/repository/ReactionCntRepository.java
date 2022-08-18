package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.ReactionCnt;
import com.ssafy.hallhole.review.domain.ReactionType;

import java.util.List;

public interface ReactionCntRepository {

    void save(ReactionCnt reactionCnt);

    void delete(ReactionCnt reactionCnt);

    // 이 후기에 이 리액션이 있었는지
    Long findReactionByReviewId(Long rId, int rTypeId);

    ReactionCnt findReactionCnt(Long rId, int rTypeId);

}