package com.ssafy.hallhole.review.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SummaryReviewDTO {

    private Long id;

    private String writerTag;

    private String title;

    @Setter
    private LocalDateTime writing_time;

    private Double star_eval;

    private String name;

    private int memberBg;

    private int memberChar;

    private int memberAcc;

}
