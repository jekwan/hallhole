package com.ssafy.hallhole.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewInputDTO {

    private Long writer_id;

    private String performance_id;

    private LocalDateTime performance_time;

    private String title;

    private Double star;

    private String contents;
    
}
