package com.ssafy.hallhole.review.dto;

import com.ssafy.hallhole.review.domain.ReactionType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReactionOutputByReviewDTO {

    private Long reviewId;

    private String memberName;

    private String memberTag;

    private int typeId;

    private int memberBg;

    private int memberChar;

    private int memberAcc;

}
