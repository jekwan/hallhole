package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewOutputDTO {

    private Long reviewId;

    private String writerTag;

    private String performanceId;

    private String title;

    private LocalDateTime performanceDatetime;

    private String contents;

    private LocalDateTime updateTime;

    private double starEval;

}
