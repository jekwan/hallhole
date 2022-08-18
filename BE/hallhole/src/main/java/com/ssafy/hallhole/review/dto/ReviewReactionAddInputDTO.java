package com.ssafy.hallhole.review.dto;

import com.ssafy.hallhole.review.domain.ReactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReactionAddInputDTO {

    private Long reviewId;

    private String memberTag;

    private int reactionId;

}
