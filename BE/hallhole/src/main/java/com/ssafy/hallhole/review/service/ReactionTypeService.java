package com.ssafy.hallhole.review.service;

import com.ssafy.hallhole.advice.exceptions.NotFoundException;
import com.ssafy.hallhole.review.domain.ReactionType;

import java.util.List;

public interface ReactionTypeService {
    List<ReactionType> showRType();

    void makeReactionType(String reaction) throws NotFoundException;
}
