package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.dto.ReactionOuputByMemberDTO;
import com.ssafy.hallhole.review.dto.ReviewReactionAddInputDTO;
import com.ssafy.hallhole.review.dto.ReviewReactionSubInputDTO;

import java.util.List;

public interface ReviewReactionService {
    void addReaction(ReviewReactionAddInputDTO inputDto) throws NotFoundException;

    void cancelReaction(ReviewReactionSubInputDTO inputDTO) throws NotFoundException;

    List<ReactionOuputByMemberDTO> getMemberReactionList(int start, int size, String memberTag) throws NotFoundException;
}
