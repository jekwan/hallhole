package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.*;

import java.util.List;

public interface ReviewService {

    Long writeReview(ReviewInputDTO reviewDto) throws NotFoundException; // review form

    void updateReview(Long rId, ReviewUpdateDTO reviewDto) throws NotFoundException;

    void deleteReview(Long rId, ReviewDeleteDTO inputDto) throws NotFoundException; // review detail

    List<SummaryReviewDTO> getUserSummeryReviewInfo(int start, int size, String tag) throws NotFoundException;

    List<SummaryReviewDTO> getPerformanceSummeryReviewInfo(int start, int size, String pId) throws NotFoundException;

    ReviewOutputDTO getDetailReviewInfo(Long rId) throws NotFoundException; //review detail

    Long findCntByReviewId(Long reviewId) throws NotFoundException;
}
