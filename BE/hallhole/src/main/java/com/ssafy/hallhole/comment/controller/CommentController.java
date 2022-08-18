package com.ssafy.hallhole.comment.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.comment.domain.Comment;
import com.ssafy.hallhole.comment.dto.*;
import com.ssafy.hallhole.comment.service.CommentServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@RequiredArgsConstructor
@ApiOperation(value = "commentController")
public class CommentController {

    private final CommentServiceImpl commentService;

    // 댓글 작성
    @PostMapping("/write")
    @ApiOperation(value = "댓글 작성",
            notes = "'/comment/write' 형식으로 사용 \n " +
                    "inputdata: memberTag(작성자 태그), reviewId(후기 아이디), contents(댓글 내용)")
    public ResponseEntity write(@RequestBody CommentWriteInputDTO inputDTO) throws NotFoundException {
        commentService.writeComment(inputDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 댓글 수정
    @PostMapping("/update")
    @ApiOperation(value = "댓글 수정",
            notes = "'/comment/update' 형식으로 사용 \n " +
                    "inputdata: memberTag(현재아이디), commentId(댓글 아이디), contents(댓글 내용)")
    public ResponseEntity update(@RequestBody CommentUpdateInputDTO inputDTO) throws NotFoundException {
        commentService.updateComment(inputDTO);
        return new ResponseEntity(HttpStatus.OK);
    }

    // 댓글 삭제
    @PostMapping("/delete")
    @ApiOperation(value = "댓글 삭제",
            notes = "'/comment/delete' 형식으로 사용 \n inputdata: memberId(현재아이디), commentId(댓글아이디)")
    public ResponseEntity delete(@RequestBody CommentDeleteInputDTO inputDTO) throws NotFoundException {
        commentService.deleteComment(inputDTO);
        return new ResponseEntity(HttpStatus.OK);

    }

    // 아이디 별 댓글 모아보기
    @PostMapping("/member-list")
    @ApiOperation(value = "아이디 별 댓글 모아보기",
            notes = "'/comment/member-list' 형식으로 사용," +
                    "\n inputdata: memberId(작성자아이디), size, start는 자유" +
                    "\n start는 0부터 시작")
    public List<CommentOutputDTO> findByMemberId(@RequestBody CommentFindByMemberTagDTO inputDTO) throws NotFoundException {
        return commentService.CommentListfindByMemberId(inputDTO);
    }

    // 후기 별 댓글 모아보기
    @PostMapping("/review-list")
    @ApiOperation(value = "리뷰 별 댓글 모아보기",
            notes = "'/comment/review-list' 형식으로 사용" +
            "\n inputdata: reviewId(리뷰아이디), size, start는 자유" +
            "\n start는 0부터 시작")
    public List<CommentOutputDTO> findByReviewId(@RequestBody CommentFindByReviewIdDTO inputDTO) throws NotFoundException {
        return commentService.CommentListfindByReviewId(inputDTO);
    }

}
