package com.ssafy.hallhole.performance.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PerformanceLikePagingInputDTO {

    private int start;

    private int size;

    private String memberTag;

}
