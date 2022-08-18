package com.ssafy.hallhole.comment.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.comment.dto.*;
import com.ssafy.hallhole.comment.repository.CommentRepository;
import com.ssafy.hallhole.member.domain.Member;
import com.ssafy.hallhole.member.repository.MemberRepository;
import com.ssafy.hallhole.review.domain.Review;
import com.ssafy.hallhole.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final MemberRepository memberRepository;
    private final ReviewRepository reviewRepository;
    private final CommentRepository commentRepository;

    @Override
    public void writeComment(CommentWriteInputDTO inputDTO) throws NotFoundException {

        Member member = memberRepository.findByIdTag(inputDTO.getIdTag());

        if (member==null || member.isOut()){
            throw new NotFoundException("유효한 사용자가 작성한 후기가 아닙니다.");
        }

        Review review = reviewRepository.findOneReviewById(inputDTO.getReviewId());
        if (review==null || review.isDelete()){
            throw new NotFoundException("후기가 존재하지 않습니다.");
        }

        Comment comment = new Comment(member, review, inputDTO.getContents());
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(CommentDeleteInputDTO inputDTO) throws NotFoundException{

        Member member = memberRepository.findByIdTag(inputDTO.getIdTag());

        if (member==null || member.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        Comment comment = commentRepository.findOneCommentById(inputDTO.getCommentId());
        if (comment==null || comment.isDelete()){
            throw new NotFoundException("존재하지 않는 댓글입니다.");
        }

        if(!comment.getMember().getIdTag().equals(inputDTO.getIdTag())){
            throw new NotFoundException("댓글의 작성자와 수정을 요청한 아이디가 다릅니다.");
        }

        comment.setDelete(true);
        commentRepository.save(comment);
    }

    @Override
    public void updateComment(CommentUpdateInputDTO inputDTO) throws NotFoundException{

        Member member = memberRepository.findByIdTag(inputDTO.getIdTag());

        if (member==null || member.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        Comment comment = commentRepository.findOneCommentById(inputDTO.getCommentId());
        if (comment==null || comment.isDelete()){
            throw new NotFoundException("존재하지 않는 댓글입니다.");
        }

        if(!comment.getMember().getIdTag().equals(inputDTO.getIdTag())){
            throw new NotFoundException("댓글의 작성자와 수정을 요청한 아이디가 다릅니다.");
        }

        comment.setContents(inputDTO.getContents());
        commentRepository.save(comment);
    }


    @Override
    public List<CommentOutputDTO> CommentListfindByMemberId(CommentFindByMemberTagDTO inputDTO) throws NotFoundException{
        Member member = memberRepository.findByIdTag(inputDTO.getIdTag());
        if (member==null || member.isOut()){
            throw new NotFoundException("유효한 사용자가 아닙니다.");
        }

        List<Comment> commentList = commentRepository.findAllCommentPagingByMemberId(
                inputDTO.getStart(), inputDTO.getSize(), member.getId());
        List<CommentOutputDTO> outputList = new LinkedList<>();
        for(Comment c:commentList){
            CommentOutputDTO output = new CommentOutputDTO(c.getId(),c.getMember().getIdTag(),
                    c.getMember().getNowBg(),c.getMember().getNowChar(),c.getMember().getNowAcc(),
                    c.getReview().getId(), c.getContents(), c.getWritingTime().plusHours(9), c.getUpdateTime());
            outputList.add(output);
        }

        return outputList;
    }

    @Override
    public List<CommentOutputDTO> CommentListfindByReviewId(CommentFindByReviewIdDTO inputDTO) throws NotFoundException{

        Review review = reviewRepository.findOneReviewById(inputDTO.getReviewId());
        if (review==null || review.isDelete()){
            throw new NotFoundException("후기가 존재하지 않습니다.");
        }

        List<Comment> commentList = commentRepository.findAllCommentPagingByReviewId(
                inputDTO.getStart(), inputDTO.getSize(), inputDTO.getReviewId());

        List<CommentOutputDTO> outputList = new LinkedList<>();
        for(Comment c:commentList){
            CommentOutputDTO output = new CommentOutputDTO(c.getId(),c.getMember().getIdTag(),
                    c.getMember().getNowBg(),c.getMember().getNowChar(),c.getMember().getNowAcc(),
                    c.getReview().getId(), c.getContents(), c.getWritingTime().plusHours(9), c.getUpdateTime());
            outputList.add(output);
        }

        return outputList;
    }

}
