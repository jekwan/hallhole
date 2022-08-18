package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.review.domain.ReactionCnt;
import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.domain.ReviewReaction;
import com.ssafy.hallhole.review.dto.*;
import com.ssafy.hallhole.review.repository.ReactionCntRepositoryImpl;
import com.ssafy.hallhole.review.repository.ReviewReactionRepositoryImpl;
import com.ssafy.hallhole.review.repository.ReviewRepositoryImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewReactionServiceImpl implements ReviewReactionService {

    private final ReviewReactionRepositoryImpl rrRepository;

    private final MemberRepository memberRepository;

    private final ReviewRepositoryImpl reviewRepository;

    private final ReactionCntRepositoryImpl reactionCntRepository;

    @Override
    public void addReaction(ReviewReactionAddInputDTO inputDto) throws NotFoundException {

        Member m = memberRepository.findByIdTag(inputDto.getMemberTag());
        if(m==null || m.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }

        Review r = reviewRepository.findOneReviewById(inputDto.getReviewId());
        if(r==null||r.isDelete()){
            throw new NotFoundException("해당하는 후기가 없습니다.");
        }

        Long cnt = rrRepository.findSameReviewReaction(inputDto.getReviewId(), m.getId());
        if(cnt==0){ // 없음
            ReactionType rType = rrRepository.getReactionInfo(inputDto.getReactionId());
            if (reactionCntRepository.findReactionByReviewId(r.getId(),rType.getId())==0){
                // 해당 후기에 이 리액션이 처음임
                reactionCntRepository.save(new ReactionCnt(r, rType));
            }
            else {
                // 해당 후기에 이 리액션이 있음. 누군가가 함.
                ReactionCnt rCnt = reactionCntRepository.findReactionCnt(r.getId(), rType.getId());
                rCnt.addReaction();
                reactionCntRepository.save(rCnt);
            }
            ReviewReaction reaction = new ReviewReaction(r,m,rType);
            rrRepository.save(reaction);
        }
        else{ // 이 후기에 리액션을 남긴 적 있음
            throw new NotFoundException("해당하는 후기 리액션이 이미 있습니다.");
        }
    }

    @Override
    public void cancelReaction(ReviewReactionSubInputDTO inputDto) throws NotFoundException {

        Member m = memberRepository.findByIdTag(inputDto.getMemberTag());
        if(m==null || m.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }
        Review r = reviewRepository.findOneReviewById(inputDto.getReviewId());
        if(r==null||r.isDelete()){
            throw new NotFoundException("해당하는 후기가 없습니다.");
        }

        // 해당 리액션이 있는지 확인
        Long cnt = rrRepository.findSameReviewReaction(inputDto.getReviewId(), m.getId());
            if(cnt!=0){
                ReactionType rType = rrRepository.getReactionInfo(inputDto.getReactionId());
                ReactionCnt rCnt = reactionCntRepository.findReactionCnt(r.getId(), rType.getId());
                rCnt.subReaction();
                List<ReviewReaction> reactionList = rrRepository.findReactionByAllData(inputDto.getReviewId(), m.getId());
                for(ReviewReaction rr: reactionList){
                    rrRepository.delete(rr);
                }

                if(rCnt.getReactionCnt()!=0){
                    reactionCntRepository.save(rCnt);
                }
                else {
                    reactionCntRepository.delete(rCnt);

                }
            }
            else{
            throw new NotFoundException("후기에 남긴 리액션이 없습니다.");
        }
    }

    @Override
    public List<ReactionOuputByMemberDTO> getMemberReactionList(int start, int size, String memberTag) throws NotFoundException {
        Member m = memberRepository.findByIdTag(memberTag);
        if(m==null || m.isOut()){
            throw new NotFoundException(" 유효한 사용자가 아닙니다.");
        }

        List<ReviewReaction> rList = rrRepository.findAllByMemberId(start, size, m.getId());
        List<ReactionOuputByMemberDTO> outputList = new LinkedList<>();

        for(ReviewReaction r: rList){
            ReactionOuputByMemberDTO output = new ReactionOuputByMemberDTO(r.getReview().getId(), r.getReactiontype().getId());
            outputList.add(output);
        }

        return outputList;
    }


    public List<ReactionOutputByReviewDTO> getReactionListByReview(Long reviewId) throws NotFoundException {
        Review r = reviewRepository.findOneReviewById(reviewId);
        if(r==null||r.isDelete()){
            throw new NotFoundException("해당하는 후기가 없습니다.");
        }

        List<ReviewReaction> rList = rrRepository.findAllByReveiwId(reviewId);
        List<ReactionOutputByReviewDTO> outputList = new LinkedList<>();

        for(ReviewReaction rr: rList){
            ReactionOutputByReviewDTO output = new ReactionOutputByReviewDTO(rr.getReview().getId(), rr.getMember().getName(), rr.getMember().getIdTag(),
                    rr.getReactiontype().getId(), rr.getMember().getNowBg(), rr.getMember().getNowChar(), rr.getMember().getNowAcc());
            outputList.add(output);
        }

        return outputList;
    }
}
