package com.ssafy.hallhole.review.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.InputDTO;
import com.ssafy.hallhole.review.dto.ReviewInputDTO;
import com.ssafy.hallhole.review.dto.SummaryReviewDTO;
import com.ssafy.hallhole.review.service.ReviewServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.LifecycleState;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@ApiOperation(value = "reviewController")
public class ReviewController {

    private final ReviewServiceImpl reviewService;

    @PostMapping("/write")
    @ApiOperation(value="[완료] 리뷰 작성")
    public ResponseEntity writeReview(@RequestBody ReviewInputDTO reviewDto){
        try{
            reviewService.writeReview(reviewDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{reviewId}")
    @ApiOperation(value="[완료] 리뷰 수정")
    public ResponseEntity updateReview(@PathVariable("reviewId") Long reviewId, @RequestBody ReviewInputDTO reviewDto){
        try{
            reviewService.updateReview(reviewId,reviewDto);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{reviewId}")
    @ApiOperation(value="[완료] 리뷰 삭제")
    public ResponseEntity<Review> deleteReview(@PathVariable("reviewId") Long reviewId){
        try{
            reviewService.deleteReview(reviewId);
            return new ResponseEntity(HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{reviewId}")
    @ApiOperation(value="[완료] 리뷰 상세 정보 가져오기")
    public ResponseEntity<Review> getDetailReview(@PathVariable("reviewId") Long reviewId){
        try{
            Review review = reviewService.getDetailReviewInfo(reviewId);
            return new ResponseEntity<Review>(review,HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/user-review-list")
    @ApiOperation(value="[완료] 유저별 후기 요약 리스트 >> input: memberId")
    public List<SummaryReviewDTO> getUserSummaryList(@RequestBody InputDTO inputDto) throws NotFoundException  {
        return reviewService.getUserSummeryReviewInfo(inputDto.getMemberId());
    }

    @PostMapping("/performance-review-list")
    @ApiOperation(value="[완료] 공연별 후기 요약 리스트 >> input: performanceId")
    public List<SummaryReviewDTO> getPerformanceSummaryList(@RequestBody InputDTO inputDto) throws NotFoundException  {
        return reviewService.getPerformanceSummeryReviewInfo(inputDto.getPerformanceId());
    }
}