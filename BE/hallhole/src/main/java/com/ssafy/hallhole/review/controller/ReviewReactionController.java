package com.ssafy.hallhole.review.controller;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.ReactionType;
import com.ssafy.hallhole.review.dto.*;
import com.ssafy.hallhole.review.service.ReactionTypeServiceImpl;
import com.ssafy.hallhole.review.service.ReviewReactionServiceImpl;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review-reaction")
@RequiredArgsConstructor
@ApiOperation(value = "reviewReactionController")
public class ReviewReactionController {

    private final ReviewReactionServiceImpl reactionService;

    private final ReactionTypeServiceImpl rtService;

    // 생성
    @PostMapping("/add")
    @ApiOperation(value="후기에 리액션 추가")
    public void addReaction(@RequestBody ReviewReactionAddInputDTO inputDto) throws NotFoundException {
        reactionService.addReaction(inputDto);
    }

    // 취소
    @PostMapping("/sub")
    @ApiOperation(value="후기 리액션 취소")
    public void subReaction(@RequestBody ReviewReactionSubInputDTO inputDto) throws NotFoundException {
        reactionService.cancelReaction(inputDto);
    }

    // 유저별 후기 리액션 검색
    @PostMapping("/member")
    @ApiOperation(value="멤버별 후기 리액션 리스트")
    public List<ReactionOuputByMemberDTO> getReactionListByMember(@RequestBody ReviewReactionListByMemberInputDTO inputDto) throws NotFoundException {
        return reactionService.getMemberReactionList(inputDto.getStart(), inputDto.getSize(), inputDto.getMemberTag());
    }

    // 후기별 리액션 검색
    @GetMapping("/review/{reactionId}")
    @ApiOperation(value="후기별 멤버 리액션 리스트")
    public List<ReactionOutputByReviewDTO> getReactionListByReview(@PathVariable("reactionId") Long reactionId) throws NotFoundException {
        return reactionService.getReactionListByReview(reactionId);
    }



//    ==================================reactionType


    @PostMapping("/reaction-type/add")
    @ApiOperation(value="리액션 타입 생성")
    public void addReactionType(@RequestBody String rTypeName) throws NotFoundException {
        rtService.makeReactionType(rTypeName);
    }

    @GetMapping("/reaction-type/list")
    @ApiOperation(value="리액션 타입 목록 보기")
    public List<ReactionType> showRType() {
        return rtService.showRType();
    }

//    ===================================test




}
