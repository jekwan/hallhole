package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewReactionSubInputDTO {

    private Long reviewId;

    private String memberTag;

    private int reactionId;

}
