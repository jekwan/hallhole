package com.ssafy.hallhole.review.repository;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.SummaryReviewDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository {
    Long save(Review review);

    Review findOneReviewById(Long id) throws NotFoundException;

    List<Review> findAllByMemberId(Long memberId);

    List<Review> findAllByPerformanceId(String performanceId);

    List<Review> findAllReviewPagingByMemberId(int start, int size, Long memberId);

    List<Review> findAllReviewPagingByPerformanceId(int start, int size, String performanceId);

    Long findCommentCntByReviewId(Long reviewId);
}
