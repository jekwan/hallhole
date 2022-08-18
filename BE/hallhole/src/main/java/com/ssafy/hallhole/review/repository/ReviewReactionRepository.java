package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.domain.ReviewReaction;

import java.util.List;

public interface ReviewReactionRepository {

    void save(ReviewReaction reaction);

    void delete(ReviewReaction reaction);

    // 리액션 있는지 찾는 메서드
    Long findSameReviewReaction(Long rId, Long mId);

    List<ReviewReaction> findReactionByAllData(Long rId, Long mId);

    List<ReviewReaction> findAllByMemberId(int start, int size, Long memberId);

    List<ReviewReaction> findAllByReveiwId(Long reviewId);

    ReactionType getReactionInfo(int reactionId);

    void save(ReactionType reactionType);

    Long findSameReactionName(String rTypeName);

    List<ReviewReaction> findAllReactionByMemberId(Long memberId);

}
