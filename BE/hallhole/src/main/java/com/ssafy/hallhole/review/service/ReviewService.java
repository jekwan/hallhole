package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.ReviewInputDTO;
import com.ssafy.hallhole.review.dto.SummaryReviewDTO;

import java.util.List;

public interface ReviewService {

    void writeReview(ReviewInputDTO reviewDto) throws NotFoundException; // review form

    void updateReview(Long rId, ReviewInputDTO reviewDto) throws NotFoundException; // review detail

    void deleteReview(Long rId) throws NotFoundException; // review detail

    List<SummaryReviewDTO> getUserSummeryReviewInfo(Long mId) throws NotFoundException;

    List<SummaryReviewDTO> getPerformanceSummeryReviewInfo(String pId) throws NotFoundException;

    Review getDetailReviewInfo(Long rId) throws NotFoundException; //review detail
}
