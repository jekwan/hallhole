package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateDTO {

    private String writerTag;

    private String performanceId;

    private String title;

    private Double star;

    private String contents;

}
