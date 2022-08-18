package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.comment.repository.CommentRepository;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.performance.domain.Performance;
import com.ssafy.hallhole.performance.repository.PerformanceRepository;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.dto.*;
import com.ssafy.hallhole.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    private final MemberRepository memberRepository;

    private final PerformanceRepository performanceRepository;

    private final CommentRepository commentRepository;

    @Override
    public Long writeReview(ReviewInputDTO reviewDto) throws NotFoundException { // review form
        Performance p = performanceRepository.findOnePerformanceById(reviewDto.getPerformanceId());
        Member m = memberRepository.findByIdTag(reviewDto.getWriterTag());
        Review r = new Review(m,p,reviewDto.getTitle(),reviewDto.getPerformance_time(),
                reviewDto.getContents(), reviewDto.getStar());
        return reviewRepository.save(r);
    }


    @Override
    public void updateReview(Long rId, ReviewUpdateDTO reviewDto) throws NotFoundException { // review detail
        Performance p = performanceRepository.findOnePerformanceById(reviewDto.getPerformanceId());
        if(p==null){
            throw new NotFoundException("해당하는 공연이 존재하지 않습니다.");
        }

        Member m = memberRepository.findByIdTag(reviewDto.getWriterTag());
        if(m==null || m.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }

        Review r = reviewRepository.findOneReviewById(rId);
        if(r==null||r.isDelete()){
            throw new NotFoundException("해당하는 후기가 없습니다.");
        }

        if(r.getMember().getId()!=m.getId()){
            throw new NotFoundException("수정하려는 사용자가 후기 작성자와 동일하지 않습니다.");
        }

        r.setContents(reviewDto.getContents());
        r.setPerformance(p);
        r.setStarEval(reviewDto.getStar());
        r.setTitle(reviewDto.getTitle());

        reviewRepository.save(r);
    }

    @Override
    public void deleteReview(Long rId, ReviewDeleteDTO inputDto) throws NotFoundException { // review detail
        Review review = reviewRepository.findOneReviewById(rId);
        if(review==null || review.isDelete()){
            throw new NotFoundException("해당 후기가 존재하지 않습니다.");
        }

        Member member = memberRepository.findByIdTag(inputDto.getWriterTag());
        if(member==null || member.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }

        if(review.getMember().getId()!=member.getId()){
            throw new NotFoundException("삭제하려는 사용자가 후기 작성자와 동일하지 않습니다.");
        }

        List<Comment> commentList = commentRepository.findAllCommentByReviewId(rId);
        for(Comment c : commentList){
            c.setDelete(true);
            commentRepository.save(c);

        }

        review.setDelete(true);
        reviewRepository.save(review);

    }

    @Override
    public ReviewOutputDTO getDetailReviewInfo(Long rId) throws NotFoundException { // review detail
        Review r = reviewRepository.findOneReviewById(rId);
        if(r==null || r.isDelete()){
            throw new NotFoundException("해당 후기가 존재하지 않습니다.");
        }

        ReviewOutputDTO review = new ReviewOutputDTO(r.getId(), r.getMember().getIdTag(), r.getPerformance().getId(),
                r.getTitle(), r.getPerformanceDatetime().plusHours(9), r.getContents(), r.getUpdateTime().plusHours(9), r.getStarEval());

        return review;
    }

    @Override
    public List<SummaryReviewDTO> getUserSummeryReviewInfo(int start, int size, String tag) throws NotFoundException {
        Member member = memberRepository.findByIdTag(tag);

        if(member==null||member.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        List<Review> reviewList = reviewRepository.findAllReviewPagingByMemberId(start, size, member.getId());
        List<SummaryReviewDTO> summaryList = new LinkedList<>();

        for(Review r : reviewList){
            Member writer = r.getMember();
            SummaryReviewDTO s = new SummaryReviewDTO(r.getId(),writer.getIdTag(),r.getTitle(), r.getUpdateTime().plusHours(9),
                    r.getStarEval(),writer.getName(),writer.getNowBg(),writer.getNowChar(), writer.getNowAcc());
            summaryList.add(s);
        }

        return summaryList;
    }

    @Override
    public List<SummaryReviewDTO> getPerformanceSummeryReviewInfo(int start, int size, String pId) throws NotFoundException {
            Performance p = performanceRepository.findOnePerformanceById(pId);

        if(p==null){
            throw new NotFoundException("유효한 공연이 아닙니다.");
        }

        List<Review> reviewList = reviewRepository.findAllReviewPagingByPerformanceId(start, size, pId);
        List<SummaryReviewDTO> summaryList = new LinkedList<>();

        for(Review r : reviewList){
            Member writer = r.getMember();
            SummaryReviewDTO s = new SummaryReviewDTO(r.getId(),writer.getIdTag(),r.getTitle(), r.getUpdateTime().plusHours(9),
                    r.getStarEval(),writer.getName(),writer.getNowBg(),writer.getNowChar(), writer.getNowAcc());
            summaryList.add(s);
        }

        return summaryList;
    }

    @Override
    public Long findCntByReviewId(Long reviewId) throws NotFoundException {

        Review review = reviewRepository.findOneReviewById(reviewId);
        if (review==null || review.isDelete()){
            throw new NotFoundException("후기가 존재하지 않습니다.");
        }

        return reviewRepository.findCommentCntByReviewId(reviewId);
    }
}
