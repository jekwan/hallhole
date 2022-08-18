package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewInputDTO {

    private String writerTag;

    private String performanceId;

    private LocalDateTime performance_time;

    private String title;

    private Double star;

    private String contents;
    
}
